export default function sitemap() {
    return [
      {
        url: 'https://od2.in',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://od2.in/tmail',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.2,
      },
      {
        url: 'https://od2.in/photo',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.4,
      },
      {
        url: 'https://od2.in/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    ]
  }