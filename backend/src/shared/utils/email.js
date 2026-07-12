const env = require('../config/env');

// MOCK EMAIL SENDER
// For demo/instructor purposes this just logs the link to the console instead
// of requiring real SMTP credentials. To send real emails, install nodemailer
// (npm install nodemailer) and replace the body of sendEmail() with an actual
// transporter.sendMail(...) call — the function signature below can stay the same.

async function sendEmail({ to, subject, text }) {
  console.log('\n================ MOCK EMAIL ================');
  console.log(`From: ${env.email.from}`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${text}`);
  console.log('==============================================\n');
  return true;
}

async function sendVerificationEmail(toEmail, rawToken) {
  const link = `${env.clientUrl}/verify-email?token=${rawToken}`;
  return sendEmail({
    to: toEmail,
    subject: 'Verify your Job Journey account',
    text: `Welcome! Please verify your email by visiting this link (valid for a limited time):\n${link}`,
  });
}

async function sendPasswordResetEmail(toEmail, rawToken) {
  const link = `${env.clientUrl}/reset-password?token=${rawToken}`;
  return sendEmail({
    to: toEmail,
    subject: 'Reset your Job Journey password',
    text: `We received a request to reset your password. Visit this link (valid for a limited time):\n${link}\nIf you did not request this, you can ignore this email.`,
  });
}

module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
