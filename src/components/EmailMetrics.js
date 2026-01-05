'use client';
import { useState, useEffect, useCallback } from 'react';

export default function EmailMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(300000); // 5 minutes default

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/emails/metrics?timeRange=${timeRange}&format=summary`);
      const result = await response.json();

      if (result.success) {
        setMetrics(result.data);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch metrics');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchMetrics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [timeRange, fetchMetrics]);

  const formatDuration = (ms) => {
    if (ms === 0) return 'N/A';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatSuccessRate = (rate) => {
    return rate ? `${rate.toFixed(1)}%` : 'N/A';
  };

  const timeRangeOptions = [
    { value: 60000, label: '1 minute' },
    { value: 300000, label: '5 minutes' },
    { value: 900000, label: '15 minutes' },
    { value: 3600000, label: '1 hour' },
  ];

  if (loading) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
            📊
          </div>
          <h3 className="ml-4 text-lg font-semibold text-card-foreground">Email Performance Metrics</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading metrics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 text-xl">
            ⚠️
          </div>
          <h3 className="ml-4 text-lg font-semibold text-card-foreground">Email Performance Metrics</h3>
        </div>
        <div className="text-red-600 dark:text-red-400 text-sm">
          Error loading metrics: {error}
        </div>
        <button
          onClick={fetchMetrics}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
            📊
          </div>
          <h3 className="ml-4 text-lg font-semibold text-card-foreground">Email Performance Metrics</h3>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(parseInt(e.target.value))}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={fetchMetrics}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            title="Refresh metrics"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Email Saves */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Email Saves</span>
            <span className="text-2xl">💾</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold">{metrics?.operations?.saves?.count || 0}</div>
            <div className="text-xs text-muted-foreground">
              Avg: {formatDuration(metrics?.operations?.saves?.avgDuration)}
            </div>
            <div className="text-xs text-muted-foreground">
              Success: {formatSuccessRate(metrics?.operations?.saves?.successRate)}
            </div>
          </div>
        </div>

        {/* Email Fetches */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Email Fetches</span>
            <span className="text-2xl">📥</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold">{metrics?.operations?.fetches?.count || 0}</div>
            <div className="text-xs text-muted-foreground">
              Avg: {formatDuration(metrics?.operations?.fetches?.avgDuration)}
            </div>
            <div className="text-xs text-muted-foreground">
              Success: {formatSuccessRate(metrics?.operations?.fetches?.successRate)}
            </div>
            {metrics?.operations?.fetches?.avgEmailsPerFetch && (
              <div className="text-xs text-muted-foreground">
                ~{metrics.operations.fetches.avgEmailsPerFetch} emails/fetch
              </div>
            )}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Feedback</span>
            <span className="text-2xl">💬</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold">{metrics?.operations?.feedback?.count || 0}</div>
            <div className="text-xs text-muted-foreground">
              Avg: {formatDuration(metrics?.operations?.feedback?.avgDuration)}
            </div>
            <div className="text-xs text-muted-foreground">
              Success: {formatSuccessRate(metrics?.operations?.feedback?.successRate)}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Errors */}
      {metrics?.errors?.recentErrors?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">⚠️ Recent Errors</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {metrics.errors.recentErrors.map((error, index) => (
              <div key={index} className="text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
                <div className="flex justify-between items-start">
                  <span className="text-red-800 dark:text-red-200 font-medium">{error.operation}</span>
                  <span className="text-red-600 dark:text-red-400 text-xs">
                    {new Date(error.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-red-700 dark:text-red-300 mt-1 truncate">{error.error}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-muted-foreground">Total Errors</div>
            <div className="font-medium text-red-600 dark:text-red-400">
              {metrics?.errors?.count || 0}
            </div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Time Range</div>
            <div className="font-medium">{metrics?.timeRange || 'N/A'}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Last Updated</div>
            <div className="font-medium">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Status</div>
            <div className="font-medium text-green-600 dark:text-green-400">
              {(metrics?.errors?.count || 0) === 0 ? '✓ Healthy' : '⚠️ Issues'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}