"use client";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start dark:text-teal-300">
            <Image
              src="/odd.png"
              alt="OD2 Logo"
              className="mx-auto"
              width={100}
              height={100}
              priority
            />{" "}
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right dark:text-gray-400">
            Copyright &copy; 2020-2027. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
