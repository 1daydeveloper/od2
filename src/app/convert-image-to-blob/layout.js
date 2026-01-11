export const metadata = {
  title: "Image to Blob Converter - Free Online Tool",
  description:
    "Convert images to blob format instantly for web development. Secure, fast, and free online tool to upload, preview, and download image blobs.",
  keywords: [
    "image to blob",
    "blob converter",
    "image converter",
    "blob format",
    "web development tools",
    "convert image to blob online",
    "blob downloader",
    "Free Image to Blob Converter",
    "OD2 Image to Blob Converter",
    "OD2",
  ],
  authors: [{ name: "One Day Developers (OD2)" }],
  alternates: {
    canonical: "/convert-image-to-blob",
  },
  openGraph: {
    title: "Image to Blob Converter | Free Online Tool | OD2",
    description:
      "Easily convert your images to blob format for web development. Upload, preview, and download blobs quickly with our secure tool.",
    url: "/convert-image-to-blob",
    type: "website",
    locale: "en_US",
    siteName: "OD2 Tools",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Image to Blob Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Blob Converter | OD2",
    description: "Convert images to blob format instantly. Perfect for developers and web projects.",
    images: ["/odd.png"],
  },
};

export default function ImageToBlobLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.od2.in/convert-image-to-blob/#software",
        "name": "OD2 Image to Blob Converter",
        "description": "Easily convert your images to blob format for web development and other use cases.",
        "url": "https://www.od2.in/convert-image-to-blob",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Organization",
          "name": "One Day Developers (OD2)",
          "url": "https://www.od2.in"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why should I convert an image to a Data URL (Blob)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Converting images to Data URLs reduces HTTP requests, improves offline support, and allows for embedding images directly into CSS or email templates."
            }
          },
          {
            "@type": "Question",
            "name": "Is my data secure when using this converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all conversions happen locally in your browser. Your images are never uploaded to our servers, ensuring total privacy."
            }
          },
          {
            "@type": "Question",
            "name": "Which file formats are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our converter supports all common image formats including JPG, PNG, GIF, and SVG."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
