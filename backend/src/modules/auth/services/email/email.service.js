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

    async sendResetPasswordEmail({ to, fullName, resetToken }) {
        const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

        const html = resetPasswordTemplate({
            fullName,
            resetUrl,
        });

        const text = `Hello ${fullName}, reset your password using this link: ${resetUrl}`;

        return this.sendEmail({
            to,
            subject: 'Reset Your JobOrbit Password',
            html,
            text,
        });
    }

    async sendVerifyEmail({ to, fullName, verificationToken }) {
        const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${verificationToken}`;

        const html = verifyEmailTemplate({
            fullName,
            verificationUrl,
        });

        const text = `Hello ${fullName}, verify your email using this link: ${verificationUrl}`;

        return this.sendEmail({
            to,
            subject: 'Verify Your JobOrbit Email',
            html,
            text,
        });
    }
}

module.exports = new EmailService();
