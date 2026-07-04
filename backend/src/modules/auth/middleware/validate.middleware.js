const { validationResult } = require('express-validator');
const { error } = require('../utils/response');

// Runs after a validator rule chain; short-circuits with 400 if any rule failed.
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, 400, errors.array()[0].msg, 'VALIDATION_ERROR');
  }
  next();
}

module.exports = validate;
