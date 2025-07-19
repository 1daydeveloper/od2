import Footer from "@/components/footer";
import Header from "@/components/header";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Clarity from "@microsoft/clarity";
// import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: {
    template: "%s | OD2 Trip Expense Tracker",
    default: "OD2 Trip Expense Tracker - Track Your Travel Expenses",
  },
  description:
    "OD2 Trip Expense Tracker helps you manage and track all your travel expenses efficiently. Organize expenses by trip, categorize spending, and keep track of your travel budget.",
  keywords: [
    "trip expense tracker",
    "travel expense management", 
    "expense tracking",
    "travel budget",
    "expense organizer",
    "trip planning",
    "travel expenses",
    "expense calculator",
    "budget tracker",
    "OD2",
    "expense management app",
    "travel finance",
    "trip budgeting",
    "expense categories",
    "travel cost tracking"
  ],
  author: "OD2 - One Day Developers",
  openGraph: {
    title: "OD2 Trip Expense Tracker - Manage Your Travel Expenses",
    description:
      "Track and manage your travel expenses with ease. Organize by trip, categorize spending, and stay within budget.",
    url: "https://www.od2.in",
    siteName: "OD2 Trip Expense Tracker",
    images: [
      {
        url: "https://www.od2.in/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Trip Expense Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OD2 Trip Expense Tracker - Track Your Travel Expenses",
    description:
      "Manage your travel expenses efficiently with our easy-to-use trip expense tracker.",
    images: ["https://www.od2.in/odd.png"],
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
        "@type": "WebApplication",
        "name": "OD2 Trip Expense Tracker",
        "url": "https://od2.in",
        "description": "A comprehensive trip expense tracker to help travelers manage and organize their travel expenses by trip and category.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Track expenses by trip",
          "Categorize expenses",
          "View expense summaries",
          "Local data storage",
          "Responsive design"
        ]
      },
      null,
      2
    )
  }}
/>

      </head>
      <body className="font-sans">
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header />
        <div className="p-2 py-3 lg:px-16">{children}</div>
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
