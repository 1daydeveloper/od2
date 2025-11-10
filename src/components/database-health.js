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
      case 'healthy': return 'text-green-600';
      case 'unhealthy': return 'text-red-600';
      case 'error': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const getUtilizationColor = (utilization) => {
    const percent = parseInt(utilization);
    if (percent >= 90) return 'text-red-600';
    if (percent >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Database Health</h2>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Database Health Monitor</h2>
        <button 
          onClick={fetchHealth}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          Error: {error}
        </div>
      )}

      {health && (
        <div className="space-y-4">
          {/* Overall Status */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <span className={`font-semibold ${getStatusColor(health.status)}`}>
              {health.status.toUpperCase()}
            </span>
            {health.warning && (
              <span className="text-yellow-600 text-sm">⚠ {health.warning}</span>
            )}
          </div>

          {/* Database Info */}
          {health.database && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Database</h3>
                <div className="space-y-1 text-sm">
                  <div>State: <span className="font-mono">{health.database.state}</span></div>
                  <div>Host: <span className="font-mono">{health.database.host || 'N/A'}</span></div>
                  <div>Database: <span className="font-mono">{health.database.name || 'N/A'}</span></div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Connections</h3>
                <div className="space-y-1 text-sm">
                  <div>Active: <span className="font-mono">{health.connections.tracked}/{health.connections.max}</span></div>
                  <div>Queued: <span className="font-mono">{health.connections.queued}</span></div>
                  <div className={`${getUtilizationColor(health.connections.utilization)}`}>
                    Utilization: <span className="font-mono font-semibold">{health.connections.utilization}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar for Connection Usage */}
          {health.connections && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Connection Usage</span>
                <span>{health.connections.tracked}/{health.connections.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    parseInt(health.connections.utilization) >= 90 ? 'bg-red-500' :
                    parseInt(health.connections.utilization) >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: health.connections.utilization }}
                />
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-gray-500 mt-4">
            Last updated: {new Date(health.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}