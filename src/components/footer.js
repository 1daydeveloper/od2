"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <Card as="footer" className="bg-footer_bg text-footer_text border-0 rounded-none shadow-none">
      <Separator />
      <CardContent className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <Image
              src="/odd.png"
              alt="OD2 Logo"
              className="mx-auto"
              width={100}
              height={100}
              priority
            />
          </div>
          <p className="mt-4 text-center text-sm lg:mt-0 lg:text-right">
            Copyright &copy; 2020-2027. All rights reserved.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;
