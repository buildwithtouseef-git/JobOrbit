const mongoose = require('mongoose');

// Connects to MongoDB using the URI from environment variables.
// Called once when the server starts (see server.js).
async function connectDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
