// app/api/emails/feedback/route.js
import { withDatabase } from '../../../../../lib/middleware/database.js';
import { EmailFeedback, EmailHistory, Email } from '../../../../../models/Email.js';

const handlePost = async (req) => {
  const startTime = Date.now();
  let body;
  
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ 
      error: "Invalid JSON",
      message: "Request body must be valid JSON",
      timestamp: new Date().toISOString()
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  try {
    let { emailId, isSpam, feedback, description, mail } = body;

    // If emailId is not provided but mail is, find the EmailHistory for that mail and use its _id
    if (mail) {
      // Find the latest email for this address with timeout for real-time performance
      const latestEmail = await Email.findOne({
        "to.value.address": mail,
      }).sort({ createdAt: -1, date: -1 }).maxTimeMS(3000);
      
      if (latestEmail) {
        // Find the EmailHistory for the given mail
        const history = await EmailHistory.findOne({ email: mail }).maxTimeMS(3000);
        if (history) {
          emailId = history._id; // Use EmailHistory's _id as emailId for feedback
        }
      }
    }

    if (!emailId || !feedback) {
      return new Response(JSON.stringify({ 
        error: "emailId and feedback are required",
        message: "Missing required fields",
        timestamp: new Date().toISOString()
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if feedback already exists for this emailId and feedback type
    const existingFeedback = await EmailFeedback.findOne({ emailId, feedback }).maxTimeMS(3000);
    if (existingFeedback) {
      return new Response(JSON.stringify({
        success: false,
        message: "Feedback already submitted",
        error: "Duplicate feedback not allowed",
        existingFeedback: existingFeedback._id,
        timestamp: new Date().toISOString()
      }), { 
        status: 409,  // Changed from 411 to proper 409 Conflict
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newFeedback = new EmailFeedback({
      emailId,
      isSpam,
      feedback,
      description,
      submittedAt: new Date()
    });
    
    await newFeedback.save();
    
    return new Response(JSON.stringify({ 
      success: true,
      message: "Feedback saved successfully", 
      feedback: newFeedback,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    }), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'X-Processing-Time': `${Date.now() - startTime}ms`
      }
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "Failed to save feedback",
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Export POST handler wrapped with database middleware
export const POST = withDatabase(handlePost);
