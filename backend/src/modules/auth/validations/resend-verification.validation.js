const { z } = require('zod');

const resendVerificationSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Please provide a valid email address.'),
});

module.exports = resendVerificationSchema;
