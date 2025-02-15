import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, scanOption } = body;

    if (!url) {
      return new Response(JSON.stringify({ message: "URL is required" }), {
        status: 400,
      });
    }

    const fetchHtml = async (url) => {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });
      return response.data;
    };

    const extractLinks = (html, baseUrl) => {
      const $ = cheerio.load(html);
      const links = [];
      $("a").each((_, element) => {
        const href = $(element).attr("href");
        if (href) {
          try {
            const absoluteLink = new URL(href, baseUrl).href;
            if (absoluteLink.startsWith("http")) {
              links.push({ href: absoluteLink, source: baseUrl });
            }
          } catch {
            // Ignore invalid URLs
          }
        }
      });
      return links;
    };

    const checkLinkStatus = async (link) => {
      try {
        const headResponse = await axios.head(link.href, {
          timeout: 5000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        });
        return {
          url: link.href,
          statusCode: headResponse.status,
          source: link.source,
          status: "Working",
        };
      } catch (error) {
        return {
          url: link.href,
          statusCode: error.response ? error.response.status : "N/A",
          source: link.source,
          status: "Broken",
        };
      }
    };

    const fetchSitemapLinks = async (sitemapUrl) => {
      try {
        const sitemapResponse = await axios.get(sitemapUrl, {
          timeout: 10000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        });
        const $ = cheerio.load(sitemapResponse.data, { xmlMode: true });
        const links = [];
        $("url > loc").each((_, element) => {
          const loc = $(element).text();
          if (loc) {
            links.push({ href: loc, source: sitemapUrl });
          }
        });
        return links;
      } catch {
        return [];
      }
    };

    let links = [];
    if (scanOption === "single") {
      const html = await fetchHtml(url);
      links = extractLinks(html, url);
    } else if (scanOption === "whole") {
      const html = await fetchHtml(url);
      links = extractLinks(html, url);
      const allLinks = new Set(links.map(link => link.href));
      const visitedLinks = new Set();
      const baseDomain = new URL(url).origin;
      while (allLinks.size > visitedLinks.size) {
        for (const linkHref of Array.from(allLinks)) {
          if (!visitedLinks.has(linkHref) && linkHref.startsWith(baseDomain)) {
            visitedLinks.add(linkHref);
            try {
              const pageHtml = await fetchHtml(linkHref);
              const pageLinks = extractLinks(pageHtml, linkHref);
              pageLinks.forEach(pageLink => allLinks.add(pageLink.href));
            } catch (error) {
              console.error(`Failed to fetch page: ${linkHref}`, error.message);
            }
          }
        }
      }
      links = Array.from(allLinks).map(href => ({ href, source: url }));
    } else if (scanOption === "sitemap") {
      const sitemapUrl = new URL("/sitemap.xml", url).href;
      links = await fetchSitemapLinks(sitemapUrl);
      if (links.length === 0) {
        // If no links found in sitemap, fallback to scanning the single page
        const html = await fetchHtml(url);
        links = extractLinks(html, url);
      }
    }

    const uniqueLinks = [
      ...new Map(links.map((link) => [link.href, link])).values(),
    ];

    const results = [];
    for (const link of uniqueLinks) {
      const result = await checkLinkStatus(link);
      results.push(result);
    }

    const workingLinks = results.filter((r) => r.status === "Working");
    const brokenLinks = results.filter((r) => r.status === "Broken");

    return new Response(
      JSON.stringify({
        workingLinks,
        brokenLinks,
        totalLinks: uniqueLinks.length,
        scannedLinks: results.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    let errorMessage = "Failed to fetch the webpage";
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = "Bad Request: The server could not understand the request.";
      } else {
        errorMessage = `Request failed with status code ${error.response.status}`;
      }
    }
    return new Response(
      JSON.stringify({
        message: errorMessage,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
