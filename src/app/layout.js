import Footer from "@/components/footer";
import Header from "@/components/header";
import AppAnnouncementBanner from "@/components/AppAnnouncementBanner";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clarity from "@microsoft/clarity";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://www.od2.in'),
  title: {
    template: "%s | One Day Developers",
    default: "One Day Developers - Rapid Project Delivery & Software Solutions",
  },
  description:
    "One Day Developers (OD2) delivers high-quality software, mobile apps, and integration services in record time. Your partner for rapid innovation and reliable project delivery.",
  keywords: [
    "One Day Developers",
    "OD2",
    "software development",
    "Android development",
    "rapid project delivery",
    "rapid innovation",
    "API integration",
    "custom software solutions",
    "temp mail",
    "image to blob",
    "passport photo maker",
  ],
  authors: [{ name: "One Day Developers (OD2)", url: "https://www.od2.in" }],
  creator: "One Day Developers",
  publisher: "One Day Developers",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "One Day Developers - Complete Your Project with Speed & Quality",
    description:
      "High-quality software, apps, and integrations delivered swiftly. One Day Developers (OD2) is your trusted partner for rapid tech solutions.",
    url: "/",
    siteName: "One Day Developers",
    images: [
      {
        url: "/odd.png",
        width: 1200,
        height: 630,
        alt: "One Day Developers - Rapid Project Delivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Day Developers - Rapid Project Delivery",
    description:
      "Trusted partner for high-quality software and mobile development delivered with exceptional speed.",
    images: ["/odd.png"],
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
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.od2.in/#organization",
      "name": "One Day Developers (OD2)",
      "url": "https://www.od2.in",
      "logo": "https://www.od2.in/odd.png",
      "sameAs": [
        "https://github.com/1daydeveloper",
        "https://www.linkedin.com/company/one-day-developers"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.od2.in/#website",
      "url": "https://www.od2.in",
      "name": "One Day Developers",
      "publisher": { "@id": "https://www.od2.in/#organization" },
      "inLanguage": "en-US"
    }
  ]
};

export default function RootLayout({ children }) {
  const projectId = "ppl59vo27j";

  Clarity.init(projectId);
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <>
          {/* Analytics Setup */}
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
            `}
          </Script>

          {/* Google Tag Manager - Primary Analytics */}
          <Script
            id="google-tag"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K3JKX9NM');`,
            }}
          />

          <Script
            id="clarity-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "ppl59vo27j");
                `,
            }}
          />

          <Script
            id="tawk-to-chat"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                  (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/6913054bc06905194f407bbc/1j9p4pc2f';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                  })();
                `,
            }}
          />

          {/* Google AdSense */}
          <meta name="google-adsense-account" content="ca-pub-1135784086315457" />
        </>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1135784086315457"
          crossorigin="anonymous"></script>

      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppAnnouncementBanner variant="global" />
          <Header />
          <div className="px-2 py-3 sm:px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">{children}</div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Footer />
          {process.env.ENVIRONMENT !== "DEV" && (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-K3JKX9NM"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
