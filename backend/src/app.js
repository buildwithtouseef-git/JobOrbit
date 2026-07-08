const errorMiddlware = require('./shared/middleware/error.middleware');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { authLimiter, generalLimiter } = require('./shared/middleware/security.middleware');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(
    cors({
        origin: process.env.CLIENT_URL
            ? process.env.CLIENT_URL.split(',').map((value) => value.trim()).filter(Boolean)
            : true,
        credentials: true,
    })
);

app.use(express.json({ limit: '10kb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: '10kb',
    })
);

app.use(cookieParser());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(generalLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);
app.use('/api/v1/auth/forgot-password', authLimiter);
app.use('/api/v1/auth/verify-reset-otp', authLimiter);
app.use('/api/v1/auth/reset-password', authLimiter);
app.use('/api/v1/auth/verify-otp', authLimiter);
app.use('/api/v1/auth/resend-otp', authLimiter);

/* --------- Health Check -------- */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'JobOrbit API is running successfully.'
    });
});

/* ---------- Routes ---------- */
const authRoutes = require('./modules/auth/routes/auth.routes');

app.use('/api/v1/auth', authRoutes);

/* ------- 404 Middleware -------- */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.',
        statusCode: 404,
    });
});

/* -----Global Error Middleware ----- */
app.use(errorMiddlware);

module.exports = app;