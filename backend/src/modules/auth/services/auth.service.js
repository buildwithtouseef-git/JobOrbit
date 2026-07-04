const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../../shared/helpers/sendEmail'); // Assume ye helper hai

// 1. Forgot Password Service
const forgotPasswordService = async (email) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpiry = Date.now() + 3600000; // 1 hour

  // Save token in DB
  await authRepository.updateUserTokens(user._id, {
    resetPasswordToken: resetToken,
    resetPasswordExpires: resetExpiry
  });

  // Send Email (Frontend link ke saath)
  const resetLink = `http://localhost:5173/reset-password/${resetToken}`; // Vite default port
  await sendEmail(user.email, "Password Reset", `Click here to reset: ${resetLink}`);

  return { message: "Reset link sent to email" };
};

// 2. Reset Password Service
const resetPasswordService = async (token, newPassword) => {
  const user = await authRepository.findUserByResetToken(token);
  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Update password and clear reset tokens
  await authRepository.updateUserTokens(user._id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null
  });

  return { message: "Password reset successfully" };
};