// pages/api/notifyBing.js
import { notifyBing } from '@main/lib/indexnow';

// src/app/api/notifyBing/route.js


export async function POST(request) {
  try {
    // Parse the incoming request body
    const { urls } = await request.json();

    // Call the function to notify Bing with the provided URLs
    await notifyBing(urls);

    // Return a success response
    return new Response(JSON.stringify({ message: 'Bing notified successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle errors and return a failure response
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
