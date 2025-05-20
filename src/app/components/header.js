"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: "", label: "Home" },
    { id: "temp-mail", label: "Temp Mail" },
    { id: "passport-photo-printing", label: "Photo Maker" },
    { id: "products", label: "Products" },
    { id: "products//od2-billing-system", label: "Billing System" },
    { id: "about", label: "About" },
    { id: "convert-image-to-blob", label: "Image to Blob" },
    { id: "blog", label: "Blog" },
  ];
  const currentTitle = navLinks.find(
    (link) => link.id === pathname.slice(1)
  ) || { label: "One Day Developers" };

  return (
    //  className="fixed w-full top-0 z-50"
    <header className="bg-header_bg text-header_text">
      <nav className=" px-4 sm:px-6 py-4">
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
              <h2 className="ml-2 text-xl font-bold">
                OD2 - {currentTitle.label}
              </h2>
            </div>

            <div className="hidden md:flex space-x-8 text-black items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`/${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  aria-label={`Navigate to ${link.label} section`}
                  className="text-black"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <ThemeToggle />
              </div>
            </div>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <button
              className="md:hidden focus:outline-none focus:ring-2 rounded-lg p-2"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                
               <X />
                
              ) : (
              <Menu />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 gap-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`/${link.id}`}
                    onClick={(e) => handleClick(e, link.id)}
                    className="transition-colors duration-300 ease-in-out text-black"
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div></div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
