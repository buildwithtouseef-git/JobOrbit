const { z } = require('zod');

const { password } = require('../../../shared/validations/common.validation');

const resetPasswordSchema = z
    .object({
        email: z.string().email(),
        resetToken: z
            .string()
            .trim()
            .min(1, 'Reset token is required.'),

        password: password,
    }).strict();

module.exports = resetPasswordSchema;