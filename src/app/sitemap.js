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
    // Specific Blog Post Page
    {
      url: "https://od2.in/blog/my-first-blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
