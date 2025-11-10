'use client';

import { useState, useEffect } from 'react';

export default function DatabaseHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    try {
      const response = await fetch('/api/health/database');
      const data = await response.json();
      setHealth(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 dark:text-green-400';
      case 'unhealthy': return 'text-red-600 dark:text-red-400';
      case 'error': return 'text-red-700 dark:text-red-300';
      default: return 'text-muted-foreground';
    }
  };

  const getUtilizationColor = (utilization) => {
    const percent = parseInt(utilization);
    if (percent >= 90) return 'text-red-600 dark:text-red-400 bg-red-500/10';
    if (percent >= 75) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
    return 'text-green-600 dark:text-green-400 bg-green-500/10';
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">Database Health</h2>
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Database Health Monitor</h2>
        <button 
          onClick={fetchHealth}
          className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
          Error: {error}
        </div>
      )}

      {health && (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className="flex items-center space-x-3">
            <span className="font-medium text-muted-foreground">Status:</span>
            <span className={`font-semibold ${getStatusColor(health.status)}`}>
              {health.status.toUpperCase()}
            </span>
            {health.warning && (
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">⚠ {health.warning}</span>
            )}
          </div>

          {/* Database Info */}
          {health.database && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-card-foreground mb-3">Database Connection</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">State</span>
                    <span className="font-mono text-foreground bg-muted px-2 py-1 rounded text-xs">{health.database.state}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Host</span>
                    <span className="font-mono text-foreground bg-muted px-2 py-1 rounded text-xs truncate max-w-[200px]">{health.database.host || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Database</span>
                    <span className="font-mono text-foreground bg-muted px-2 py-1 rounded text-xs">{health.database.name || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-card-foreground mb-3">Connection Pool</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active</span>
                    <span className="font-mono text-foreground bg-muted px-2 py-1 rounded text-xs">{health.connections.tracked}/{health.connections.max}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Queued</span>
                    <span className="font-mono text-foreground bg-muted px-2 py-1 rounded text-xs">{health.connections.queued}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className={`font-mono font-semibold px-2 py-1 rounded text-xs ${getUtilizationColor(health.connections.utilization)}`}>
                      {health.connections.utilization}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar for Connection Usage */}
          {health.connections && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Connection Usage</span>
                <span className="text-foreground font-medium">{health.connections.tracked}/{health.connections.max}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    parseInt(health.connections.utilization) >= 90 ? 'bg-red-500' :
                    parseInt(health.connections.utilization) >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: health.connections.utilization }}
                />
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date(health.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}