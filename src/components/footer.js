"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <Card as="footer" className="bg-footer_bg text-footer_text border-0 rounded-none shadow-none">
      <Separator />
      <CardContent className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex justify-center md:justify-start mb-4">
              <Image
                src="/odd.png"
                alt="OD2 Logo"
                className="mx-auto md:mx-0"
                width={80}
                height={80}
                priority
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">One Day Developers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Delivering quality software solutions within 24 hours.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:dev@od2.in" className="hover:text-blue-600">
                  dev@od2.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>India (Remote Worldwide)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-blue-600 transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/temp-mail" className="hover:text-blue-600 transition-colors">
                  Temp Mail
                </Link>
              </li>
              <li>
                <Link href="/captcha" className="hover:text-blue-600 transition-colors">
                  reCAPTCHA Tools
                </Link>
              </li>
              <li>
                <Link href="/passport-photo-printing" className="hover:text-blue-600 transition-colors">
                  Photo Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />
        
        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
          <p className="text-center sm:text-left mb-2 sm:mb-0">
            Copyright &copy; 2024-{new Date().getFullYear()} One Day Developers. All rights reserved.
          </p>
          <p className="text-center sm:text-right text-gray-600 dark:text-gray-400">
            Made with ❤️ by OD2 Team
          </p>
        </div>
      </CardContent>
    </Card>
  );
};



export default Footer;
