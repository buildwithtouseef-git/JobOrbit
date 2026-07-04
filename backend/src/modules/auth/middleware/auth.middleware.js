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
