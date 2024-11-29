// app/about/page.js

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import '../../styles/about.css';

export default function About() {
  return (
    <div className=" mx-auto m-10 bg-clip-padding rounded-xl shadow-md overflow-hidden ">
      <div className="md:flex ">
        
        <div className="p-8">
          <h2 className="uppercase tracking-wide text-5xl text-yellow-500 font-serif">
            One Day Developers(OD2)
          </h2>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-amber-500 hover:underline"
          >
            A Company with the Uniqe target to make the Projects in 24Hrs
          </a>
          <p className="mt-2 text-white">
            At One Day Developers (OD2), we are a dynamic team of experts
            dedicated to delivering top-notch software solutions, desktop
            applications, Android apps, and seamless integration services. With
            a unique mission to complete projects within 24 hours, we blend
            efficiency and innovation to meet the diverse needs of our clients.
            Our focus on quality, speed, and adaptability ensures that
            businesses of all sizes can achieve their goals with cutting-edge
            technology, customized to their requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
