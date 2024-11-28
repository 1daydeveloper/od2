"use client";
import  {React, useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [colorbg, setcolorbg] = useState("black");
  const items = ['white', 'green', 'yellow', 'blue'];

  useEffect(() => {
    const interval = setInterval(() => {
      setcolorbg(items);
    }, 2000); // 2000 milliseconds = 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [items.length]);



  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      <div className="header flex " id="header">
        <Image
          src="/odd.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div
          className="m-8 ml-0 w-60 h-37 flex-auto text-black border-10 rounded-2xl bg-headfoot_color  content-center text-center "
          style={{
            "box-shadow": "0px 0px 20px 2px "+colorbg,
            transition: "box-shadow 4s ease-out",
          }}
        >
          {" "}
          <nav className="shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="hidden md:flex items-center font-bold text-white  space-x-4">
                  <Link href="/" className="hover:text-black">
                    Home
                  </Link>
                  {/* <Link href="/photo" className="hover:text-black">
                    Photo
                  </Link> */}
                    <Link href="/tmail" className=" hover:text-black">Temp Mail</Link>


                  <Link href="/about" className=" hover:text-black">
                    About
                  </Link>
                </div>
                <div className="md:hidden flex items-center">
                  <button
                    onClick={toggleNavbar}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          isOpen
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 12h16M4 18h16"
                        }
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden absolute bg-slate-300">
                <div className=" px-2 pt-2 pb-3 space-y-1 sm:px-3 font-bold grid">
                  <Link href="/" className="hover:text-black ">
                    Home
                  </Link>
                  <Link href="/photo" className="hover:text-black">
                    Photo
                  </Link>
                  <Link href="/about" className=" hover:text-black">
                    About
                  </Link>
                </div>
              </div>
            )}
          </nav>{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
