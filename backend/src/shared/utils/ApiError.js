const STATUS_CODES = require('../constants/statusCodes');

class ApiError extends Error {
    constructor(
        statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
        message = 'Something went wrong',
        errors = [],
        isOperational = true
    ) {
        super(message);

        this.success = false;
        this.statusCode = statusCode;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;