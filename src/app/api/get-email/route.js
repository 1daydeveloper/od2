import connectToDatabase from '../../../../lib/mongodb'; // Update the path to your database helper
import Email from '../../../../models/Email'; // Update the path to your Email model

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the ID from the query string

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the email document that matches the ID (you may need to adjust based on your schema)
    const emails = await Email.find({ 'to.value.address': `${id}@tm.od2.in` });
    if (!emails) {
      return new Response(
        JSON.stringify({ message: `No email found for the ID: ${id}` }),
        { status: 404 }
      );
    }

    // Return the email data
    return new Response(JSON.stringify(emails));
  } catch (error) {
    console.error('Error fetching email:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching email from database' }),
      { status: 500 }
    );
  }
};
