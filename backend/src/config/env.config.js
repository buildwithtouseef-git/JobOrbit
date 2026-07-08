require('dotenv').config();

const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const env = {
    NODE_ENV: nodeEnv,
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_SECURE: process.env.SMTP_SECURE === "true",
    SMTP_USER: process.env.SMTP_USER || process.env.SMTP_EMAIL,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM || process.env.SMTP_EMAIL,
    PASSWORD_RESET_TOKEN_EXPIRES: process.env.PASSWORD_RESET_TOKEN_EXPIRES,
    EMAIL_VERIFICATION_TOKEN_EXPIRES: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES || '1m',
    COOKIE_EXPIRES: process.env.COOKIE_EXPIRES
};

if (nodeEnv === 'production') {
    const requiredVars = ['CLIENT_URL', 'MONGODB_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'COOKIE_EXPIRES'];
    const missing = requiredVars.filter((key) => !env[key]);

    if (missing.length) {
        throw new Error(`Missing production environment variables: ${missing.join(', ')}`);
    }
}

module.exports = env;