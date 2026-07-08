const { z } = require('zod');

const resendVerificationSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Please provide a valid email address.'),
    type: z.string().optional(),
}).strict();

module.exports = resendVerificationSchema;
