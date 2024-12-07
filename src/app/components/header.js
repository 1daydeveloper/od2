"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: "", label: "Home" },
    { id: "tmail", label: "Temp Mail" },
    { id: "photo", label: "Photo Maker" },
    { id: "about", label: "About" },
  ];
  const currentTitle = navLinks.find(
    (link) => link.id === pathname.slice(1)
  ) || { label: "One Day Developers" };

  return (
    //  className="fixed w-full top-0 z-50"
    <header>
      <nav className="bg-gradient-to-r from-black via-gray-900 to-black px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/odd.png"
                  alt="Next.js Logo"
                  width={50}
                  height={50}
                  className="h-30 w-30rounded-full"
                  priority
                />
              </Link>
              <h1 className="ml-2 text-xl font-bold text-white">
                OD2 - {currentTitle.label}
              </h1>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`/${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  className="text-gray-300 hover:text-white transition-colors duration-300 ease-in-out"
                  aria-label={`Navigate to ${link.label} section`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`/${link.id}`}
                    onClick={(e) => handleClick(e, link.id)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 ease-in-out"
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
