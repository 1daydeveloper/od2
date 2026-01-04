// lib/realtime-email-client.js
/**
 * Real-time Email Client Utility
 * Provides optimized methods for real-time email operations
 */

const API_BASE = '/api';
const ENDPOINTS = {
  emails: `${API_BASE}/emails`,
  saveEmail: `${API_BASE}/save-email`,
  feedback: `${API_BASE}/emails/feedback`,
};

class RealTimeEmailClient {
  constructor(options = {}) {
    this.baseURL = options.baseURL || '';
    this.timeout = options.timeout || 5000;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
    
    // Cache for reducing API calls
    this.cache = new Map();
    this.cacheTimeout = options.cacheTimeout || 30000; // 30 seconds
  }

  /**
   * Save email with real-time optimization
   */
  async saveEmail(emailData, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(`${this.baseURL}${ENDPOINTS.saveEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': this.generateRequestId(),
          ...options.headers
        },
        body: JSON.stringify(emailData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Ignore JSON parse error, use default message
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Clear relevant cache entries
      this.invalidateEmailsCache();
      
      return {
        success: true,
        data: result,
        processingTime: response.headers.get('X-Processing-Time'),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Email save operation timed out');
      }
      
      // Retry logic for network errors
      if (this.shouldRetry(error) && (options.retryCount || 0) < this.retryAttempts) {
        await this.delay(this.retryDelay);
        return this.saveEmail(emailData, {
          ...options,
          retryCount: (options.retryCount || 0) + 1
        });
      }
      
      throw error;
    }
  }

  /**
   * Get emails with caching and real-time updates
   */
  async getEmails(params = {}, options = {}) {
    const cacheKey = this.generateCacheKey('emails', params);
    
    // Check cache first (unless force refresh)
    if (!options.forceRefresh && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return {
          success: true,
          data: cached.data,
          cached: true,
          timestamp: cached.timestamp
        };
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}${ENDPOINTS.emails}${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Request-ID': this.generateRequestId(),
          ...options.headers
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // Ignore JSON parse error, use default message
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      return {
        success: true,
        data: result,
        cached: false,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Email fetch operation timed out');
      }
      
      // Retry logic for network errors
      if (this.shouldRetry(error) && (options.retryCount || 0) < this.retryAttempts) {
        await this.delay(this.retryDelay);
        return this.getEmails(params, {
          ...options,
          retryCount: (options.retryCount || 0) + 1
        });
      }
      
      throw error;
    }
  }

  /**
   * Submit email feedback
   */
  async submitFeedback(feedbackData, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(`${this.baseURL}${ENDPOINTS.feedback}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': this.generateRequestId(),
          ...options.headers
        },
        body: JSON.stringify(feedbackData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        data: result,
        processingTime: response.headers.get('X-Processing-Time'),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Feedback submission timed out');
      }
      
      throw error;
    }
  }

  /**
   * Get real-time email updates (polling-based)
   */
  async getEmailUpdates(since, options = {}) {
    const params = { since, limit: options.limit || 10 };
    
    try {
      const result = await this.getEmails(params, { forceRefresh: true });
      
      if (result.success && result.data.emails && result.data.emails.length > 0) {
        return {
          success: true,
          newEmails: result.data.emails,
          count: result.data.emails.length,
          hasMore: result.data.hasMore,
          timestamp: result.timestamp
        };
      }
      
      return {
        success: true,
        newEmails: [],
        count: 0,
        hasMore: false,
        timestamp: result.timestamp
      };
    } catch (error) {
      throw new Error(`Failed to get email updates: ${error.message}`);
    }
  }

  /**
   * Utility methods
   */
  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateCacheKey(endpoint, params) {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  shouldRetry(error) {
    return (
      error.name === 'TypeError' || // Network error
      error.message.includes('fetch') ||
      error.message.includes('timeout')
    );
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  invalidateEmailsCache() {
    // Remove all email-related cache entries
    for (const key of this.cache.keys()) {
      if (key.startsWith('emails_')) {
        this.cache.delete(key);
      }
    }
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

// Create default instance
const realtimeEmailClient = new RealTimeEmailClient();

export default realtimeEmailClient;
export { RealTimeEmailClient };