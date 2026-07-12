require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');

<<<<<<< HEAD
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
=======
async function start() {
  await connectDB(env.mongoUri);

  app.listen(env.port, () => {
    console.log(`Job Journey Auth Module (backend) running on http://localhost:${env.port}`);
    console.log(`Health check: http://localhost:${env.port}/health`);
  });
}

start();
>>>>>>> 4f508ba2b3905706859ca275bcaa71bddd376a9e
