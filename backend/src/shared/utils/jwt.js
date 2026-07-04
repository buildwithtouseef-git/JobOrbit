const jwt = require('jsonwebtoken');
const env = require('../config/env');

// Access tokens are short-lived JWTs sent on every request (Authorization header).
// Refresh tokens are opaque random strings (see utils/token.js), stored hashed
// in the Session collection, and exchanged for a new access token when needed.

function generateAccessToken(user) {
  return jwt.sign(
    { user_id: user._id.toString(), email: user.email, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.accessExpiry }
  );
}

function verifyAccessToken(token) {
  // Throws if invalid/expired — caller (middleware) should catch this.
  return jwt.verify(token, env.jwt.secret);
}

module.exports = { generateAccessToken, verifyAccessToken };
