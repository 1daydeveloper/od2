export const viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://www.od2.in'),
  title: "Temp Mail - Free Disposable Temporary Email Address | OD2",
  description:
    "Protect your privacy with OD2 Temp Mail. Get free, secure, and disposable temporary email addresses instantly. Avoid spam and keep your inbox clean with 12-hour self-destructing emails.",
  keywords: [
    "temp mail",
    "temporary mail",
    "disposable email",
    "temporary email",
    "secure mail",
    "anonymous email",
    "free temp mail",
    "throwaway email",
    "spam protector",
    "OD2",
  ],
  authors: [{ name: "One Day Developers (OD2)", url: "https://www.od2.in" }],
  creator: "One Day Developers",
  publisher: "One Day Developers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/temp-mail",
  },
  openGraph: {
    title: "Temp Mail - Free Disposable Temporary Email | OD2",
    description:
      "Generate instant disposable email addresses with OD2 Temp Mail. Secure, anonymous, and free service to protect your inbox from spam.",
    url: "/temp-mail",
    siteName: "OD2 Temp Mail",
    images: [
      {
        url: "/od2.png",
        width: 1200,
        height: 630,
        alt: "OD2 Temp Mail - Disposable Email Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temp Mail - Free Disposable Temporary Email | OD2",
    description: "Get a free temporary email address instantly. No registration required. Keep your real inbox safe from spam.",
    images: ["/od2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "Utility",
  classification: "Communication Tool",
};

export default function TmailLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.od2.in/temp-mail/#software",
        "name": "OD2 Temp Mail",
        "url": "https://www.od2.in/temp-mail",
        "description": "Free, secure, and disposable temporary email address service. Protect your privacy and avoid spam with instant 12-hour self-destructing inbox.",
        "applicationCategory": "Utility",
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
            "name": "What is Temp Mail?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Temp mail is a disposable email service that provides a quick, temporary inbox to protect your privacy and avoid spam in your primary inbox."
            }
          },
          {
            "@type": "Question",
            "name": "Is OD2 Temp Mail free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our temporary email service is 100% free to use with no registration required."
            }
          },
          {
            "@type": "Question",
            "name": "How long do emails last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All emails received are automatically deleted 12 hours after being received to ensure your privacy and security."
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
