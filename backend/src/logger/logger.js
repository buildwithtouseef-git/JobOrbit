const { createLogger, format, transports, info } = require('winston');

const logger = createLogger({
    level: 'info',

    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({
            stack: true,
        }),
        format.printf(({ timestamp, level, message, stack }) => {
            if (stack) {
                return `[${timestamp}] ${level.toUpperCase()}: ${stack}`;
            }
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

module.exports = logger;