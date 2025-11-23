// lib/db.js
import { db } from './mongodb.js';
import { Email, EmailHistory, EmailFeedback } from '../models/Email.js';

/**
 * Database Utility Module
 * Provides a centralized interface for database operations using the singleton connection
 */
class DatabaseUtil {
  constructor() {
    this.dbInstance = db;
  }

  /**
   * Ensure database connection is established
   */
  async ensureConnection() {
    try {
      await this.dbInstance.getConnection();
      return true;
    } catch (error) {
      console.error('Failed to establish database connection:', error);
      throw error;
    }
  }

  /**
   * Get database connection statistics
   */
  getStats() {
    return this.dbInstance.getStats();
  }

  /**
   * Get database connection state
   */
  getConnectionState() {
    return this.dbInstance.getConnectionState();
  }

  /**
   * Check if database is connected
   */
  isConnected() {
    return this.dbInstance.isConnected && this.getConnectionState() === 'connected';
  }

  /**
   * Gracefully disconnect from database
   */
  async disconnect() {
    return this.dbInstance.disconnect();
  }

  // Email-related operations with real-time optimizations
  async saveEmail(emailData) {
    await this.ensureConnection();
    
    const startTime = Date.now();
    try {
      const email = new Email({
        ...emailData,
        processedAt: new Date(),
        processingStartTime: startTime
      });
      
      // Use lean() for faster saves and skip validation for performance if needed
      const result = await email.save();
      
      // Log performance metrics for monitoring
      const saveTime = Date.now() - startTime;
      if (saveTime > 1000) { // Log slow saves
        console.warn(`Slow email save detected: ${saveTime}ms for email ${result._id}`);
      }
      
      return result;
    } catch (error) {
      console.error('Error saving email:', error);
      throw new Error(`Failed to save email: ${error.message}`);
    }
  }

  async getEmails(query = {}, options = {}) {
    await this.ensureConnection();
    
    const startTime = Date.now();
    const { 
      limit = 50, 
      skip = 0, 
      sort = { createdAt: -1, date: -1 },
      projection = null // Allow custom field projection for performance
    } = options;
    
    try {
      let queryBuilder = Email.find(query)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .lean() // Always use lean for better performance
        .maxTimeMS(5000); // Set query timeout for real-time performance
      
      if (projection) {
        queryBuilder = queryBuilder.select(projection);
      }
      
      const results = await queryBuilder;
      
      // Log performance metrics
      const queryTime = Date.now() - startTime;
      if (queryTime > 2000) {
        console.warn(`Slow email query detected: ${queryTime}ms`);
      }
      
      return results;
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw new Error(`Failed to fetch emails: ${error.message}`);
    }
  }

  async getEmailById(id) {
    await this.ensureConnection();
    
    try {
      return await Email.findById(id)
        .lean()
        .maxTimeMS(3000);
    } catch (error) {
      console.error('Error fetching email by ID:', error);
      throw new Error(`Failed to fetch email: ${error.message}`);
    }
  }

  async deleteEmail(id) {
    await this.ensureConnection();
    
    try {
      return await Email.findByIdAndDelete(id)
        .maxTimeMS(3000);
    } catch (error) {
      console.error('Error deleting email:', error);
      throw new Error(`Failed to delete email: ${error.message}`);
    }
  }

  // Email History operations
  async getEmailHistory(email) {
    await this.ensureConnection();
    return EmailHistory.findOne({ email }).lean();
  }

  async updateEmailHistory(email, historyData) {
    await this.ensureConnection();
    return EmailHistory.findOneAndUpdate(
      { email },
      { $push: { history: historyData }, $inc: { count: 1 } },
      { upsert: true, new: true }
    );
  }

  // Email Feedback operations
  async saveEmailFeedback(feedbackData) {
    await this.ensureConnection();
    const feedback = new EmailFeedback(feedbackData);
    return feedback.save();
  }

  async getEmailFeedback(emailId) {
    await this.ensureConnection();
    return EmailFeedback.find({ emailId }).lean();
  }

  // Health check operations
  async healthCheck() {
    try {
      await this.ensureConnection();
      const stats = this.getStats();
      
      // Perform a simple database operation to verify connectivity
      const testQuery = await Email.countDocuments({}).maxTimeMS(5000);
      
      return {
        status: 'healthy',
        connected: true,
        stats,
        testQuery: { emailCount: testQuery },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        connected: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Transaction support
  async withTransaction(callback) {
    await this.ensureConnection();
    const session = await this.dbInstance.connection.startSession();
    
    try {
      session.startTransaction();
      const result = await callback(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

// Create singleton instance
const dbUtil = new DatabaseUtil();

export default dbUtil;
export { DatabaseUtil };