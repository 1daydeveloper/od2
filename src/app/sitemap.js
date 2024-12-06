export default function sitemap() {
    return [
      {
        url: 'https://od2.in',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: 'https://od2.in/tmail',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://od2.in/photo',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://od2.in/about',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    ]
  }