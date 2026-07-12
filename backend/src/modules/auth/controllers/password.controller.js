const User = require('../models/User.model');
const Session = require('../models/Session.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateRawToken, hashToken } = require('../utils/token');
const { sendPasswordResetEmail } = require('../utils/email');
const { success, error } = require('../utils/response');
const env = require('../config/env');

// --- Member 3: Password Recovery & Account Security ---

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always respond with the same generic message, whether or not the
    // email exists, so we never leak which emails are registered.
    if (user) {
      const rawToken = generateRawToken();
      const expiresAt = new Date(Date.now() + env.tokens.passwordResetExpiryMin * 60 * 1000);
      await PasswordResetToken.create({
        user: user._id,
        tokenHash: hashToken(rawToken),
        expiresAt,
      });
      await sendPasswordResetEmail(user.email, rawToken);
    }

    return success(res, 200, 'If that email exists, a password reset link has been sent.');
  } catch (err) {
    next(err);
  }
}



module.exports = { forgotPassword};
