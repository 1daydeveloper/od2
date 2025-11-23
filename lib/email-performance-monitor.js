// lib/email-performance-monitor.js
/**
 * Email Performance Monitor
 * Tracks and reports real-time email processing performance
 */

class EmailPerformanceMonitor {
  constructor() {
    this.metrics = {
      saves: [],
      fetches: [],
      feedback: [],
      errors: []
    };
    this.maxHistorySize = 1000; // Keep last 1000 operations
    this.alertThresholds = {
      saveTime: 2000,    // 2 seconds
      fetchTime: 1000,   // 1 second
      feedbackTime: 1000, // 1 second
      errorRate: 0.05    // 5%
    };
    
    // Performance stats
    this.stats = {
      totalOperations: 0,
      totalErrors: 0,
      avgSaveTime: 0,
      avgFetchTime: 0,
      avgFeedbackTime: 0
    };
  }

  /**
   * Record email save operation
   */
  recordSave(startTime, success = true, error = null) {
    const duration = Date.now() - startTime;
    const record = {
      timestamp: new Date(),
      duration,
      success,
      error: error?.message,
      type: 'save'
    };
    
    this.metrics.saves.push(record);
    this.trimHistory('saves');
    
    if (!success) {
      this.recordError('save', error);
    }
    
    this.updateStats();
    this.checkAlerts(record);
    
    return record;
  }

  /**
   * Record email fetch operation
   */
  recordFetch(startTime, emailCount = 0, success = true, error = null) {
    const duration = Date.now() - startTime;
    const record = {
      timestamp: new Date(),
      duration,
      emailCount,
      success,
      error: error?.message,
      type: 'fetch'
    };
    
    this.metrics.fetches.push(record);
    this.trimHistory('fetches');
    
    if (!success) {
      this.recordError('fetch', error);
    }
    
    this.updateStats();
    this.checkAlerts(record);
    
    return record;
  }

  /**
   * Record feedback operation
   */
  recordFeedback(startTime, success = true, error = null) {
    const duration = Date.now() - startTime;
    const record = {
      timestamp: new Date(),
      duration,
      success,
      error: error?.message,
      type: 'feedback'
    };
    
    this.metrics.feedback.push(record);
    this.trimHistory('feedback');
    
    if (!success) {
      this.recordError('feedback', error);
    }
    
    this.updateStats();
    this.checkAlerts(record);
    
    return record;
  }

