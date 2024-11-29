"use client";
import { useEffect, useState, React } from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className=" h-20  bottom-0 left-0 flex w-full items-end justify-center bg-headfoot_color">
        <div className="flex-auto w-30 "></div>
        <div className="flex-auto w-40content-between justify-items-center">
          <Image
            src="/odd.png"
            alt="OD2 Logo"
            className="-mt-9  mx-auto border-orange-400 border-2 bg-black rounded-lg"
            width={100}
            height={100}
            priority
            style={{
              "boxShadow":
                "0px 0px 20px 2px rgb(251 146 60 / var(--tw-bg-opacity))",
              transition: "boxShadow 4s ease-out",
            }}
          />
          <h3 className="text-center font-bold font-serif  text-black pt-3">
            ONE DAY DEVELOPERS
          </h3>
        </div>
        <div className="flex-auto w-30"></div>
      </div>
    </footer>
  );
};

export default Footer;