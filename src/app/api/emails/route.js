// app/api/emails/route.js
import { withDatabase } from '../../../../lib/middleware/database.js';
import { Email } from '../../../../models/Email.js';
import emailPerformanceMonitor from '../../../../lib/email-performance-monitor.js';

const handleGet = async (req) => {
  const startTime = Date.now();
  let emailCount = 0;

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit')) || 50;
    const skip = parseInt(searchParams.get('skip')) || 0;
    const since = searchParams.get('since'); // ISO timestamp for real-time updates

    let query = {};
    if (since) {
      query.createdAt = { $gt: new Date(since) };
    }

    // Use database utility for consistent connection handling
    const emails = await req.db.getEmails(query, {
      limit,
      skip,
      sort: { createdAt: -1, date: -1 }, // Sort by creation time first for real-time sync
      projection: {
        html: 0,
        text: 0,
        textAsHtml: 0,
        attachments: 0
      }
    });

    emailCount = emails.length;

    // Record performance metrics
    emailPerformanceMonitor.recordFetch(startTime, emailCount, true);

    return new Response(JSON.stringify({
      emails,
      count: emails.length,
      timestamp: new Date().toISOString(),
      hasMore: emails.length === limit,
      processingTime: Date.now() - startTime
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Processing-Time': `${Date.now() - startTime}ms`
      }
    });
  } catch (error) {
    console.error('Error fetching emails:', error);

    // Record performance metrics for failed operation
    emailPerformanceMonitor.recordFetch(startTime, emailCount, false, error);

    return new Response(JSON.stringify({
      error: 'Failed to fetch emails',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// Export GET handler wrapped with database middleware
export const GET = withDatabase(handleGet);
