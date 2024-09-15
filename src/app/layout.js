import Image from "next/image";
import { Inter } from "next/font/google";
import '../styles/globals.css';
import Footer from './components/footer';
import Header from './components/header';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OD2",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<body className={inter.className}>
<div className="min-h-screen bg-gradient-to-r from-black via-yellow-800 to-black bg-[length:200%_200%] animate-gradient flex items-center justify-center">

{/* <Header></Header> */}

      
        {children}

      {/* <Footer></Footer> */}
</div>        
      </body>
    </html>
  );
}
