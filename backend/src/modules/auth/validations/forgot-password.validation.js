const { z } = require('zod');

const { email } = require('../../../shared/validations/common.validation');

const forgotPasswordSchema = z.object({
    email,
});

module.exports = forgotPasswordSchema;