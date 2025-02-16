// app/about/page.js

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Technologies from "@/app/components/about/technologies";

export default function About() {
  return (
    <section className="py-12 px-6 lg:px-20 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1>
           OD2 - One Day Developers | Who We Are & What We Do
          </h1>
          <p>
            A Company with the Unique Target to Complete Projects in 24 Hours
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2 bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl">
            <Image
              src="/odd.png"
              alt="Next.js Logo"
              width={1350}
              height={1350}
              priority
            />
          </div>
          <div className="lg:w-1/2">
            <p className=" text-lg mb-4 leading-relaxed">
              At{" "}
              <span className="font-semibold text-yellow-500">
                One Day Developers (OD2)
              </span>
              , we are a dynamic team of experts dedicated to delivering
              top-notch software solutions, desktop applications, Android apps,
              and seamless integration services.
            </p>
            <p className=" text-lg mb-4 leading-relaxed">
              With a unique mission to complete projects within 24 hours, we
              blend efficiency and innovation to meet the diverse needs of our
              clients. Our focus on quality, speed, and adaptability ensures
              that businesses of all sizes can achieve their goals with
              cutting-edge technology customized to their requirements.
            </p>
            <h2 className=" text-lg leading-relaxed">
              At OD2, our h5romise is to transform your ideas into reality
              faster than ever before. Let us help you achieve your dreams with
              unmatched precision and expertish5.
            </h2>
          </div>
        </div>
      </div>
      <div className="py-5">
        <Technologies />
      </div>
    </section>
  );
}
