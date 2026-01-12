import dbUtil from '../../../../lib/db.js'; // Updated to use singleton database utility
import { validateEmailNotReserved } from '../../../../lib/email-validation.js';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the ID from the query string
  const emailId = searchParams.get('emailId'); // Get specific email ID if requested

  // If fetching specific email by ID (full content)
  if (emailId) {
    try {
      const email = await dbUtil.getEmailById(emailId);
      if (!email) {
        return new Response(JSON.stringify({ message: 'Email not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(email), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // Full emails can be cached longer
        }
      });
    } catch (error) {
      console.error('Error fetching specific email:', error);
      return new Response(JSON.stringify({ message: 'Error fetching email' }), { status: 500 });
    }
  }

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  // Validate that the email local-part is not reserved
  const fullEmail = `${id}@tm.od2.in`;
  const validation = validateEmailNotReserved(fullEmail);
  if (!validation.valid) {
    return new Response(JSON.stringify({
      error: validation.error,
      timestamp: new Date().toISOString()
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    // Use the singleton database utility - no need to manage connections manually
    // Projection to exclude heavy fields for the list view
    const projection = {
      html: 0,
      text: 0,
      textAsHtml: 0,
      attachments: 0
    };

    const emails = await dbUtil.getEmails(
      { 'to.value.address': `${id}@tm.od2.in` },
      { limit: 50, sort: { date: -1 }, projection }
    );
    // Always return an array, even if empty
    return new Response(JSON.stringify(emails || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=10' // Reduced cache for polling consistency
      }
    });
  } catch (error) {
    console.error('Error fetching email:', error);

    // Check if it's a database connection issue
    if (!dbUtil.isConnected()) {
      return new Response(
        JSON.stringify({ message: 'Database connection error', error: 'Service temporarily unavailable' }),
        { status: 503 }
      );
    }

    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return new Response(
        JSON.stringify({ message: 'Database connection error', error: 'Service temporarily unavailable' }),
        { status: 503 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Error fetching email from database', error: error.message }),
      { status: 500 }
    );
  }
};
