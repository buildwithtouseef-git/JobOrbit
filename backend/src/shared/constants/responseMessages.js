const RESPONSE_MESSAGES = Object.freeze({
    // Common
    SUCCESS: "Request completed successfully.",
    FAILED: "Request failed.",
    INTERNAL_SERVER_ERROR: "Internal server error.",

    // Authentication
    REGISTER_SUCCESS: "Account created successfully.",
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "Access denied.",

    // Password
    PASSWORD_CHANGED: "Password changed successfully.",
    PASSWORD_RESET_EMAIL_SENT: "If that email exists, a reset link has been sent.",
    PASSWORD_RESET_SUCCESS: "Password reset successfully.",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired reset token.",
    INCORRECT_CURRENT_PASSWORD: "Current password is incorrect.",

    // Validation
    VALIDATION_FAILED: "Validation failed.",

    // Resource
    USER_NOT_FOUND: "User not found.",
    EMAIL_ALREADY_EXISTS: "Email already exists.",

    // Login Attempts
    TOO_MANY_LOGIN_ATTEMPTS: "Too many failed login attempts. Please try again after 15 minutes.",

    // Route
    ROUTE_NOT_FOUND: "Route not found.",

    // Message
    INVALID_TOKEN: "Invalid token.",
    TOKEN_EXPIRED: "Token has expired.",
    INVALID_RESOURCE_ID: "Invalid resource id.",
});

module.exports = RESPONSE_MESSAGES;