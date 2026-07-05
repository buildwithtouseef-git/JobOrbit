const RESPONSE_MESSAGES = Object.freeze({
    COMMON: {
        SUCCESS: 'Request completed successfully.',
        FAILED: 'Request failed.',
        INTERNAL_SERVER_ERROR: 'Internal server error.',
        VALIDATION_FAILED: 'Validation failed.',
        UNAUTHORIZED: 'Unauthorized access.',
        FORBIDDEN: 'Access denied.',
        ROUTE_NOT_FOUND: 'Route not found.',
        INVALID_RESOURCE_ID: 'Invalid resource id.',
    },

    AUTH: {
        SIGNUP_SUCCESS: 'Account created successfully.',
        LOGIN_SUCCESS: 'Login successful.',
        LOGOUT_SUCCESS: 'Logout successful.',
        EMAIL_ALREADY_EXISTS: 'Email already exists.',
        USERNAME_ALREADY_EXISTS: 'Username already exists.',
        USER_NOT_FOUND: 'User not found.',
        INVALID_CREDENTIALS: 'Invalid email or password.',
        ACCOUNT_DEACTIVATED: 'Your account has been deactivated. Please contact support.',
        EMAIL_NOT_VERIFIED: 'Please verify your email before logging in.',
        PASSWORD_CHANGED: 'Password changed successfully.',
        PASSWORD_RESET_EMAIL_SENT: 'If that email exists, a reset link has been sent.',
        PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
        INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired reset token.',
        INCORRECT_CURRENT_PASSWORD: 'Current password is incorrect.',
        TOO_MANY_LOGIN_ATTEMPTS: 'Too many failed login attempts. Please try again after 15 minutes.',
        INVALID_TOKEN: 'Invalid token.',
        TOKEN_EXPIRED: 'Token has expired.',
        TOKEN_REFRESHED: 'Token refreshed successfully.',
        EMAIL_VERIFICATION_SENT: 'Verification email sent successfully.',
        EMAIL_VERIFIED: 'Email verified successfully.',
        EMAIL_ALREADY_VERIFIED: 'Email is already verified.',
        INVALID_REFRESH_TOKEN: 'Invalid refresh token.',
    },
});

module.exports = RESPONSE_MESSAGES;