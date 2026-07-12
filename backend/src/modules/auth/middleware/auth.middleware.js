<<<<<<< HEAD
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
=======
const { verifyAccessToken } = require('../utils/jwt');
const { error } = require('../utils/response');

// Protects any route in the whole project (not just Auth module routes).
// Usage in other modules:  router.get('/applications', authenticate, controller.list)
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 401, 'Missing or invalid Authorization header', 'UNAUTHORIZED');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    // Downstream controllers/other modules can rely on req.user.user_id
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 401, 'Invalid or expired access token', 'INVALID_TOKEN');
  }
}

// Reusable ownership check other modules (Companies, Applications, etc.) can
// use to confirm a record belongs to the logged-in user before allowing
// read/update/delete. `resourceUserId` is the user_id stored on that record.
function isOwner(req, resourceUserId) {
  return req.user && req.user.user_id === resourceUserId.toString();
}

module.exports = { authenticate, isOwner };
>>>>>>> 4f508ba2b3905706859ca275bcaa71bddd376a9e
