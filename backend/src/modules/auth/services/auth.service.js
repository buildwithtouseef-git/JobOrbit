const authRepository = require('../repository/auth.repository');
const passwordUtil = require('../../../shared/utils/password.util');
const jwtUtil = require('../../../shared/utils/jwt.util');
const tokenUtil = require('../../../shared/utils/token.util');
const emailService = require('./email/email.service');
const ApiError = require('../../../shared/utils/ApiError');
const STATUS_CODES = require('../../../shared/constants/statusCodes');
const RESPONSE_MESSAGES = require('../../../shared/constants/responseMessages');
const USER_ROLES = require('../../../shared/constants/roles');
const LOGIN_ATTEMPT_STATUS = require('../../../shared/constants/loginAttemptStatus');
const TOKEN_TYPES = require('../../../shared/constants/tokenTypes');
const env = require('../../../config/env.config');
const { parseDuration } = require('../../../shared/utils/time.util');
const logger = require('../../../logger/logger');

const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MINUTES = 15;

class AuthService {
    _sanitizeUser(user) {
        const userObject = user.toObject ? user.toObject() : { ...user };

        delete userObject.password;
        delete userObject.refreshToken;

        return userObject;
    }

    _getLoginLockoutWindowStart() {
        return new Date(Date.now() - LOGIN_LOCKOUT_MINUTES * 60 * 1000);
    }

    _getPasswordResetExpiryDate() {
        return new Date(Date.now() + parseDuration(env.PASSWORD_RESET_TOKEN_EXPIRES));
    }

    async _ensureLoginAllowed(email) {
        const failedAttempts = await authRepository.countRecentFailedLoginAttempts(
            email,
            this._getLoginLockoutWindowStart()
        );

        if (failedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
            throw new ApiError(
                STATUS_CODES.TOO_MANY_REQUESTS,
                RESPONSE_MESSAGES.AUTH.TOO_MANY_LOGIN_ATTEMPTS
            );
        }
    }

    async _recordLoginAttempt({
        email,
        userId = null,
        ipAddress,
        userAgent,
        status,
        reason = '',
    }) {
        await authRepository.createLoginAttempt({
            userId,
            emailTried: email,
            ipAddress,
            userAgent,
            status,
            reason,
        });
    }

    async _issueAuthTokens(user) {
        const accessToken = jwtUtil.generateAccessToken(user);
        const refreshToken = jwtUtil.generateRefreshToken(user);
        const hashedRefreshToken = tokenUtil.hashToken(refreshToken);

        await authRepository.updateRefreshToken(user._id, hashedRefreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }

    async _sendVerificationEmail(user) {
        const verificationToken = jwtUtil.generateEmailVerificationToken(user);

        await emailService.sendVerifyEmail({
            to: user.email,
            fullName: user.fullName,
            verificationToken,
        });
    }

    async signup(userData) {
        const {
            fullName,
            email,
            username,
            password,
        } = userData;

        const existingUserByEmail = await authRepository.findUserByEmail(email);

        if (existingUserByEmail) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                RESPONSE_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS
            );
        }

        const existingUserByUsername = await authRepository.findUserByUsername(username);

        if (existingUserByUsername) {
            throw new ApiError(
                STATUS_CODES.CONFLICT,
                RESPONSE_MESSAGES.AUTH.USERNAME_ALREADY_EXISTS
            );
        }

        const hashedPassword = await passwordUtil.hashPassword(password);

        const user = await authRepository.createUser({
            fullName,
            email,
            username,
            password: hashedPassword,
            role: USER_ROLES.JOB_SEEKER,
        });

        try {
            await this._sendVerificationEmail(user);
        } catch (error) {
            logger.error(`Failed to send verification email to ${user.email}: ${error.message}`);
        }

