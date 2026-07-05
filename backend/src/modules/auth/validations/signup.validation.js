const { z } = require('zod');

const {
    fullName,
    email,
    username,
    password
} = require('../../../shared/validations/common.validation');

const signupSchema = z
    .object({
        fullName,
        email,
        username,
        password,

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

    module.exports = signupSchema;