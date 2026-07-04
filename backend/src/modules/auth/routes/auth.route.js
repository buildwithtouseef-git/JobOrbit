const express = require('express');
const router = express.Router();
const authController = require('../auth.controller');
const { validate } = require('../../shared/middleware/validate.middleware'); // assume validate middleware hai
const { forgotPasswordSchema, resetPasswordSchema } = require('../validations/auth.validation');

// ✅ Forgot Password Route (POST)
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);

// ✅ Reset Password Route (POST)
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

// (Optional) Verify Token validity - GET
router.get('/verify-reset-token/:token', asyncHandler(async (req, res) => {
  const user = await authRepository.findUserByResetToken(req.params.token);
  if(!user) return res.status(400).json({ success: false, message: "Invalid token" });
  res.json({ success: true, message: "Token valid" });
}));

module.exports = router;