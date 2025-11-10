import mongoose from 'mongoose';

export const GET = async (req) => {
  try {
    const dbState = mongoose.connection.readyState;
    const stateNames = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    };

    const healthData = {
      status: dbState === 1 ? 'healthy' : 'unhealthy',
      database: {
        state: stateNames[dbState],
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        readyState: dbState
      },
      connections: {
        tracked: 'monitoring disabled temporarily',
        max: 10,
        queued: 0,
        utilization: 'N/A'
      },
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(healthData, null, 2), {
      status: dbState === 1 ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Failed to check database health',
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};