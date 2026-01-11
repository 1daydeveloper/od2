export const metadata = {
  title: "reCAPTCHA v2 Testing & Debugging Tool",
  description: "Test and debug Google reCAPTCHA v2 integrations online. Generate responses using your own site key to verify verify server-side validation.",
  keywords: [
    "Captcha testing",
    "reCAPTCHA v2",
    "Google captcha test",
    "captcha response generator",
    "site key debug",
    "OD2 captcha",
    "web security testing",
  ],
  authors: [{ name: "One Day Developers (OD2)", url: "https://www.od2.in" }],
  alternates: {
    canonical: "/captcha/v2",
  },
  openGraph: {
    title: "Captcha v2 Testing Site | OD2",
    description: "Test Google reCAPTCHA v2 with your own site key. Quick and easy debugging for developers.",
    url: "/captcha/v2",
    siteName: "OD2 Tools",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Captcha v2 Tester",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Captcha v2 Testing Tool | OD2",
    description: "Debug your reCAPTCHA v2 integration instantly.",
    images: ["/odd.png"],
  },
};

export default function CaptchaV2Layout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.od2.in/captcha/v2/#software",
        "name": "OD2 Captcha v2 Tester",
        "url": "https://www.od2.in/captcha/v2",
        "description": "Developer tool to test and debug Google reCAPTCHA v2 integration.",
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
            "name": "How do I test my own reCAPTCHA v2 site key?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply enter your Google reCAPTCHA v2 site key in the input field, solve the captcha, and use the generated response token to verify your server-side logic."
            }
          },
          {
            "@type": "Question",
            "name": "Is this tool compatible with reCAPTCHA v3?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This specific tool is designed for reCAPTCHA v2 Checkbox. Support for reCAPTCHA v3 and other types is coming soon."
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
