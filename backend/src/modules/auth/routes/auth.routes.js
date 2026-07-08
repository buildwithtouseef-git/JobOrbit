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
const resendVerificationSchema = require('../validations/resend-verification.validation');
const verifyResetOtpSchema = require('../validations/verify-reset-otp.validation');

const router = express.Router();

// Public routes
router.post('/register', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/verify-reset-otp', validate(verifyResetOtpSchema), authController.verifyResetOTP);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.post('/verify-otp', validate(verifyEmailSchema), authController.verifyEmail);
router.post('/resend-otp', validate(resendVerificationSchema), authController.resendVerification);
router.post('/refresh-token', authController.refreshToken);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/logout', authenticate, authController.logout);
router.patch('/change-password', authenticate, validate(changePasswordSchema), authController.changePassword);

module.exports = router;
