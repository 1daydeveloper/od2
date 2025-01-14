import { getSortedPostsData } from '@main/lib/posts';

export default function sitemap() {
  const blogPosts =  getSortedPostsData();
  const links = [];

  // Adding blog posts dynamically to the sitemap
  blogPosts.forEach(post => {
    links.push({
      url: `https://od2.in/blog/${post.id}`,
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: new Date(post.date),
    });
  });

  // Return static URLs and include dynamic links
  return [
    {
      url: "https://od2.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://od2.in/temp-mail",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://od2.in/photo",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://od2.in/itbc",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://od2.in/products",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://od2.in/products/od2bs",
      lastModified: new Date(),
      changeFrequency: "weekly",
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
      changeFrequency: "daily",
      priority: 0.8,
    },
    // Include the dynamic links for blog posts
    ...links, // Spread the dynamically added blog posts here
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
