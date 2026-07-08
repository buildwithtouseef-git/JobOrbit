const transporter = require('./transporter');
const env = require('../../../../config/env.config');
const resetPasswordTemplate = require('./reset-password.template');
const verifyEmailTemplate = require('./verify-email.template');

class EmailService {
    async sendEmail({ to, subject, html, text }) {
        return transporter.sendMail({
            from: env.EMAIL_FROM,
            to,
            subject,
            html,
            text,
        });
    }

    async sendResetPasswordEmail({ to, fullName, otp }) {
        const html = resetPasswordTemplate({
            fullName,
            otp,
        });

        const text = `Hello ${fullName}, reset your password using this OTP code: ${otp}`;

        return this.sendEmail({
            to,
            subject: 'Reset Your JobOrbit Password',
            html,
            text,
        });
    }

    async sendVerifyEmail({ to, fullName, otp }) {
        const html = verifyEmailTemplate({
            fullName,
            otp,
        });

        const text = `Hello ${fullName}, verify your email using this OTP code: ${otp}`;

        return this.sendEmail({
            to,
            subject: 'Verify Your JobOrbit Email',
            html,
            text,
        });
    }
}

module.exports = new EmailService();
