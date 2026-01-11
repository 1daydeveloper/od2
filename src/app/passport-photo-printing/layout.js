export const metadata = {
  title: "Passport Size Printable Photo Maker (6x4)",
  description: "Create official passport size photos for India, UK, USA, and Australia. Upload, crop, and generate printable 6x4 sheets with cut lines for free.",
  keywords: [
    "passport photo maker",
    "passport size photo",
    "printable passport photo",
    "passport photo sheet",
    "online passport photo generator",
    "6x4 passport photo",
    "passport photo India",
    "passport photo UK",
    "passport photo USA",
    "OD2",
  ],
  alternates: {
    canonical: "/passport-photo-printing",
  },
  openGraph: {
    title: "Passport Size Printable Photo Maker (6x4) | OD2",
    description: "Easily create and print passport size photos for multiple countries. Upload, crop, preview, and download a printable 6x4 sheet with cut lines.",
    url: "/passport-photo-printing",
    siteName: "OD2 Tools",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Passport Photo Maker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Size Printable Photo Maker | OD2",
    description: "Create and print official passport size photos online. No software required.",
    images: ["/odd.png"],
  },
};

export default function PhotoLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.od2.in/passport-photo-printing/#software",
        "name": "OD2 Passport Photo Maker",
        "description": "Create printable passport size photos for multiple countries with ease.",
        "url": "https://www.od2.in/passport-photo-printing",
        "applicationCategory": "DesignApplication",
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
            "name": "What is the correct passport photo size for India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The standard passport photo size for India is 51x51 mm (600x600 px) with a white background."
            }
          },
          {
            "@type": "Question",
            "name": "How many photos fit on a 6x4 sheet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our tool automatically generates a 6x4 printable sheet with cut lines, fitting the maximum number of photos allowed by your selected country's dimensions."
            }
          },
          {
            "@type": "Question",
            "name": "Is registration required to use the Passport Photo Maker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, the OD2 Passport Photo Maker is 100% free to use and requires no registration or account creation."
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
