const { z } = require('zod');

const verifyResetOtpSchema = z.object({
    email: z.string().email('Please provide a valid email address.'),
    otp: z.string().length(6, 'OTP must be exactly 6 digits.'),
}).strict();

module.exports = verifyResetOtpSchema;
