const STATUS_CODES = require('../constants/statusCodes');
const RESPONSE_MESSAGES = require('../constants/responseMessages');

const errorMiddlware = (err, req, res, next) => {
    let statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR;
    let errors = err.errors || [];

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = RESPONSE_MESSAGES.COMMON.VALIDATION_FAILED;

        errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));
    }
    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        statusCode = STATUS_CODES.CONFLICT;
        const field = Object.keys(err.keyvalue)[0];
        message = `${field} already exist.`;
        errors = [
            {
                field,
                message,
            },
        ];
    }
    // Mongoose Invalid ObjectId
    if (err.name === 'CastError') {
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = RESPONSE_MESSAGES.COMMON.INVALID_RESOURCE_ID;
        errors = [
            {
                field: err.path,
                message,
            },
        ];
    }
    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = STATUS_CODES.UNAUTHORIZED;
        message = RESPONSE_MESSAGES.AUTH.INVALID_TOKEN;
    }
    if (err.name === 'TokenExpiredError') {
        statusCode = STATUS_CODES.UNAUTHORIZED;
        message = RESPONSE_MESSAGES.AUTH.TOKEN_EXPIRED;
    }
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
        }),
    });
};

module.exports = errorMiddlware;