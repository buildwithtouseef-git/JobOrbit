const express = require('express');

const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../../../shared/middleware/validate.middleware');

const signupSchema = require('../validations/signup.validation');
const loginSchema = require('../validations/login.validation');
const forgotPasswordSchema = require('../validations/forgot-password.validation');
const resetPasswordSchema = require('../validations/reset-password.validation');
const changePasswordSchema = require('../validations/change-password.validation');
const verifyEmailSchema = require('../validations/verify-email.validation');

const router = express.Router();

// Public routes
router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
router.post('/refresh-token', authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.patch('/change-password', authenticate, validate(changePasswordSchema), authController.changePassword);

module.exports = router;
