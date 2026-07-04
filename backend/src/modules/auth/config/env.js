require('dotenv').config();

// Single place to read environment variables with sane defaults,
// so the rest of the codebase never touches process.env directly.
module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/job_journey_db',

  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiryDays: Number(process.env.JWT_REFRESH_EXPIRY_DAYS || 7),
  },

  tokens: {
    emailVerificationExpiryMin: Number(process.env.EMAIL_VERIFICATION_EXPIRY_MIN || 60),
    passwordResetExpiryMin: Number(process.env.PASSWORD_RESET_EXPIRY_MIN || 60),
  },

  security: {
    maxLoginAttempts: Number(process.env.MAX_LOGIN_ATTEMPTS || 5),
    loginAttemptWindowMin: Number(process.env.LOGIN_ATTEMPT_WINDOW_MIN || 15),
  },

  email: {
    from: process.env.EMAIL_FROM || 'no-reply@jobjourney.com',
  },
};
