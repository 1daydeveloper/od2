"use client";
import React from "react";
import Image from "next/image";
import Technologies from "@/components/about/technologies";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader className="text-center mb-10">
            <CardTitle>
              OD2 - One Day Developers | Who We Are & What We Do
            </CardTitle>
            <CardDescription>
              A Company with the Unique Target to Complete Projects in 24 Hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-10">
              <Card className="lg:w-1/2 bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-0 overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src="/odd.png"
                    alt="Next.js Logo"
                    width={1350}
                    height={1350}
                    priority
                    className="object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
              <Card className="lg:w-1/2 flex flex-col justify-center shadow-none border-none p-0">
                <CardContent className="p-0">
                  <p className="text-lg mb-4 leading-relaxed">
                    At{" "}
                    <span className="font-semibold text-yellow-500">
                      One Day Developers (OD2)
                    </span>
                    , we are a dynamic team of experts dedicated to delivering
                    top-notch software solutions, desktop applications, Android apps,
                    and seamless integration services.
                  </p>
                  <p className="text-lg mb-4 leading-relaxed">
                    With a unique mission to complete projects within 24 hours, we
                    blend efficiency and innovation to meet the diverse needs of our
                    clients. Our focus on quality, speed, and adaptability ensures
                    that businesses of all sizes can achieve their goals with
                    cutting-edge technology customized to their requirements.
                  </p>
                  <CardTitle asChild>
                    <h2 className="text-lg leading-relaxed font-semibold">
                      At OD2, our promise is to transform your ideas into reality
                      faster than ever before. Let us help you achieve your dreams with
                      unmatched precision and expertise.
                    </h2>
                  </CardTitle>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <Card className="py-5 mt-6">
          <CardContent>
            <Technologies />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
