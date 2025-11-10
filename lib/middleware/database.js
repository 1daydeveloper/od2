// lib/middleware/database.js
import dbUtil from '../db.js';

/**
 * Database middleware to ensure connection is established before processing requests
 * This ensures the singleton database instance is ready for all API routes
 */
export const ensureDatabaseConnection = async (req, res, next) => {
  try {
    // Ensure database connection using singleton
    await dbUtil.ensureConnection();
    
    // Add database utility to request object for easy access
    req.db = dbUtil;
    
    // Continue to next middleware or route handler
    if (next) next();
    return true;
  } catch (error) {
    console.error('Database middleware error:', error);
    
    const errorResponse = {
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString(),
      status: 'service_unavailable'
    };

    if (res) {
      return res.status(503).json(errorResponse);
    }
    
    throw error;
  }
};

/**
 * Next.js API route wrapper for database connection
 * Ensures database connection before executing the API handler
 */
export const withDatabase = (handler) => {
  return async (req, res) => {
    try {
      // Ensure database connection
      await dbUtil.ensureConnection();
      
      // Add database utility to request object
      req.db = dbUtil;
      
      // Execute the original handler
      return await handler(req, res);
    } catch (error) {
      console.error('Database connection error in API route:', error);
      
      return new Response(JSON.stringify({
        message: 'Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
};

/**
 * React Server Components wrapper for database operations
 * Ensures database connection in server components
 */
export const withDatabaseConnection = async (operation) => {
  try {
    await dbUtil.ensureConnection();
    return await operation(dbUtil);
  } catch (error) {
    console.error('Database operation failed:', error);
    throw new Error(`Database operation failed: ${error.message}`);
  }
};

export default ensureDatabaseConnection;