import { getSortedPostsData } from '@main/lib/posts';

export default function sitemap() {
  const blogPosts = getSortedPostsData();
  const links = [];

  // Adding blog posts dynamically to the sitemap
  blogPosts.forEach(post => {
    links.push({
      url: `https://www.od2.in/blog/${post.id}`,
      priority: 0.8, // Increased priority for blog posts
      changeFrequency: "weekly",
      lastModified: new Date(post.date),
    });
  });

  // Return static URLs and include dynamic links
  return [
    // Homepage
    {
      url: "https://www.od2.in",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // Main Pages
    {
      url: "https://www.od2.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.od2.in/about/company",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.od2.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.od2.in/products",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.od2.in/products/od2-billing-system",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Tools & Utilities
    {
      url: "https://www.od2.in/temp-mail",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.od2.in/passport-photo-printing",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.od2.in/convert-image-to-blob",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.od2.in/url-encoder-decoder",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.od2.in/test-mail",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // API Workflow Designer
    {
      url: "https://www.od2.in/api-wd",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.od2.in/api-wd/docs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://www.od2.in/api-wd/test",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // CAPTCHA Testing Tools
    {
      url: "https://www.od2.in/captcha",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://www.od2.in/captcha/v2",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://www.od2.in/captcha/v3",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // Blog Section
    {
      url: "https://www.od2.in/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Legal Pages
    {
      url: "https://www.od2.in/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://www.od2.in/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://www.od2.in/disclaimer",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },

    // RSS Feed
    {
      url: "https://www.od2.in/feed.xml",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    // Include the dynamic links for blog posts
    ...links, // Spread the dynamically added blog posts here

    // Meta files
    {
      url: "https://www.od2.in/robots.txt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.od2.in/sitemap.xml",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://www.od2.in/ads.txt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.od2.in/indexnow.txt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },

    // Static Assets
    {
      url: "https://www.od2.in/apple-icon.png",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: "https://www.od2.in/icon.png",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];
}
