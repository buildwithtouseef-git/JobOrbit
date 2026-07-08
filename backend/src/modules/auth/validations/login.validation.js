const { z } = require('zod');

const {
    email,
} = require('../../../shared/validations/common.validation');

const loginSchema = z.object({
    email,

    password: z
        .string()
        .min(1, 'Password is required.'),
}).strict();

module.exports = loginSchema;