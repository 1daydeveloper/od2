export const metadata = {
  title: "Temp Mail - Secure and Disposable Email Addresses | OD2",
  description:
    "OD2 Temporary Mail provides a quick, secure, and anonymous way to create disposable email addresses. Protect your privacy, avoid spam, and manage temporary communication without any registration. Perfect for one-time use or anonymous sign-ups.",
  keywords: [
    "temp mail",
    "temporary mail",
    "disposable email",
    "temporary email",
    "secure email",
    "anonymous email",
    "OD2 temp mail",
    "OD2 temporary mail",
    "OD2 disposable email",
    "Free temporary email",
    "Free temp mail",
    "Free disposable email",
    "Free secure email",
    "Free anonymous email",
    "OD2",
    ],
  author: "One Day Developers (OD2)",
  robots: "index, follow", // Allow search engines to index the page
  openGraph: {
    title: "Temp Mail - OD2",
    description:
      "OD2 Temporary Mail allows you to create disposable email addresses quickly and securely. Protect your privacy and manage temporary communications with ease.",
    image: "https://www.od2.in/od2.png", // Use a relevant image for social media previews
    url: "https://www.od2.in/temp-mail", // The URL of the page
    type: "website",
    locale: "en_US",
    site_name: "OD2 Temp Mail",
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "OD2 Temp Mail",
    description:
      "OD2 Temp Mail provides disposable email addresses for temporary communication. Use it to avoid spam and protect your privacy.",
    url: "https://www.od2.in/temp-mail",
    author: {
      "@type": "Organization",
      name: "One Day Developers",
    },
    applicationCategory: "Utility",
    operatingSystem: "All",
    potentialAction: {
      "@type": "Action",
      name: "Create a Temporary Email Address",
      target: "https://www.od2.in/temp-mail",
    },
  },
};

export default function TmailLayout({ children }) {
  return <>{children}</>;
}
