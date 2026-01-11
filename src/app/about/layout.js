export const metadata = {
  title: "About One Day Developers - Our Mission and Team",
  description: "Discover the story behind One Day Developers (OD2). We are a dedicated team providing rapid, high-quality software solutions and mobile apps tailored to your needs.",
  keywords: [
    "One Day Developers",
    "OD2",
    "rapid software delivery",
    "Agile development team",
    "software development experts",
    "OD2 mission",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About One Day Developers | OD2",
    description: "Learn how we deliver exceptional software and apps in record time. Our team, our mission, and our commitment to quality.",
    url: "/about",
    siteName: "One Day Developers",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "About One Day Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About One Day Developers | OD2",
    description: "Our mission: delivering high-quality software solutions with speed and precision.",
    images: ["/odd.png"],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
