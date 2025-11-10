// lib/mongodb.js
import mongoose from 'mongoose';

let isConnected = false;

const connectToDatabase = async () => {
  // If already connected, return early
  if (isConnected && mongoose.connections[0].readyState === 1) {
    return mongoose.connections[0];
  }

  // If connecting, wait for the connection
  if (mongoose.connections[0].readyState === 2) {
    return new Promise((resolve) => {
      mongoose.connections[0].once('connected', () => resolve(mongoose.connections[0]));
    });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Connection pool settings optimized for M0 cluster
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      
      // Additional optimization settings
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      heartbeatFrequencyMS: 10000, // Check server health every 10 seconds
    });

    isConnected = true;
    console.log('Connected to MongoDB');
    
    // Handle connection errors
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });

    return mongoose.connections[0];
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    isConnected = false;
    throw error;
  }
};

// Graceful shutdown
const closeDatabase = async () => {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed');
  }
};

export default connectToDatabase;
export { closeDatabase };