  /**
   * Record error
   */
  recordError(operation, error) {
    const record = {
      timestamp: new Date(),
      operation,
      error: error?.message || error,
      stack: error?.stack
    };
    
    this.metrics.errors.push(record);
    this.trimHistory('errors');
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      ...this.stats,
      currentTime: new Date().toISOString(),
      recentOperations: {
        saves: this.metrics.saves.length,
        fetches: this.metrics.fetches.length,
        feedback: this.metrics.feedback.length,
        errors: this.metrics.errors.length
      }
    };
  }

  /**
   * Get detailed metrics for a specific time range
   */
  getMetrics(timeRangeMs = 300000) { // Default: last 5 minutes
    const cutoff = new Date(Date.now() - timeRangeMs);
    
    const filterByTime = (records) => 
      records.filter(r => r.timestamp >= cutoff);
    
    const filteredMetrics = {
      saves: filterByTime(this.metrics.saves),
      fetches: filterByTime(this.metrics.fetches),
      feedback: filterByTime(this.metrics.feedback),
      errors: filterByTime(this.metrics.errors)
    };
    
    return {
      ...filteredMetrics,
      summary: this.generateSummaryFromMetrics(filteredMetrics, timeRangeMs)
    };
  }

  /**
   * Generate performance summary from filtered metrics
   */
  generateSummaryFromMetrics(filteredMetrics, timeRangeMs = 300000) {
    const avgDuration = (records) => {
      if (records.length === 0) return 0;
      return records.reduce((sum, r) => sum + r.duration, 0) / records.length;
    };
    
    const successRate = (records) => {
      if (records.length === 0) return 100;
      const successful = records.filter(r => r.success).length;
      return (successful / records.length) * 100;
    };
    
    return {
      timeRange: `${timeRangeMs / 1000} seconds`,
      operations: {
        saves: {
          count: filteredMetrics.saves.length,
          avgDuration: Math.round(avgDuration(filteredMetrics.saves)),
          successRate: Math.round(successRate(filteredMetrics.saves) * 100) / 100
        },
        fetches: {
          count: filteredMetrics.fetches.length,
          avgDuration: Math.round(avgDuration(filteredMetrics.fetches)),
          successRate: Math.round(successRate(filteredMetrics.fetches) * 100) / 100,
          avgEmailsPerFetch: filteredMetrics.fetches.length > 0 ? 
            Math.round(filteredMetrics.fetches.reduce((sum, r) => sum + (r.emailCount || 0), 0) / filteredMetrics.fetches.length) : 0
        },
        feedback: {
          count: filteredMetrics.feedback.length,
          avgDuration: Math.round(avgDuration(filteredMetrics.feedback)),
          successRate: Math.round(successRate(filteredMetrics.feedback) * 100) / 100
        }
      },
      errors: {
        count: filteredMetrics.errors.length,
        recentErrors: filteredMetrics.errors.slice(-5).map(e => ({
          timestamp: e.timestamp,
          operation: e.operation,
          error: e.error
        }))
      }
    };
  }

  /**
   * Generate performance summary (public method)
   */
  generateSummary(timeRangeMs = 300000) {
    const cutoff = new Date(Date.now() - timeRangeMs);
    
    const filterByTime = (records) => 
      records.filter(r => r.timestamp >= cutoff);
    
    const filteredMetrics = {
      saves: filterByTime(this.metrics.saves),
      fetches: filterByTime(this.metrics.fetches),
      feedback: filterByTime(this.metrics.feedback),
      errors: filterByTime(this.metrics.errors)
    };
    
    return this.generateSummaryFromMetrics(filteredMetrics, timeRangeMs);
  }

  /**
   * Check for performance alerts
   */
  checkAlerts(record) {
    const alerts = [];
    
    if (record.type === 'save' && record.duration > this.alertThresholds.saveTime) {
      alerts.push({
        type: 'slow_save',
        message: `Slow email save detected: ${record.duration}ms`,
        threshold: this.alertThresholds.saveTime,
        actual: record.duration
      });
    }
    
    if (record.type === 'fetch' && record.duration > this.alertThresholds.fetchTime) {
      alerts.push({
        type: 'slow_fetch',
        message: `Slow email fetch detected: ${record.duration}ms`,
        threshold: this.alertThresholds.fetchTime,
        actual: record.duration
      });
    }
    
    if (record.type === 'feedback' && record.duration > this.alertThresholds.feedbackTime) {
      alerts.push({
        type: 'slow_feedback',
        message: `Slow feedback operation detected: ${record.duration}ms`,
        threshold: this.alertThresholds.feedbackTime,
        actual: record.duration
      });
    }
    
    // Check error rate
    const recentErrors = this.metrics.errors.filter(
      e => Date.now() - e.timestamp.getTime() < 60000 // Last minute
    );
    const recentOps = [...this.metrics.saves, ...this.metrics.fetches, ...this.metrics.feedback]
      .filter(op => Date.now() - op.timestamp.getTime() < 60000);
    
    if (recentOps.length > 10) { // Only check if we have enough operations
      const errorRate = recentErrors.length / recentOps.length;
      if (errorRate > this.alertThresholds.errorRate) {
        alerts.push({
          type: 'high_error_rate',
          message: `High error rate detected: ${Math.round(errorRate * 100)}%`,
          threshold: this.alertThresholds.errorRate * 100,
          actual: Math.round(errorRate * 100)
        });
      }
    }
    
    // Log alerts
    alerts.forEach(alert => {
      console.warn(`[Email Performance Alert] ${alert.message}`);
    });
    
    return alerts;
  }

  /**
   * Update running statistics
   */
  updateStats() {
    const allOps = [...this.metrics.saves, ...this.metrics.fetches, ...this.metrics.feedback];
    
    this.stats.totalOperations = allOps.length;
    this.stats.totalErrors = this.metrics.errors.length;
    
    this.stats.avgSaveTime = this.calculateAvgDuration(this.metrics.saves);
    this.stats.avgFetchTime = this.calculateAvgDuration(this.metrics.fetches);
    this.stats.avgFeedbackTime = this.calculateAvgDuration(this.metrics.feedback);
  }

  /**
   * Calculate average duration for operation type
   */
  calculateAvgDuration(records) {
    if (records.length === 0) return 0;
    const successfulRecords = records.filter(r => r.success);
    if (successfulRecords.length === 0) return 0;
    
    return Math.round(
      successfulRecords.reduce((sum, r) => sum + r.duration, 0) / successfulRecords.length
    );
  }

  /**
   * Trim history to prevent memory leaks
   */
  trimHistory(type) {
    if (this.metrics[type].length > this.maxHistorySize) {
      this.metrics[type] = this.metrics[type].slice(-this.maxHistorySize);
    }
  }

  /**
   * Reset all metrics
   */
  reset() {
    this.metrics = {
      saves: [],
      fetches: [],
      feedback: [],
      errors: []
    };
    this.stats = {
      totalOperations: 0,
      totalErrors: 0,
      avgSaveTime: 0,
      avgFetchTime: 0,
      avgFeedbackTime: 0
    };
  }

  /**
   * Export metrics for external analysis
   */
  exportMetrics() {
    return {
      metrics: this.metrics,
      stats: this.stats,
      thresholds: this.alertThresholds,
      exportTime: new Date().toISOString()
    };
  }
}

// Create singleton instance
const emailPerformanceMonitor = new EmailPerformanceMonitor();

export default emailPerformanceMonitor;
export { EmailPerformanceMonitor };