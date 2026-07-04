// Forgot Password (sirf email chahiye)
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

// Reset Password (token, new pass, confirm pass)
const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
});

module.exports = { forgotPasswordSchema, resetPasswordSchema };