export const metadata = {
  title: "Free Email Sending Test Service & Templates",
  description: "Test your email deliverability with our free email templates and sending service. Copy production-ready HTML, CSS, and Plain Text templates for OTP, Transactional, and Marketing emails.",
  keywords: [
    "free email test service",
    "email templates",
    "test email content",
    "html email preview",
    "spam filter test",
    "otp email template",
    "transactional email test",
  ],
  alternates: {
    canonical: "/test-mail",
  },
  openGraph: {
    title: "Free Email Sending Test Service & Templates | OD2",
    description: "Production-ready email templates for developers. Test OTP, Transactional, and Marketing emails for free.",
    url: "/test-mail",
    siteName: "One Day Developers",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Test Mail - Email Templates for Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Email Sending Test Service & Templates | OD2",
    description: "Production-ready email templates for developers. Test OTP, Transactional, and Marketing emails for free.",
    images: ["/odd.png"],
  },
};

export default function TestMailLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "OD2 Email Test Tool",
        "url": "https://www.od2.in/test-mail",
        "description": "Production-ready email templates and testing tools for developers.",
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
            "name": "Can I send test emails directly with this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Currently, you can use our production-ready templates for manual testing. Direct email sending via SMTP/API is coming soon as a free service."
            }
          },
          {
            "@type": "Question",
            "name": "Are these email templates mobile-responsive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all our templates are designed and tested to be fully responsive across modern email clients like Gmail, Outlook, and Apple Mail."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide templates for verification codes (OTP)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide specific templates for OTP, Transactional receipts, Newsletters, and Marketing emails."
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