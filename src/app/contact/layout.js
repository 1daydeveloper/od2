export const metadata = {
  title: "Contact One Day Developers - Support and Project Inquiries",
  description: "Get in touch with One Day Developers (OD2). Contact us for 24-hour project delivery, custom software, mobile apps, or technical support.",
  keywords: [
    "contact OD2",
    "hire software developers",
    "technical support",
    "project inquiry",
    "One Day Developers phone",
    "OD2 email",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | One Day Developers | OD2",
    description: "Connect with the OD2 team for rapid software development and innovative tech solutions. We're here to help you build fast.",
    url: "/contact",
    siteName: "One Day Developers",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "Contact One Day Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact One Day Developers | OD2",
    description: "Start your rapid development project today. Get in touch with OD2.",
    images: ["/odd.png"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}