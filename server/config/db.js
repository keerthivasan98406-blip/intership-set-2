const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager';
    console.log(`[DB] Attempting connection to MongoDB at ${connStr}...`);
    
    // Set connect timeout to 3 seconds so we fail fast to memory server if local MongoDB isn't running
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[DB] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[DB] Local MongoDB connection failed (${error.message}). Initializing MongoDB Memory Server...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`[DB] MongoDB Memory Server Connected Successfully: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`[DB] Memory Server Fallback Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
