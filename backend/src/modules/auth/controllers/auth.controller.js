const asyncHandler = require('../../shared/utils/asyncHandler');
const ApiResponse = require('../../shared/utils/ApiResponse');
const { forgotPasswordService, resetPasswordService } = require('./services/auth.service');

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await forgotPasswordService(req.body.email);
  res.status(200).json(new ApiResponse(200, result, "Reset link sent"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const result = await resetPasswordService(token, newPassword);
  res.status(200).json(new ApiResponse(200, result, "Password reset successful"));
});

module.exports = { forgotPassword, resetPassword };