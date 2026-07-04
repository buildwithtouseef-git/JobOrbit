const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/errorHandler.middleware');
const env = require('./config/env');

const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health check — useful for the instructor / teammates to confirm the server is up
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Job Journey Auth Module (MongoDB) is running' });
});

// All auth endpoints are mounted under /auth
app.use('/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error_code: 'NOT_FOUND',
  });
});

// Central error handler — must be last
app.use(errorHandler);

module.exports = app;
