require('dotenv').config();

const connectDB = require('./src/config/db.config');
const logger = require('./src/logger/logger');
const env = require('./src/config/env.config');
const app = require('./src/app');

const PORT = env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`JobOrbit server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger.error('Failed to start server');
        logger.error(error);
        process.exit(1);
    }
};

startServer();
