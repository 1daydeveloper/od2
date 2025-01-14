const INDEXNOW_API_URL = "https://www.bing.com/indexnow";

export async function notifyBing(urls) {
  try {
    const apiKey = "aba68f18606843d0b709ec4d46ada12a"; // Replace with your actual API key.
    const host = process.env.NEXT_PUBLIC_SITE_URL || "https://od2.in"; // Replace with your site URL.

    // Prepare the request body
    const body = JSON.stringify({
      host,
      key: apiKey,
      keyLocation: `${host}/indexnow.txt`,
      urlList: urls,
    });

    // Send the POST request using fetch
    const response = await fetch(INDEXNOW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to notify Bing. Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Bing IndexNow Response:", responseData);
  } catch (error) {
    console.error("Failed to notify Bing:", error.message);
  }
}
