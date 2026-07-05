const crypto = require('crypto');

const RESET_TOKEN_BYTES = 32;

class TokenUtil {
    // Generate a secure random token
    generateResetToken() {
        return crypto.randomBytes(RESET_TOKEN_BYTES).toString('hex');
    }

    // Hash token before storing in database
    hashToken(token) {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
    }

    // Generate token + hash together
    generatePasswordResetToken() {
        const token = this.generateResetToken();
        return {
            token,
            tokenHash: this.hashToken(token),
        };
    }
}

module.exports =  new TokenUtil();