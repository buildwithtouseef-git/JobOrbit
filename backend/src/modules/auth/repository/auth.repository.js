const User = require("../models/user.model");
const PasswordResetToken = require("../models/passwordResetToken.model");
const LoginAttempt = require("../models/loginAttempt.model");

const LOGIN_ATTEMPT_STATUS = require("../../../shared/constants/loginAttemptStatus");

class AuthRepository {

    // User
    async createUser(userData) {
        return User.create(userData);
    }

    async findUserByEmail(email, options = {}) {
        const {
            includePassword = false,
            includeRefreshToken = false,
            lean = false,
        } = options;

        const query = User.findOne({ email });

        if (includePassword) {
            query.select("+password");
        }

        if (includeRefreshToken) {
            query.select("+refreshToken");
        }

        if (!includePassword) {
            query.select("-password");
        }

        if (!includeRefreshToken) {
            query.select("-refreshToken");
        }

        if (lean) {
            query.lean();
        }

        return query;
    }

    async findUserByUsername(username) {
        return User.findOne({ username });
    }

    async findUserById(userId, options = {}) {
        const {
            includePassword = false,
            includeRefreshToken = false,
            lean = false,
        } = options;

        const query = User.findById(userId);

        if (includePassword) {
            query.select("+password");
        }

        if (includeRefreshToken) {
            query.select("+refreshToken");
        }

        if (!includePassword) {
            query.select("-password");
        }

        if (!includeRefreshToken) {
            query.select("-refreshToken");
        }

        if (lean) {
            query.lean();
        }

        return query;
    }

    async updateUser(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });
    }

    async updatePassword(userId, hashedPassword) {
        return User.findByIdAndUpdate(
            userId,
            {
                password: hashedPassword,
            },
            {
                new: true,
            }
        );
    }

    async updateLastLogin(userId) {
        return User.findByIdAndUpdate(
            userId,
            {
                lastLoginAt: new Date(),
            },
            {
                new: false,
            }
        );
    }

    async updateRefreshToken(userId, refreshToken) {
        return User.findByIdAndUpdate(
            userId,
            {
                refreshToken,
            },
            {
                new: true,
            }
        );
    }

    async clearRefreshToken(userId) {
        return User.findByIdAndUpdate(
            userId,
            {
                refreshToken: null,
            },
            {
                new: true,
            }
        );
    }

    // Password Reset Tokens
    async createPasswordResetToken(tokenData) {
        return PasswordResetToken.create(tokenData);
    }

    async findPasswordResetToken(tokenHash) {
        return PasswordResetToken.findOne({
            tokenHash,
            usedAt: null,
            expiresAt: {
                $gt: new Date(),
            },
        });
    }

    async markPasswordResetTokenUsed(tokenId) {
        return PasswordResetToken.findByIdAndUpdate(
            tokenId,
            {
                usedAt: new Date(),
            },
            {
                new: true,
            }
        );
    }

    async deletePasswordResetTokensByUserId(userId) {
        return PasswordResetToken.deleteMany({ userId });
    }

    // Login Attempts
    async createLoginAttempt(loginAttemptData) {
        return LoginAttempt.create(loginAttemptData);
    }

    async countRecentFailedLoginAttempts(email, fifteenMinutesAgo) {
        return LoginAttempt.countDocuments({
            emailTried: email,
            status: LOGIN_ATTEMPT_STATUS.FAILED,
            createdAt: {
                $gte: fifteenMinutesAgo,
            },
        });
    }

    async clearLoginAttempts(email) {
        return LoginAttempt.deleteMany({
            emailTried: email,
            status: LOGIN_ATTEMPT_STATUS.FAILED,
        });
    }
}

module.exports = new AuthRepository();
