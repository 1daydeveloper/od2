// lib/mongodb.js
import mongoose from 'mongoose';

/**
 * Enhanced MongoDB Singleton Connection Manager
 * Ensures a single database instance across the entire application
 */
class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.connectionPromise = null;
    this.connection = null;
    
    // Bind methods to maintain context
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.getConnection = this.getConnection.bind(this);
  }

  /**
   * Get the current database connection status
   */
  getConnectionState() {
    if (!mongoose.connections[0]) return 'disconnected';
    
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    return states[mongoose.connections[0].readyState] || 'unknown';
  }

  /**
   * Connect to MongoDB with singleton pattern
   */
  async connect() {
    // Return existing connection if already connected
    if (this.isConnected && mongoose.connections[0]?.readyState === 1) {
      console.log('Using existing MongoDB connection');
      return this.connection;
    }

    // If connection is in progress, wait for it
    if (this.connectionPromise) {
      console.log('Waiting for existing connection attempt...');
      return this.connectionPromise;
    }

    // If connecting, wait for the connection
    if (mongoose.connections[0]?.readyState === 2) {
      console.log('MongoDB connection in progress...');
      return new Promise((resolve) => {
        mongoose.connections[0].once('connected', () => {
          this.isConnected = true;
          this.connection = mongoose.connections[0];
          resolve(this.connection);
        });
      });
    }

    // Create new connection
    this.connectionPromise = this._establishConnection();
    
    try {
      this.connection = await this.connectionPromise;
      this.isConnected = true;
      return this.connection;
    } catch (error) {
      this.connectionPromise = null;
      throw error;
    }
  }

  /**
   * Establish the actual MongoDB connection
   */
  async _establishConnection() {
    try {
      console.log('Establishing new MongoDB connection...');
      
      await mongoose.connect(process.env.MONGODB_URI, {
        // Optimized connection pool settings for real-time email processing
        maxPoolSize: 20, // Increase pool size for better concurrency
        minPoolSize: 5, // Maintain minimum connections for instant availability
        serverSelectionTimeoutMS: 3000, // Faster server selection for real-time
        socketTimeoutMS: 30000, // Shorter socket timeout for faster failover
        connectTimeoutMS: 5000, // Quick connection timeout
        
        // Real-time optimization settings
        maxIdleTimeMS: 15000, // Shorter idle time to keep connections fresh
        heartbeatFrequencyMS: 5000, // More frequent health checks
        bufferCommands: false, // Disable mongoose buffering for immediate operations
        
        // Write concern for immediate confirmation
        w: 'majority',
        wtimeoutMS: 5000,
        
        // Read preference for consistency
        readPreference: 'primaryPreferred',
        
        // Compression for better performance
        compressors: ['zlib'],
      });

      console.log('✅ Successfully connected to MongoDB');
      
      // Set up event handlers only once
      this._setupEventHandlers();
      
      return mongoose.connections[0];
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      this.isConnected = false;
      this.connectionPromise = null;
      throw error;
    }
  }

  /**
   * Set up MongoDB event handlers
   */
  _setupEventHandlers() {
    const connection = mongoose.connection;
    
    // Remove existing listeners to prevent duplicates
    connection.removeAllListeners('error');
    connection.removeAllListeners('disconnected');
    connection.removeAllListeners('reconnected');
    
    // Handle connection errors
    connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
      this.isConnected = false;
      this.connectionPromise = null;
    });

    // Handle disconnection
    connection.on('disconnected', () => {
      console.log('📴 MongoDB disconnected');
      this.isConnected = false;
      this.connectionPromise = null;
    });

    // Handle reconnection
    connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
      this.isConnected = true;
    });

    // Handle connection close
    connection.on('close', () => {
      console.log('🔒 MongoDB connection closed');
      this.isConnected = false;
      this.connectionPromise = null;
    });
  }

  /**
   * Get the current database connection
   */
  async getConnection() {
    if (!this.isConnected || mongoose.connections[0]?.readyState !== 1) {
      return this.connect();
    }
    return this.connection;
  }

  /**
   * Gracefully close the database connection
   */
  async disconnect() {
    try {
      if (this.isConnected && mongoose.connections[0]) {
        await mongoose.connection.close();
        this.isConnected = false;
        this.connection = null;
        this.connectionPromise = null;
        console.log('🔒 MongoDB connection closed gracefully');
      }
    } catch (error) {
      console.error('❌ Error closing MongoDB connection:', error);
      throw error;
    }
  }

  /**
   * Get database connection statistics
   */
  getStats() {
    const connection = mongoose.connections[0];
    if (!connection) {
      return { state: 'no_connection', details: null };
    }

    return {
      state: this.getConnectionState(),
      isConnected: this.isConnected,
      host: connection.host,
      name: connection.name,
      readyState: connection.readyState,
      collections: Object.keys(connection.collections),
      models: Object.keys(mongoose.models)
    };
  }
}

// Create singleton instance
const dbInstance = new DatabaseConnection();

// Legacy function for backward compatibility
const connectToDatabase = () => dbInstance.connect();

// Graceful shutdown handler
const closeDatabase = () => dbInstance.disconnect();

// Export the singleton instance and legacy functions
export default connectToDatabase;
export { 
  dbInstance as db,
  closeDatabase,
  connectToDatabase 
};

// Handle process termination gracefully
if (typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    console.log('🛑 Received SIGINT, closing database connection...');
    await dbInstance.disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('🛑 Received SIGTERM, closing database connection...');
    await dbInstance.disconnect();
    process.exit(0);
  });
}