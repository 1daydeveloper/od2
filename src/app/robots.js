export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.od2.in/sitemap.xml',
  }
}