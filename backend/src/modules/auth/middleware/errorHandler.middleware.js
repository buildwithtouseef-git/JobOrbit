const { error } = require('../utils/response');

// Catches anything thrown/passed to next(err) that wasn't handled inside a controller.
// Keeps error responses consistent and prevents leaking stack traces to the client.
function errorHandler(err, req, res, next) {
  console.error(err);
  return error(res, 500, 'Something went wrong on the server', 'SERVER_ERROR');
}

module.exports = errorHandler;
