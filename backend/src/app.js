const errorMiddlware = require('./shared/middleware/error.middleware');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(compression());

app.use(morgan('dev'));

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