const env = require('../../config/env.config');
const { parseDuration } = require('./time.util');

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
const REFRESH_TOKEN_COOKIE_PATH = '/api/v1/auth';

const getRefreshTokenCookieOptions = () => ({
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: parseDuration(env.COOKIE_EXPIRES),
    path: REFRESH_TOKEN_COOKIE_PATH,
});

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie(
        REFRESH_TOKEN_COOKIE_NAME,
        refreshToken,
        getRefreshTokenCookieOptions()
    );
};

const clearRefreshTokenCookie = (res) => {
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: REFRESH_TOKEN_COOKIE_PATH,
    });
};

const getRefreshTokenFromRequest = (req) => {
    return req.cookies?.refreshToken || null;
};

module.exports = {
    REFRESH_TOKEN_COOKIE_NAME,
    setRefreshTokenCookie,
    clearRefreshTokenCookie,
    getRefreshTokenFromRequest,
};
