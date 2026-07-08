const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many authentication requests. Please try again later.',
    },
    skipSuccessfulRequests: true,
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: 'Too many requests. Please try again later.',
    },
});

module.exports = {
    authLimiter,
    generalLimiter,
};
