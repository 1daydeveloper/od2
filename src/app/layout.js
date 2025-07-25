import Footer from "@/components/footer";
import Header from "@/components/header";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clarity from "@microsoft/clarity";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: {
    template: "%s | One Day Developers",
    default: "One Day Developers - Rapid Project Delivery",
  },
  description:
    "One Day Developers (OD2) specializes in delivering high-quality software, desktop applications, Android development, and integration services within just 24 hours*. Your trusted partner for rapid development and innovation.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  keywords: [
    "One Day Developers",
    "OD2",
    "software development",
    "Android development",
    "desktop applications",
    "integration services",
    "24-hour project delivery",
    "rapid development",
    "rapid innovation",
    "rapid project delivery",
    "OD2.in",
    "Free Image to Blob Converter",
    "OD2 Image to Blob Converter",
    "Free temp mail",
    "OD2 temp mail",
    "Free temporary email",
    "OD2 temporary email",
    "Free disposable email",
    "OD2 disposable email",
    "Free throwaway email",
    "OD2 throwaway email",
    "Free fake email",
    "OD2 fake email",
    "Free email generator",
    "OD2 email generator",
    "Free email service",
    "OD2 email service",
    "Free email provider",
    "OD2 email provider",
    "Free email address",
    "OD2 email address",
    "Free email account",
    "OD2 email account",
    "Free email inbox",
    "OD2 email inbox",
    "Free email domain",
    "OD2 email domain",
    "Free email hosting",
    "OD2 email hosting",
    "Free email forwarding",
    "OD2 email forwarding",
    "Free email alias",
    "OD2 email alias",
    "Free email service provider",
    "OD2 email service provider",
  ],
  author: "One Day Developers (OD2)",
  openGraph: {
    title: "One Day Developers - Complete Your Project in 24 Hours",
    description:
      "Need high-quality software, apps, or integrations quickly? One Day Developers (OD2) delivers exceptional results in just 24 hours*!",
    url: "https://www.od2.in", // Replace with your actual site URL
    siteName: "One Day Developers",
    images: [
      {
        url: "https://www.od2.in/odd.png", // Replace with your actual image URL
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
      "Your trusted partner for high-quality software, desktop applications, and Android development delivered within just 24 hours*.",
    images: ["https://www.od2.in/odd.png"], // Replace with your actual image URL
  },
};

export default function RootLayout({ children }) {
  const projectId = "ppl59vo27j";

  Clarity.init(projectId);
  return (
    <html lang="en" className="dark">
      <head>
        {process.env.ENVIRONMENT !== "" && (
          <>
            {/* Google Analytics using next/script */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-1CC0XPGF77"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-1CC0XPGF77');
              `}
            </Script>
            <Script
              id="google-tag"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K3JKX9NM');`,
              }}
            ></Script>

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
          </>
        )}
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OD2 - One Day Developers",
        "url": "https://od2.in",
        "logo": "https://www.od2.in/odd.png",
        "sameAs": [
          "https://www.instagram.com/onedaydevelopers/",
          "https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA",
          "https://x.com/onedaydev2020"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "admin@od2.in",
          "telephone": "+917010178914",
          "contactType": "customer service"
        },
        "foundingDate": "2020",
        "description": "OD2 - One Day Developers specializes in web, app, and software development with high performance and SEO optimization.",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Temp Mail",
                "description": "Generate disposable emails on-the-go! Secure, fast, and perfect for protecting your privacy or testing software."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Passport Size Photo Maker",
                "description": "Get your passport-size photo perfectly resized and ready for print. Quick, easy, and high-quality images for all your official document needs."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Broken Link Checker",
                "description": "Easily check your website for broken links and ensure all your links are working correctly. Quick, efficient, and reliable link checking for your web pages."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Software Development",
                "description": "Custom software solutions tailored to your needs.",
                "url": "https://www.od2.in/products"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "OD2 Billing System",
                "description": "A fast and efficient billing system for businesses with low price.",
                "url": "https://www.od2.in/products/od2-billing-system",
                "image": "https://www.od2.in/odd.png",
                "brand": {
                  "@type": "Brand",
                  "name": "OD2"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "9999.00",
                  "availability": "https://schema.org/InStock"
                }
              }
            },
           
          ]
        }
      },
      null,
      2
    )
  }}
/>

      </head>
      <body className={`${inter.className}`}>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
