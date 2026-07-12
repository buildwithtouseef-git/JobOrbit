const { body, param } = require('express-validator');
const userRepository = require('../repositories/user.repository');
const { USERNAME_REGEX, MIN_LENGTH, MAX_LENGTH } = require('../utils/username');

// --- Update Profile validation (PATCH /api/users/me) ---
const updateProfileRules = [
  body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),

  body('phone').optional().trim(),

  // Bio validation
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Bio cannot be longer than 300 characters'),

  // Username uniqueness check (async, hits the repository directly — validators
  // are allowed to read data, they just never write it)
  body('username')
    .optional()
    .trim()
    .toLowerCase()
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`Username must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`)
    .matches(USERNAME_REGEX)
    .withMessage('Username can only contain lowercase letters, numbers, and hyphens')
    .bail()
    .custom(async (username, { req }) => {
      const taken = await userRepository.isUsernameTaken(username, req.user.user_id);
      if (taken) {
        throw new Error('That username is already taken');
      }
      return true;
    }),

  body('isPublicProfile')
    .optional()
    .isBoolean()
    .withMessage('isPublicProfile must be true or false'),
];

// --- Get Profile / Public Profile validation (GET /api/users/:username) ---
const usernameParamRules = [
  param('username').trim().toLowerCase().notEmpty().withMessage('Username is required'),
];

module.exports = {
  updateProfileRules,
  usernameParamRules,
};
