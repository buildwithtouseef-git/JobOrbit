const crypto = require('crypto');

// Used for email verification tokens, password reset tokens, and refresh tokens.
// We generate a random raw token to send to the user (via link/email), but only
// ever store its HASH in the database. This way, even if the DB is leaked,
// the raw tokens (which grant access) cannot be reconstructed.

function generateRawToken() {
  return crypto.randomBytes(32).toString('hex');
}

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

module.exports = { generateRawToken, hashToken };
