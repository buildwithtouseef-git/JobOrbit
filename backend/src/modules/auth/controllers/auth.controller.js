const authService = require('../services/auth.service');
const asyncHandler = require('../../../shared/utils/asyncHandler');
const ApiResponse = require('../../../shared/utils/ApiResponse');
const STATUS_CODES = require('../../../shared/constants/statusCodes');
const RESPONSE_MESSAGES = require('../../../shared/constants/responseMessages');

const {
    setRefreshTokenCookie,
    clearRefreshTokenCookie,
    getRefreshTokenFromRequest,
} = require('../../../shared/utils/cookie.util');

const getRequestMeta = (req) => ({
    ipAddress: req.ip || req.socket?.remoteAddress || 'unknown',
    userAgent: req.get('user-agent') || '',
});

const signup = asyncHandler(async (req, res) => {
    const result = await authService.signup(req.validatedData);

    return ApiResponse.success(
        res,
        STATUS_CODES.CREATED,
        RESPONSE_MESSAGES.AUTH.SIGNUP_SUCCESS,
        result
    );
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.validatedData;
    const { ipAddress, userAgent } = getRequestMeta(req);

    const result = await authService.login({
        email,
        password,
        ipAddress,
        userAgent,
    });

    setRefreshTokenCookie(res, result.refreshToken);

    const { refreshToken, ...responseData } = result;

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        RESPONSE_MESSAGES.AUTH.LOGIN_SUCCESS,
        responseData
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.validatedData;
    const result = await authService.forgotPassword(email);

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        result.message,
        null
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.validatedData;
    const result = await authService.resetPassword({
        token,
        newPassword,
    });

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        result.message,
        null
    );
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.validatedData;
    const result = await authService.changePassword({
        userId: req.user._id,
        currentPassword,
        newPassword,
    });

    clearRefreshTokenCookie(res);

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        result.message,
        null
    );
});

const refreshToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = getRefreshTokenFromRequest(req);
    const result = await authService.refreshToken(incomingRefreshToken);

    setRefreshTokenCookie(res, result.refreshToken);

    const { refreshToken: newRefreshToken, message, ...responseData } = result;

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        message,
        responseData
    );
});

const logout = asyncHandler(async (req, res) => {
    const result = await authService.logout(req.user._id);

    clearRefreshTokenCookie(res);

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        result.message,
        null
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.validatedData;
    const result = await authService.verifyEmail(token);

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        result.message,
        null
    );
});

const resendVerification = asyncHandler(async (req, res) => {
    const { email } = req.validatedData;
    const result = await authService.resendVerification(email);

    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        result.message,
        null
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return ApiResponse.success(
        res,
        STATUS_CODES.ok,
        'User profile retrieved successfully.',
        {
            user: req.user,
        }
    );
});

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshToken,
    logout,
    verifyEmail,
    resendVerification,
    getCurrentUser,
};
