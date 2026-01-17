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

import FaqSection from "@/components/FaqSection";
import faqData from "@/data/faqs.json";

export default function ImageToBlobLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
      <div className="mt-12">
        <FaqSection faqs={faqData["convert-image-to-blob"]} description="Common questions about image to blob conversion." />
      </div>
    </>
  );
}
