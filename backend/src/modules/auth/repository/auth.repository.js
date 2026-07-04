// Add these functions
const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

const updateUserTokens = async (userId, updateData) => {
  return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

const findUserByResetToken = async (token) => {
  return await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() } // Token expired nahi hona chahiye
  });
};

module.exports = { findUserByEmail, updateUserTokens, findUserByResetToken };