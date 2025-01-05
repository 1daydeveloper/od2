export default function sitemap() {
  return [
    {
      url: "https://od2.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://od2.in/tmail",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://od2.in/photo",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://od2.in/products",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://od2.in/products/od2bs",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://od2.in/about",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Blog Index Page
    {
      url: "https://od2.in/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Specific Blog Post Pages
    {
      url: "https://od2.in/blog/add-metadata-dynamic-nextjs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://od2.in/blog/od2-blog-submission-guidelines",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://od2.in/blog/odd-first-blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://od2.in/blog/understanding-cross-origin-resource-sharing-cors-web-security",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Static Assets
    {
      url: "https://od2.in/apple-icon.png",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://od2.in/icon.png",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    // Sitemap and robots.txt
    {
      url: "https://od2.in/robots.txt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://od2.in/sitemap.xml",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
