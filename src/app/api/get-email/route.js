import dbUtil from '../../../../lib/db.js'; // Updated to use singleton database utility

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the ID from the query string

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  try {
    // Use the singleton database utility - no need to manage connections manually
    const emails = await dbUtil.getEmails(
      { 'to.value.address': `${id}@tm.od2.in` },
      { limit: 50, sort: { date: -1 } }
    );

    // Always return an array, even if empty
    return new Response(JSON.stringify(emails || []), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
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
