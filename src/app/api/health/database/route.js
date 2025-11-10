import dbUtil from '../../../../../lib/db.js';

export const GET = async (req) => {
  try {
    // Use the singleton database utility for health check
    const health = await dbUtil.healthCheck();
    const stats = dbUtil.getStats();
    
    // Enhanced health data using singleton pattern
    const healthData = {
      status: health.status,
      connected: health.connected,
      database: {
        state: stats.state,
        host: stats.details?.host || 'unknown',
        name: stats.details?.name || 'unknown',
        readyState: stats.readyState,
        collections: stats.collections || [],
        models: stats.models || []
      },
      singleton: {
        instance: 'DatabaseConnection',
        isConnected: dbUtil.isConnected(),
        connectionState: dbUtil.getConnectionState()
      },
      performance: health.testQuery || {},
      timestamp: health.timestamp,
      note: 'Using singleton database connection pattern for optimal performance'
    };

    // Add any errors from health check
    if (health.error) {
      healthData.error = health.error;
    }

    const status = health.status === 'healthy' ? 200 : 503;

    return new Response(JSON.stringify(healthData, null, 2), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Failed to check database health',
      error: error.message,
      singleton: {
        isConnected: dbUtil.isConnected(),
        connectionState: dbUtil.getConnectionState()
      },
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};