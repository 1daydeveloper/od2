// app/api/emails/route.js
import connectToDatabase from '../../../../lib/mongodb';
import {Email} from '../../../../models/Email';

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const emails = await Email.find().sort({ date: -1 }).limit(50).lean(); // Sort emails by date in descending order, limit results
    
    return new Response(JSON.stringify(emails), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch emails' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
