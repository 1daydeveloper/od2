import connectToDatabase from '../../../../lib/mongodb'; // Update the path to your database helper
import {Email} from '../../../../models/Email'; // Update the path to your Email model

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the ID from the query string

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  let connection = null;

  try {
    // Connect to the database with error handling
    connection = await connectToDatabase();

    // Find the email document that matches the ID (you may need to adjust based on your schema)
    const emails = await Email.find({ 'to.value.address': `${id}@tm.od2.in` })
      .sort({ date: -1 }) // Sort by date, newest first
      .limit(50) // Limit results to prevent memory issues
      .lean(); // Use lean for better performance

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
