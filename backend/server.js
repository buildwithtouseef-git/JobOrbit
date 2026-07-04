const env = require('./src/shared/config/env.config');
const connectDB = require('./src/shared/config/db.config');
const logger = require('./src/logger/logger');

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {

        await connectDB();

        app.listen(PORT, () => {
            logger.info(`server is running on port ${PORT}`)
        });
    }
    catch (error) {
        console.log('Failed to start server');
        logger.error(error);
    }
};

startServer();


