import connectToDatabase from '../../../../lib/mongodb';
import { Email } from '../../../../models/Email';
import { simpleParser } from 'mailparser';

// Batch processing for better performance
let emailBatch = [];
let batchTimeout = null;
const BATCH_SIZE = 10;
const BATCH_TIMEOUT = 5000; // 5 seconds

const processBatch = async () => {
  if (emailBatch.length === 0) return;
  
  const currentBatch = [...emailBatch];
  emailBatch = [];
  
  try {
    await connectToDatabase();
    await Email.insertMany(currentBatch, { ordered: false });
    console.log(`Batch processed: ${currentBatch.length} emails saved`);
  } catch (error) {
    console.error('Batch processing error:', error);
    // Re-add failed emails to batch for retry (simple retry mechanism)
    if (emailBatch.length < BATCH_SIZE * 2) {
      emailBatch.push(...currentBatch);
    }
  }
};

const scheduleProcessBatch = () => {
  if (batchTimeout) clearTimeout(batchTimeout);
  batchTimeout = setTimeout(processBatch, BATCH_TIMEOUT);
};

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
      skipImageLinks: true, // Skip image processing for better performance
      skipTextContent: false,
      skipHtmlToText: false,
    };

    const parsedEmail = await simpleParser(emailData.raw, options);
    
    // Add to batch instead of immediate save
    emailBatch.push({
      ...parsedEmail,
      createdAt: new Date()
    });

    // Process batch if it reaches the size limit
    if (emailBatch.length >= BATCH_SIZE) {
      await processBatch();
    } else {
      scheduleProcessBatch();
    }

    return new Response(JSON.stringify({ 
      message: 'Email queued for processing successfully',
      batchSize: emailBatch.length 
    }), { 
      status: 202, // Accepted
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing email:', error);
    
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ 
        message: 'Email data validation failed', 
        error: error.message 
      }), { status: 400 });
    }
    
    return new Response(JSON.stringify({ 
      message: 'Error processing email', 
      error: error.message 
    }), { status: 500 });
  }
};

// Graceful shutdown handler
process.on('SIGINT', async () => {
  console.log('Shutting down, processing remaining batch...');
  await processBatch();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down, processing remaining batch...');
  await processBatch();
  process.exit(0);
});