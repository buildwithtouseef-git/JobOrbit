const jwt = require("jsonwebtoken");
const env = require("../../config/env.config");
const TOKEN_TYPES = require("../constants/tokenTypes");

class JwtUtil {

    // Generate Access Token
    generateAccessToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            env.JWT_ACCESS_SECRET,
            {
                expiresIn: env.JWT_ACCESS_EXPIRES_IN,
            }
        );
    }

    // Generate Refresh Token
    generateRefreshToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            env.JWT_REFRESH_SECRET,
            {
                expiresIn: env.JWT_REFRESH_EXPIRES_IN,
            }
        );
    }

    // Verify Access Token
    verifyAccessToken(token) {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    }

    // Verify Refresh Token
    verifyRefreshToken(token) {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }

    // Verify Email Verification Token
    verifyEmailVerificationToken(token) {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    }

    // Generate Email Verification Token
    generateEmailVerificationToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                type: TOKEN_TYPES.EMAIL_VERIFICATION,
            },
            env.JWT_ACCESS_SECRET,
            {
                expiresIn: env.JWT_ACCESS_EXPIRES_IN,
            }
        );
    }

    // Decode Token (Without Verification)
    decodeToken(token) {
        return jwt.decode(token);
    }
}

module.exports = new JwtUtil();