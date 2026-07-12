const userRepository = require('../repositories/user.repository');
const { saveAvatar, deleteAvatar } = require('../utils/avatarStorage');
const AppError = require('../utils/appError');

// --- Profile Service ---
// All business rules for the User Profile Module live here. Controllers stay
// thin (parse request -> call service -> format response); Repositories stay
// dumb (just DB queries). This is the layer that decides *what's allowed*.

function toPublicJSON(user) {
  return {
    userId: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    isPublicProfile: user.isPublicProfile,
    status: user.status,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

// Fields visible to someone who is NOT the profile owner (no email/phone/role/status).
function toPublicViewJSON(user) {
  return {
    userId: user._id,
    username: user.username,
    fullName: user.fullName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    // Placeholder for the Application (Job Journey) Module — once that module
    // exists, populate this with that user's public Applications here.
    applications: [],
  };
}

// GET /api/users/me
async function getMyProfile(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }
  return toPublicJSON(user);
}

// PATCH /api/users/me
async function updateMyProfile(userId, data) {
  const { fullName, phone, bio, username, isPublicProfile } = data;

  const updateFields = {};
  if (fullName !== undefined) updateFields.fullName = fullName;
  if (phone !== undefined) updateFields.phone = phone;
  if (bio !== undefined) updateFields.bio = bio;
  if (isPublicProfile !== undefined) updateFields.isPublicProfile = isPublicProfile;

  if (username !== undefined) {
    const taken = await userRepository.isUsernameTaken(username, userId);
    if (taken) {
      throw new AppError('That username is already taken', 409, 'USERNAME_TAKEN');
    }
    updateFields.username = username;
  }

  const updated = await userRepository.updateById(userId, updateFields);
  if (!updated) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }
  return toPublicJSON(updated);
}

// POST /api/users/me/avatar
async function updateMyAvatar(userId, file) {
  const currentUser = await userRepository.findById(userId);
  if (!currentUser) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }

  const { url, publicId } = await saveAvatar(file);

  // Clean up the old avatar (if any) after the new one is safely saved.
  if (currentUser.avatarPublicId) {
    await deleteAvatar(currentUser.avatarPublicId);
  }

  const updated = await userRepository.updateAvatar(userId, {
    avatarUrl: url,
    avatarPublicId: publicId,
  });
  return toPublicJSON(updated);
}

// DELETE /api/users/me  (soft delete)
async function deleteMyAccount(userId) {
  const user = await userRepository.softDeleteById(userId);
  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }
  return { userId: user._id, deletedAt: user.deletedAt };
}

// GET /api/users/:username
// `requestingUserId` is set if the caller is logged in (from optionalAuth) — used
// so an owner can still view their own private profile via the public route.
async function getPublicProfile(username, requestingUserId) {
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new AppError('No profile found for this username', 404, 'PROFILE_NOT_FOUND');
  }

  const isOwner = requestingUserId && requestingUserId === user._id.toString();

  if (!user.isPublicProfile && !isOwner) {
    throw new AppError('This profile is private', 403, 'PROFILE_PRIVATE');
  }

  return toPublicViewJSON(user);
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  updateMyAvatar,
  deleteMyAccount,
  getPublicProfile,
  toPublicJSON,
};
