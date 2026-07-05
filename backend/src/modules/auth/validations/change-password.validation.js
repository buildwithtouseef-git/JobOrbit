const { z } = require('zod');

const { password } = require('../../../shared/validations/common.validation');

const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, 'Current password is required.'),

        newPassword: password,

        confirmPassword: z
            .string()
            .min(1, 'Confirm password is required.'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

module.exports = changePasswordSchema;