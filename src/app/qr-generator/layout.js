export const viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://www.od2.in'),
  title: "100% Free Advanced QR Code Generator | Trending Templates & 4K Export | OD2",
  description:
    "Generate professional, fully customizable QR codes for free. Features trending gradient templates, 4K Ultra HD export, client-side privacy, and custom logos. No sign-up required.",
  keywords: [
    "free qr code generator",
    "advanced qr generator",
    "trending qr templates",
    "gradient qr code",
    "logo qr code",
    "4k qr export",
    "vector qr code",
    "transparent background qr",
    "privacy-first qr tool",
    "wifi qr code",
    "vcard qr code",
    "OD2",
    "client-side generation",
    "no sign up qr code"
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
    canonical: "/qr-generator",
  },
  openGraph: {
    title: "100% Free Advanced QR Code Generator | Custom Styles & 4K Export",
    description:
      "Design enterprise-grade QR codes with trending color gradients, custom corners, and logos. Download in 4K or SVG vector format. 100% free and private.",
    url: "/qr-generator",
    siteName: "OD2 QR Generator",
    images: [
      {
        url: "/od2.png",
        width: 1200,
        height: 630,
        alt: "OD2 Advanced QR Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100% Free Advanced QR Code Generator | OD2",
    description:
      "Generate customizable, professional QR codes instantly with gradient styles and 4K export. 100% private, 100% free.",
    images: ["/od2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Utility",
};

export default function QRGeneratorLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "OD2 Advanced QR Generator",
    "url": "https://www.od2.in/qr-generator",
    "description": "Professional QR code generator with custom styling, logos, and privacy-first processing.",
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
