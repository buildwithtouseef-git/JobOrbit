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
                expiresIn: env.EMAIL_VERIFICATION_TOKEN_EXPIRES || '1m',
            }
        );
    }

    // Generate Password Reset Step Token (after OTP verified)
    generatePasswordResetStepToken(user) {
        return jwt.sign(
            {
                userId: user._id.toString(),
                type: 'password_reset_step',
            },
            env.JWT_ACCESS_SECRET,
            {
                expiresIn: '10m',
            }
        );
    }

    // Verify Password Reset Step Token
    verifyPasswordResetStepToken(token) {
        return jwt.verify(token, env.JWT_ACCESS_SECRET);
    }

    // Decode Token (Without Verification)
    decodeToken(token) {
        return jwt.decode(token);
    }
}

module.exports = new JwtUtil();