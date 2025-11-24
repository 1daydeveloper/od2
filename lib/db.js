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
      
      // Save email first without blocking operations
      const result = await email.save();
      
      // Update email history asynchronously (non-blocking)
      if (emailData.to && emailData.to.text) {
        const emailAddress = emailData.to.text.includes('<') 
          ? emailData.to.text.match(/<([^>]+)>/)?.[1] 
          : emailData.to.text;
        
        if (emailAddress) {
          this.updateEmailHistoryAsync(emailAddress, {
            receivedAt: new Date(),
            subject: emailData.subject,
            from: emailData.from?.text,
            size: emailData.text?.length || 0
          });
        }
      }
      
      // Log performance metrics for monitoring
      const saveTime = Date.now() - startTime;
      if (saveTime > 500) { // Log saves over 500ms (reduced from 1000ms)
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

  /**
   * Async email history update - doesn't block email saves
   * Updates email history in background with timeout and error handling
   */
  updateEmailHistoryAsync(email, historyData) {
    // Return immediately, don't await - this runs in background
    Promise.race([
      this.updateEmailHistory(email, historyData),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('History update timeout')), 2000)
      )
    ])
    .then(() => {
      console.log(`History updated for email: ${email}`);
    })
    .catch(error => {
      console.warn(`Failed to update email history for ${email}:`, error.message);
      // Don't throw - this is background operation
    });
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