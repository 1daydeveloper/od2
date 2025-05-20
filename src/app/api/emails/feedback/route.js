// pages/api/emails.js
import { EmailFeedback, EmailHistory, Email } from "@models/Email"; // Update the path to your Email model

export const POST = async (req) => {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  try {
    let { emailId, isSpam, feedback, description, mail } = body;

    // If emailId is not provided but mail is, find the EmailHistory for that mail and use its _id
    if (mail) {
      // Find the latest email for this address
      const latestEmail = await Email.findOne({
        "to.value.address": mail,
      }).sort({ date: -1 });
      if (latestEmail) {
        // Find the EmailHistory for the given mail
        const history = await EmailHistory.findOne({ email: mail });
        if (history) {
          emailId = history._id; // Use EmailHistory's _id as emailId for feedback
        }
      }
    }

    if (!emailId || !feedback) {
      return new Response(
        JSON.stringify({ error: "emailId and feedback are required" }),
        { status: 400 }
      );
    }

    // Check if feedback already exists for this emailId and feedback type
    const existingFeedback = await EmailFeedback.findOne({ emailId, feedback });
    if (existingFeedback) {
      return new Response(
        JSON.stringify({
          message: "Feedback already submitted",
          error: "Feedback already exists",
        }),
        { status: 411 }
      );
    }

    const newFeedback = new EmailFeedback({
      emailId,
      isSpam,
      feedback,
      description,
    });
    await newFeedback.save();
    return new Response(
      JSON.stringify({ message: "Feedback saved", feedback: newFeedback }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
