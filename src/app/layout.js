import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OD2",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className, "bg-bg_color"}>
        <div className="header flex" id="header">
          <Image
            src="/odd.png"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className="m-8 ml-0 w-60 h-37 flex-auto border-10 bg-card_bg_color rounded  content-center text-center ">  Nav Bar</div>
        </div>
        {children}
      </body>
    </html>
  );
}
