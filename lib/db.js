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

  // Email-related operations
  async saveEmail(emailData) {
    await this.ensureConnection();
    const email = new Email(emailData);
    return email.save();
  }

  async getEmails(query = {}, options = {}) {
    await this.ensureConnection();
    const { limit = 50, skip = 0, sort = { date: -1 } } = options;
    return Email.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();
  }

  async getEmailById(id) {
    await this.ensureConnection();
    return Email.findById(id).lean();
  }

  async deleteEmail(id) {
    await this.ensureConnection();
    return Email.findByIdAndDelete(id);
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