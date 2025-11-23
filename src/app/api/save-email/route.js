import { withDatabase } from '../../../../lib/middleware/database.js';
import { simpleParser } from 'mailparser';

// Enhanced POST handler using singleton database pattern
const handlePost = async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Invalid Method.' }), { status: 405 });
  }

  try {
    const emailData = await req.json();

    if (!emailData?.raw) {
      return new Response(JSON.stringify({ message: 'Invalid email data.' }), { status: 400 });
    }

    const options = {
      skipImageLinks: false, // Ensures embedded images are parsed correctly
    };

    const parsedEmail = await simpleParser(emailData.raw, options);
    
    // Use database utility from request object (injected by withDatabase middleware)
    const savedEmail = await req.db.saveEmail({
      ...parsedEmail,
    });

    return new Response(JSON.stringify({ 
      message: 'Email saved successfully',
      emailId: savedEmail._id,
      timestamp: new Date().toISOString()
    }), { status: 200 });
  } catch (error) {
    console.error('Error processing email:', error);
    
    // Return appropriate error based on error type
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ 
        message: 'Email data validation failed', 
        error: error.message 
      }), { status: 400 });
    }
    
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return new Response(JSON.stringify({ 
        message: 'Database connection error', 
        error: 'Service temporarily unavailable' 
      }), { status: 503 });
    }
    
    return new Response(JSON.stringify({ 
      message: 'Error saving email to database', 
      error: error.message 
    }), { status: 500 });
  }
};

// Export POST handler wrapped with database middleware
export const POST = withDatabase(handlePost);
