import connectToDatabase from '../../../../lib/mongodb'; // Ensure this helper is correct
import { Email } from '../../../../models/Email';
import { simpleParser } from 'mailparser';

// Named export for the POST method
export const POST = async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Invalid Method.' }), { status: 405 });
  }

  let connection = null;
  
  try {
    const emailData = await req.json();

    if (!emailData?.raw) {
      return new Response(JSON.stringify({ message: 'Invalid email data.' }), { status: 400 });
    }

    const options = {
      skipImageLinks: false, // Ensures embedded images are parsed correctly
    };

    const parsedEmail = await simpleParser(emailData.raw, options);
    
    // Connect to database with error handling
    connection = await connectToDatabase();

    const newEmail = new Email({
      ...parsedEmail,
    });

    await newEmail.save();

    return new Response(JSON.stringify({ message: 'Email saved successfully' }), { status: 200 });
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
