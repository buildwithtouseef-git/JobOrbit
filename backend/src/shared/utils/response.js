// Standard response shapes used by every endpoint in the auth module.
// Keeping this consistent means the frontend only has to handle one format.

function success(res, statusCode, message, data = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function error(res, statusCode, message, errorCode = 'ERROR') {
  return res.status(statusCode).json({
    success: false,
    message,
    error_code: errorCode,
  });
}

module.exports = { success, error };
