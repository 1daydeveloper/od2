import "../styles/globals.css";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clarity from "@microsoft/clarity";

export const metadata = {
  title: {
    template: "%s | One Day Developers",
    default: "One Day Developers - Rapid Project Delivery",
  },
  description:
    "One Day Developers (OD2) specializes in delivering high-quality software, desktop applications, Android development, and integration services within just 24 hours*. Your trusted partner for rapid development and innovation.",
  keywords: [
    "One Day Developers",
    "OD2",
    "software development",
    "Android development",
    "desktop applications",
    "integration services",
    "24-hour project delivery",
    "rapid development",
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
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1135784086315457"
              crossOrigin="anonymous"
            ></script>
          </>
        )}
      </head>
      <body className={"bg-background text-text"}>
        <Header />
        <div className="p-2 py-6 lg:mx-40">{children}</div>
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
      </body>
    </html>
  );
}