        return {
            user: this._sanitizeUser(user),
        };
    }

    async login({ email, password, ipAddress, userAgent }) {
        await this._ensureLoginAllowed(email);

        const user = await authRepository.findUserByEmail(email, {
            includePassword: true,
        });

        if (!user) {
            await this._recordLoginAttempt({
                email,
                ipAddress,
                userAgent,
                status: LOGIN_ATTEMPT_STATUS.FAILED,
                reason: RESPONSE_MESSAGES.AUTH.INVALID_CREDENTIALS,
            });

            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                RESPONSE_MESSAGES.AUTH.INVALID_CREDENTIALS
            );
        }

        const isPasswordValid = await passwordUtil.comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            await this._recordLoginAttempt({
                email,
                userId: user._id,
                ipAddress,
                userAgent,
                status: LOGIN_ATTEMPT_STATUS.FAILED,
                reason: RESPONSE_MESSAGES.AUTH.INVALID_CREDENTIALS,
            });

            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                RESPONSE_MESSAGES.AUTH.INVALID_CREDENTIALS
            );
        }

        if (!user.isActive) {
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                RESPONSE_MESSAGES.AUTH.ACCOUNT_DEACTIVATED
            );
        }

        if (!user.isEmailVerified) {
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                RESPONSE_MESSAGES.AUTH.EMAIL_NOT_VERIFIED
            );
        }

        await authRepository.clearLoginAttempts(email);

        await this._recordLoginAttempt({
            email,
            userId: user._id,
            ipAddress,
            userAgent,
            status: LOGIN_ATTEMPT_STATUS.SUCCESS,
        });

        await authRepository.updateLastLogin(user._id);

        const tokens = await this._issueAuthTokens(user);

        return {
            user: this._sanitizeUser(user),
            ...tokens,
        };
    }

    async forgotPassword(email) {
        const user = await authRepository.findUserByEmail(email);

        if (!user) {
            return {
                message: RESPONSE_MESSAGES.AUTH.PASSWORD_RESET_EMAIL_SENT,
            };
        }

        await authRepository.deletePasswordResetTokensByUserId(user._id);

        const { token, tokenHash } = tokenUtil.generatePasswordResetToken();

        await authRepository.createPasswordResetToken({
            userId: user._id,
            tokenHash,
            expiresAt: this._getPasswordResetExpiryDate(),
        });

        try {
            await emailService.sendResetPasswordEmail({
                to: user.email,
                fullName: user.fullName,
                resetToken: token,
            });
        } catch (error) {
            logger.error(`Failed to send reset password email to ${user.email}: ${error.message}`);
        }

        return {
            message: RESPONSE_MESSAGES.AUTH.PASSWORD_RESET_EMAIL_SENT,
        };
    }

    async resetPassword({ token, newPassword }) {
        const tokenHash = tokenUtil.hashToken(token);

        const resetTokenRecord = await authRepository.findPasswordResetToken(tokenHash);

        if (!resetTokenRecord) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                RESPONSE_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN
            );
        }

        const user = await authRepository.findUserById(resetTokenRecord.userId);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                RESPONSE_MESSAGES.AUTH.USER_NOT_FOUND
            );
        }

        const hashedPassword = await passwordUtil.hashPassword(newPassword);

        await authRepository.updatePassword(user._id, hashedPassword);
        await authRepository.markPasswordResetTokenUsed(resetTokenRecord._id);
        await authRepository.deletePasswordResetTokensByUserId(user._id);
        await authRepository.clearRefreshToken(user._id);

        return {
            message: RESPONSE_MESSAGES.AUTH.PASSWORD_RESET_SUCCESS,
        };
    }

    async changePassword({ userId, currentPassword, newPassword }) {
        const user = await authRepository.findUserById(userId, {
            includePassword: true,
        });

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                RESPONSE_MESSAGES.AUTH.USER_NOT_FOUND
            );
        }

        const isCurrentPasswordValid = await passwordUtil.comparePassword(
            currentPassword,
            user.password
        );

        if (!isCurrentPasswordValid) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                RESPONSE_MESSAGES.AUTH.INCORRECT_CURRENT_PASSWORD
            );
        }

        const hashedPassword = await passwordUtil.hashPassword(newPassword);

        await authRepository.updatePassword(user._id, hashedPassword);
        await authRepository.clearRefreshToken(user._id);

        return {
            message: RESPONSE_MESSAGES.AUTH.PASSWORD_CHANGED,
        };
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                RESPONSE_MESSAGES.AUTH.INVALID_REFRESH_TOKEN
            );
        }

        let decoded;

        try {
            decoded = jwtUtil.verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                error.name === 'TokenExpiredError'
                    ? RESPONSE_MESSAGES.AUTH.TOKEN_EXPIRED
                    : RESPONSE_MESSAGES.AUTH.INVALID_REFRESH_TOKEN
            );
        }

        const user = await authRepository.findUserById(decoded.userId, {
            includeRefreshToken: true,
        });

        if (!user || !user.isActive) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                RESPONSE_MESSAGES.AUTH.INVALID_REFRESH_TOKEN
            );
        }

        const incomingTokenHash = tokenUtil.hashToken(refreshToken);

        if (!user.refreshToken || user.refreshToken !== incomingTokenHash) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                RESPONSE_MESSAGES.AUTH.INVALID_REFRESH_TOKEN
            );
        }

        const tokens = await this._issueAuthTokens(user);

        return {
            user: this._sanitizeUser(user),
            ...tokens,
            message: RESPONSE_MESSAGES.AUTH.TOKEN_REFRESHED,
        };
    }

    async logout(userId) {
        await authRepository.clearRefreshToken(userId);

        return {
            message: RESPONSE_MESSAGES.AUTH.LOGOUT_SUCCESS,
        };
    }

    async verifyEmail(token) {
        if (!token) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                RESPONSE_MESSAGES.AUTH.INVALID_TOKEN
            );
        }

        let decoded;

        try {
            decoded = jwtUtil.verifyEmailVerificationToken(token);
        } catch (error) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                error.name === 'TokenExpiredError'
                    ? RESPONSE_MESSAGES.AUTH.TOKEN_EXPIRED
                    : RESPONSE_MESSAGES.AUTH.INVALID_TOKEN
            );
        }

        if (decoded.type !== TOKEN_TYPES.EMAIL_VERIFICATION) {
            throw new ApiError(
                STATUS_CODES.BAD_REQUEST,
                RESPONSE_MESSAGES.AUTH.INVALID_TOKEN
            );
        }

        const user = await authRepository.findUserById(decoded.userId);

        if (!user) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                RESPONSE_MESSAGES.AUTH.USER_NOT_FOUND
            );
        }

        if (user.isEmailVerified) {
            return {
                message: RESPONSE_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED,
            };
        }

        await authRepository.updateUser(user._id, {
            isEmailVerified: true,
        });

        return {
            message: RESPONSE_MESSAGES.AUTH.EMAIL_VERIFIED,
        };
    }

    async resendVerification(email) {
        const user = await authRepository.findUserByEmail(email);

        if (!user) {
            return {
                message: RESPONSE_MESSAGES.AUTH.PASSWORD_RESET_EMAIL_SENT,
            };
        }

        if (user.isEmailVerified) {
            return {
                message: RESPONSE_MESSAGES.AUTH.EMAIL_ALREADY_VERIFIED,
            };
        }

        try {
            await this._sendVerificationEmail(user);
        } catch (error) {
            logger.error(`Failed to resend verification email to ${user.email}: ${error.message}`);
        }

        return {
            message: RESPONSE_MESSAGES.AUTH.PASSWORD_RESET_EMAIL_SENT,
        };
    }
}

module.exports = new AuthService();
