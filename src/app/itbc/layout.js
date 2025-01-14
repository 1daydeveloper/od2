export const metadata = {
  title: "Image to Blob Converter",
  description:
    "Easily convert your images to blob format for web development and other use cases. Upload, preview, and download blobs quickly with this user-friendly tool.",
  keywords: [
    "image to blob",
    "blob converter",
    "image converter",
    "blob format",
    "web development tools",
    "convert image to blob online",
    "blob downloader",
  ],
  author: "One Day Developers Team",
  robots: "index, follow",
  canonical: "https://od2.in/itbc",
  openGraph: {
    title: "Image to Blob Converter",
    description:
      "Easily convert your images to blob format for web development and other use cases. Upload, preview, and download blobs quickly with this user-friendly tool.",
    url: "https://od2.in/itbc",
    type: "website",
    locale: "en_US",
    site_name: "Image to Blob Converter",
  },
  additionalMeta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#ffffff" },
    { name: "msapplication-TileColor", content: "#ffffff" },
    { name: "msapplication-config", content: "/browserconfig.xml" },
  ],
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Image to Blob Converter",
    description:
      "Easily convert your images to blob format for web development and other use cases. Upload, preview, and download blobs quickly with this user-friendly tool.",
    url: "https://od2.in/itbc",
  },
};

export default function ImageToBlobLayout({ children }) {
  return <>{children}</>;
}
