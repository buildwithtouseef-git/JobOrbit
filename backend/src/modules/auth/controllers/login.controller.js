const User = require('../models/User.model');
const Session = require('../models/Session.model');
const LoginAttempt = require('../models/LoginAttempt.model');
const { comparePassword } = require('../utils/hash');
const { generateAccessToken } = require('../utils/jwt');
const { generateRawToken, hashToken } = require('../utils/token');
const { success, error } = require('../utils/response');
const env = require('../config/env');

// --- Member 2: Login & Session/Token Management ---

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    // Security check (built by Member 3, used here): block if too many recent failures
    const windowStart = new Date(Date.now() - env.security.loginAttemptWindowMin * 60 * 1000);
    const recentFailures = await LoginAttempt.countDocuments({
      emailTried: email,
      status: 'failed',
      createdAt: { $gt: windowStart },
    });

    if (recentFailures >= env.security.maxLoginAttempts) {
      return error(
        res,
        429,
        'Too many failed login attempts. Please try again later or reset your password.',
        'TOO_MANY_ATTEMPTS'
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      await LoginAttempt.create({ emailTried: email, ipAddress, status: 'failed' });
      return error(res, 401, 'Invalid email or password', 'INVALID_CREDENTIALS');
    }

    const passwordMatches = await comparePassword(password, user.passwordHash);
    if (!passwordMatches) {
      await LoginAttempt.create({ user: user._id, emailTried: email, ipAddress, status: 'failed' });
      return error(res, 401, 'Invalid email or password', 'INVALID_CREDENTIALS');
    }

    if (user.status !== 'active') {
      return error(res, 403, 'Please verify your email before logging in', 'EMAIL_NOT_VERIFIED');
    }

    // Success: issue access token (JWT) + refresh token (opaque, stored hashed)
    const accessToken = generateAccessToken(user);
    const rawRefreshToken = generateRawToken();
    const refreshExpiresAt = new Date(
      Date.now() + env.jwt.refreshExpiryDays * 24 * 60 * 60 * 1000
    );

    await Session.create({
      user: user._id,
      tokenHash: hashToken(rawRefreshToken),
      deviceInfo: req.headers['user-agent'] || 'unknown',
      ipAddress,
      expiresAt: refreshExpiresAt,
    });

    await LoginAttempt.create({ user: user._id, emailTried: email, ipAddress, status: 'success' });

    return success(res, 200, 'Login successful', {
      access_token: accessToken,
      refresh_token: rawRefreshToken,
      user: {
        user_id: user._id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}



async function logout(req, res, next) {
  try {
    const { refresh_token } = req.body;
    if (refresh_token) {
      await Session.findOneAndUpdate(
        { tokenHash: hashToken(refresh_token) },
        { revokedAt: new Date() }
      );
    }
    return success(res, 200, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { login, logout };
