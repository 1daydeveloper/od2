import { getSortedPostsData } from "@main/lib/posts";

const SITE_URL = "https://www.od2.in";

export async function GET() {
    const allPosts = getSortedPostsData();

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>One Day Developers Blog</title>
    <link>${SITE_URL}</link>
    <description>Latest updates, tutorials, and insights from One Day Developers.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${allPosts
            .map((post) => {
                return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${SITE_URL}/blog/${post.id}</link>
        <guid isPermaLink="true">${SITE_URL}/blog/${post.id}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.description || ""}]]></description>
        <author>contact@od2.in (${post.author})</author>
        <category><![CDATA[${post.category}]]></category>
      </item>`;
            })
            .join("")}
  </channel>
</rss>`;

    return new Response(rssXml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
