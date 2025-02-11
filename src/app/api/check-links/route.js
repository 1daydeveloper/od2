import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return new Response(JSON.stringify({ message: "URL is required" }), {
        status: 400,
      });
    }

    // Fetch the HTML content of the provided URL
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const html = response.data;

    // Parse HTML with Cheerio and extract all links
    const $ = cheerio.load(html);
    const links = [];
    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href) {
        try {
          // Resolve relative URLs to absolute ones
          const absoluteLink = new URL(href, url).href;
          if (absoluteLink.startsWith("http")) {
            links.push({ href: absoluteLink, source: url });
          }
        } catch {
          // Ignore invalid URLs
        }
      }
    });

    // Filter unique links by their href
    const uniqueLinks = [
      ...new Map(links.map((link) => [link.href, link])).values(),
    ];

    // Check the status of each link
    const results = [];
    for (const link of uniqueLinks) {
      try {
        const headResponse = await axios.head(link.href, {
          timeout: 5000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        });
        results.push({
          url: link.href,
          statusCode: headResponse.status,
          source: link.source,
          status: "Working",
        });
      } catch (error) {
        results.push({
          url: link.href,
          statusCode: error.response ? error.response.status : "N/A",
          source: link.source,
          status: "Broken",
        });
      }
    }

    // Separate working and broken links for better readability
    const workingLinks = results.filter((r) => r.status === "Working");
    const brokenLinks = results.filter((r) => r.status === "Broken");

    // Return results
    return new Response(JSON.stringify({ workingLinks, brokenLinks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch the webpage",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
