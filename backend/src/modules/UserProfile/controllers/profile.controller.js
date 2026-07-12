const profileService = require('../services/profile.service');
const { success } = require('../utils/response');

// --- Profile Controller ---
// Thin by design: parse the request, call the Service, format the response.
// No business logic and no direct DB access lives here — see profile.service.js
// and repositories/user.repository.js for those.

async function getMyProfile(req, res, next) {
  try {
    const profile = await profileService.getMyProfile(req.user.user_id);
    return success(res, 200, 'Profile fetched', profile);
  } catch (err) {
    next(err);
  }
}

async function updateMyProfile(req, res, next) {
  try {
    const profile = await profileService.updateMyProfile(req.user.user_id, req.body);
    return success(res, 200, 'Profile updated successfully', profile);
  } catch (err) {
    next(err);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    const profile = await profileService.updateMyAvatar(req.user.user_id, req.file);
    return success(res, 200, 'Avatar updated successfully', profile);
  } catch (err) {
    next(err);
  }
}

async function deleteMyAccount(req, res, next) {
  try {
    const result = await profileService.deleteMyAccount(req.user.user_id);
    return success(res, 200, 'Account deleted successfully', result);
  } catch (err) {
    next(err);
  }
}

async function getPublicProfile(req, res, next) {
  try {
    const requestingUserId = req.user ? req.user.user_id : null;
    const profile = await profileService.getPublicProfile(req.params.username, requestingUserId);
    return success(res, 200, 'Public profile fetched', profile);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  deleteMyAccount,
  getPublicProfile,
};
