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

import FaqSection from "@/components/FaqSection";
import faqData from "@/data/faqs.json";

export default function TestMailLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
      <div className="mt-12">
        <FaqSection faqs={faqData["test-mail"]} description="Common questions about our email testing service." />
      </div>
    </>
  );
}