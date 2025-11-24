import { withDatabase } from '../../../../lib/middleware/database.js';
import { simpleParser } from 'mailparser';
import emailPerformanceMonitor from '../../../../lib/email-performance-monitor.js';

// Enhanced POST handler using singleton database pattern
const handlePost = async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Invalid Method.' }), { status: 405 });
  }

  const startTime = Date.now();
  
  try {
    const emailData = await req.json();

    if (!emailData?.raw) {
      return new Response(JSON.stringify({ 
        message: 'Invalid email data.',
        error: 'Missing raw email data',
        timestamp: new Date().toISOString()
      }), { status: 400 });
    }

    const options = {
      skipImageLinks: false, // Ensures embedded images are parsed correctly
      streamAttachments: false, // Disable streaming for faster parsing
      skipHtmlToText: false, // Keep HTML to text conversion
      skipTextContent: false, // Keep text content
      maxHtmlLengthToParse: 100000, // Limit HTML parsing for performance
      skipTextLinks: true // Skip text link parsing for speed
    };

    // Parse email with reduced timeout for real-time performance
    const parsePromise = simpleParser(emailData.raw, options);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email parsing timeout')), 3000) // Reduced from 5s to 3s
    );
    
    const parsedEmail = await Promise.race([parsePromise, timeoutPromise]);
    
    // Optimize email data for faster database saves
    const emailToSave = {
      messageId: parsedEmail.messageId,
      date: parsedEmail.date,
      subject: parsedEmail.subject || '',
      from: parsedEmail.from,
      to: parsedEmail.to,
      cc: parsedEmail.cc,
      bcc: parsedEmail.bcc,
      text: parsedEmail.text ? parsedEmail.text.substring(0, 50000) : '', // Limit text length
      html: parsedEmail.html ? parsedEmail.html.substring(0, 100000) : '', // Limit HTML length
      attachments: parsedEmail.attachments ? parsedEmail.attachments.slice(0, 10) : [], // Limit attachments
      headers: parsedEmail.headers,
      receivedAt: new Date(),
      processingTime: Date.now() - startTime
    };
    
    // Use database utility from request object (injected by withDatabase middleware)
    const savedEmail = await req.db.saveEmail(emailToSave);

    // Record successful operation
    emailPerformanceMonitor.recordSave(startTime, true);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Email saved successfully',
      emailId: savedEmail._id,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime,
      metadata: {
        subject: parsedEmail.subject,
        from: parsedEmail.from?.text,
        to: parsedEmail.to?.text,
        size: emailData.raw.length
      }
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Processing-Time': `${Date.now() - startTime}ms`
      }
    });
  } catch (error) {
    console.error('Error processing email:', error);
    
    const processingTime = Date.now() - startTime;
    
    // Record failed operation
    emailPerformanceMonitor.recordSave(startTime, false, error);
    
    // Return appropriate error based on error type
    if (error.message === 'Email parsing timeout') {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'Email parsing timeout - email too large or complex', 
        error: 'PARSE_TIMEOUT',
        processingTime,
        timestamp: new Date().toISOString()
      }), { 
        status: 408,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'Email data validation failed', 
        error: error.message,
        processingTime,
        timestamp: new Date().toISOString()
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'Database connection error', 
        error: 'Service temporarily unavailable',
        processingTime,
        timestamp: new Date().toISOString()
      }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generic error response
    return new Response(JSON.stringify({ 
      success: false,
      message: 'Error saving email to database', 
      error: error.message,
      processingTime,
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Export POST handler wrapped with database middleware
export const POST = withDatabase(handlePost);
