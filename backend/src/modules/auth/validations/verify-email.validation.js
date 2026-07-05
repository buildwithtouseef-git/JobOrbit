const { z } = require('zod');

const verifyEmailSchema = z.object({
    token: z
        .string()
        .trim()
        .min(1, 'Verification token is required.'),
});

module.exports = verifyEmailSchema;
