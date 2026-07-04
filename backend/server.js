require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');

async function start() {
  await connectDB(env.mongoUri);

  app.listen(env.port, () => {
    console.log(`Job Journey Auth Module (backend) running on http://localhost:${env.port}`);
    console.log(`Health check: http://localhost:${env.port}/health`);
  });
}

start();
