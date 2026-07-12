const User = require('../models/User.model');

// --- Profile Repository ---
// Owns every direct MongoDB/Mongoose query the Profile module needs.
// The Service layer never talks to Mongoose directly — it always goes
// through here. This is what makes the Service layer testable/swappable
// (e.g. you could point this file at a different DB later without touching
// service or controller code).

async function findById(userId, { includeDeleted = false } = {}) {
  const query = { _id: userId };
  if (!includeDeleted) query.isDeleted = false;
  return User.findOne(query).select('+avatarPublicId');
}

async function findByUsername(username, { includeDeleted = false } = {}) {
  const query = { username };
  if (!includeDeleted) query.isDeleted = false;
  return User.findOne(query);
}

async function isUsernameTaken(username, excludeUserId = null) {
  const query = { username };
  if (excludeUserId) query._id = { $ne: excludeUserId };
  const existing = await User.findOne(query).select('_id');
  return !!existing;
}

async function updateById(userId, updateFields) {
  return User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  });
}

async function updateAvatar(userId, { avatarUrl, avatarPublicId }) {
  return User.findByIdAndUpdate(
    userId,
    { avatarUrl, avatarPublicId },
    { new: true, runValidators: true }
  ).select('+avatarPublicId');
}

async function softDeleteById(userId) {
  return User.findByIdAndUpdate(
    userId,
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
}

module.exports = {
  findById,
  findByUsername,
  isUsernameTaken,
  updateById,
  updateAvatar,
  softDeleteById,
};
