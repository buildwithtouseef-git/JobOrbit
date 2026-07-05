const mongoose = require('mongoose');
const logger = require('../logger/logger');
const env = require('./env.config');
const {log} = require('winston');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(env.MONGODB_URL);

        logger.info('MongoDB Connected Successfully');
        logger.info(`Database: ${connection.connection.name}`);
        logger.info(`Host: ${connection.connection.host}`);
    }

     catch (error) {
        logger.error('MongoDB Connection Failed');
        logger.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
