// pages/api/emails.js
import dbConnect from '../../../../lib/mongodb';
import Email from '../../../../models/Email';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      const emails = await Email.find().sort({ date: -1 }); // Sort emails by date in descending order
      res.status(200).json(emails);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch emails' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
