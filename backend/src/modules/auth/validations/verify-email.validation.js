const { z } = require('zod');

const verifyEmailSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, 'OTP must be 6 digits.'),
}).strict();

module.exports = verifyEmailSchema;
