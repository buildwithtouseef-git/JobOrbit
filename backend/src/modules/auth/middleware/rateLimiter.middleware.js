const rateLimit = require('express-rate-limit');

// General protection against brute-force / spam on sensitive endpoints.
// This is in addition to the email-specific LoginAttempt check done in
// login.controller.js, which is business-logic level.

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // per IP
  message: {
    success: false,
    message: 'Too many login attempts from this device. Please try again later.',
    error_code: 'TOO_MANY_REQUESTS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many password reset requests. Please try again later.',
    error_code: 'TOO_MANY_REQUESTS',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, forgotPasswordLimiter };
