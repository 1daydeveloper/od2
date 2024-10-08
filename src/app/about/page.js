// app/about/page.js

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import '../../styles/about.css';

export default function About() {
  return (
    <div class=" mx-auto m-10 bg-clip-padding rounded-xl shadow-md overflow-hidden ">
      <div class="md:flex ">
        
        <div class="p-8">
          <h2 class="uppercase tracking-wide text-5xl text-yellow-300 font-semibold">
            One Day Developers(OD2)
          </h2>
          <a
            href="#"
            class="block mt-1 text-lg leading-tight font-medium text-yellow hover:underline"
          >
            A Company with the Uniqe target to make the Projects in 24Hrs
          </a>
          <p class="mt-2 text-yellow-500">
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
