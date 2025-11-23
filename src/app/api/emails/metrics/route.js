// app/api/emails/metrics/route.js
import emailPerformanceMonitor from '../../../../../lib/email-performance-monitor.js';

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const timeRange = parseInt(searchParams.get('timeRange')) || 300000; // Default: 5 minutes
    const format = searchParams.get('format') || 'summary'; // 'summary' or 'detailed'
    
    let data;
    if (format === 'detailed') {
      data = emailPerformanceMonitor.getMetrics(timeRange);
    } else {
      data = emailPerformanceMonitor.generateSummary(timeRange);
    }
    
    return new Response(JSON.stringify({
      success: true,
      data,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error fetching email metrics:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch metrics',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};