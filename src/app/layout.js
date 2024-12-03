import { Inter } from "next/font/google";
import "../styles/globals.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | OD2",
    default: "OD2",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      <body className={inter.className + "flex-col bg-white dark:bg-slate-800"}>
        <Header></Header>
        <div className="p-5">{children}</div>
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
        <Footer></Footer>
      </body>
    </html>
  );
}
