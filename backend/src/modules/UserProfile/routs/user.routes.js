const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile.controller');
const { authenticate } = require('../middleware/auth.middleware');
const optionalAuthenticate = require('../middleware/optionalAuth.middleware');
const handleAvatarUpload = require('../middleware/upload.middleware');
const validate = require('../middleware/validate.middleware');
const v = require('../validators/profile.validator');

// ---------- Manage user profile information ----------
router.get('/me', authenticate, profileController.getMyProfile);
router.patch('/me', authenticate, v.updateProfileRules, validate, profileController.updateMyProfile);

// ---------- Manage avatar and account actions ----------
router.post('/me/avatar', authenticate, handleAvatarUpload, profileController.uploadAvatar);
router.delete('/me', authenticate, profileController.deleteMyAccount);

// ---------- Public Profile API ----------
// IMPORTANT: must be registered AFTER '/me' routes above, otherwise Express
// would match "me" as a :username value for GET requests.
router.get(
  '/:username',
  optionalAuthenticate,
  v.usernameParamRules,
  validate,
  profileController.getPublicProfile
);

module.exports = router;
