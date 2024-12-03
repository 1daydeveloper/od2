import connectToDatabase from '../../../../lib/mongodb'; // Ensure this helper is correct
import {Email} from '../../../../models/Email';

// Named export for the POST method
export const POST = async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Invalid Method.' }), { status: 405 });
  }

  try {
    // Log request body for debugging
    const emailData = await req.json();

    // Connect to the database
    await connectToDatabase();

    // Create a new email document and save it to the database
    const newEmail = new Email({
      ...emailData,
    });

    // Log the email object being saved

    await newEmail.save();
    return new Response(JSON.stringify({ message: 'Email saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error saving email:', error);
    return new Response(JSON.stringify({ message: 'Error saving email to database' }), { status: 500 });
  }
};
