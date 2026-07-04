const STATUS_CODES = require('../constants/statusCodes');

class ApiResponse {
    static success(
        res,
        statusCodes = STATUS_CODES.OK,
        message = 'Success',
        data = null
    ) {
        return res.status(statusCodes).json({
            success: true,
            statusCodes,
            message,
            data,
        });
    }
    static error(
        res,
        statusCodes = STATUS_CODES.INTERNAL_SERVER_ERROR,
        message = 'Something went wrong',
        errors = []
    ) {
        return res.status(statusCodes).json({
            success: false,
            statusCodes,
            message,
            errors,
        });
    }
}

module.exports = ApiResponse;