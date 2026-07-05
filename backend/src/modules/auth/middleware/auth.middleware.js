const authRepository = require('../repository/auth.repository');
const jwtUtil = require('../../../shared/utils/jwt.util');
const asyncHandler = require('../../../shared/utils/asyncHandler');
const ApiError = require('../../../shared/utils/ApiError');
const STATUS_CODES = require('../../../shared/constants/statusCodes');
const RESPONSE_MESSAGES = require('../../../shared/constants/responseMessages');

const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            RESPONSE_MESSAGES.COMMON.UNAUTHORIZED
        );
    }

    const token = authHeader.split(' ')[1];

    let decoded;

    try {
        decoded = jwtUtil.verifyAccessToken(token);
    } catch (error) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            error.name === 'TokenExpiredError'
                ? RESPONSE_MESSAGES.AUTH.TOKEN_EXPIRED
                : RESPONSE_MESSAGES.AUTH.INVALID_TOKEN
        );
    }

    const user = await authRepository.findUserById(decoded.userId);

    if (!user) {
        throw new ApiError(
            STATUS_CODES.UNAUTHORIZED,
            RESPONSE_MESSAGES.AUTH.USER_NOT_FOUND
        );
    }

    if (!user.isActive) {
        throw new ApiError(
            STATUS_CODES.FORBIDDEN,
            RESPONSE_MESSAGES.AUTH.ACCOUNT_DEACTIVATED
        );
    }

    req.user = user;
    next();
});

module.exports = { authenticate, };
