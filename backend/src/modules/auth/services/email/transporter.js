const nodemailer = require('nodemailer');
const env = require('../../../../config/env.config');

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
        email: env.SMTP_EMAIL,
        pass: env.SMTP_PASSWORD,
    },
});

module.exports = transporter;