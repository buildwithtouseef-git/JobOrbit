const User = require('../models/User.model');
const EmailVerificationToken = require('../models/EmailVerificationToken.model');
const { hashPassword } = require('../utils/hash');
const { generateRawToken, hashToken } = require('../utils/token');
const { sendVerificationEmail } = require('../utils/email');
const { success, error } = require('../utils/response');
const env = require('../config/env');

// --- Member 1: Registration & Email Verification ---

async function register(req, res, next) {
  try {
    const { full_name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return error(res, 409, 'An account with this email already exists', 'EMAIL_ALREADY_EXISTS');
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ fullName: full_name, email, passwordHash });

    // Generate + store (hashed) email verification token
    const rawToken = generateRawToken();
    const expiresAt = new Date(Date.now() + env.tokens.emailVerificationExpiryMin * 60 * 1000);
    await EmailVerificationToken.create({
      user: user._id,
      tokenHash: hashToken(rawToken),
      expiresAt,
    });

    await sendVerificationEmail(user.email, rawToken);

    return success(res, 201, 'Account created. Please check your email to verify your account.', {
      user_id: user._id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
}

async function verifyEmail(req, res, next) {
  try {
    const { token } = req.body;
    const tokenHash = hashToken(token);

    const tokenRecord = await EmailVerificationToken.findOne({
      tokenHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenRecord) {
      return error(res, 400, 'Invalid or expired verification token', 'INVALID_OR_EXPIRED_TOKEN');
    }

    await User.findByIdAndUpdate(tokenRecord.user, { status: 'active' });
    tokenRecord.usedAt = new Date();
    await tokenRecord.save();

    return success(res, 200, 'Email verified successfully. You can now log in.');
  } catch (err) {
    next(err);
  }
}

module.exports = { register, verifyEmail };
