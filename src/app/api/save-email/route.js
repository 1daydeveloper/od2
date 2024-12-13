import connectToDatabase from '../../../../lib/mongodb'; // Ensure this helper is correct
import { Email } from '../../../../models/Email';
const { simpleParser } = require('mailparser');

// Named export for the POST method
export const POST = async (req) => {
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
    await connectToDatabase();

    const newEmail = new Email({
      ...parsedEmail,
    });

    await newEmail.save();

    return new Response(JSON.stringify({ message: 'Email saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error processing email:', error);
    return new Response(JSON.stringify({ message: 'Error saving email to database', error: error.message }), { status: 500 });
  }
};
