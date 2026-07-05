const { ZodError } = require('zod');

const ApiError = require('../utils/ApiError');
const STATUS_CODES = require('../constants/statusCodes');

const validate = (schema) => {
    return (req, res, next) => {
        try {
            const validatedData = schema.parse(req.body);
            req.validatedData = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(
                        STATUS_CODES.BAD_REQUEST,
                        'Validation Failed.',
                        error.flatten().fieldErrors
                    )
                );
            }
            next(error);
        }
    };
};

module.exports = validate;