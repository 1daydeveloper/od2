"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BotOff } from "lucide-react";

export default function CaptchaIntro() {
  return (
    <section className="py-12 px-6 lg:px-20 rounded-lg">
      <div className="max-w-3xl mx-auto text-center">
        <BotOff size={62} className=" mx-auto  mb-4" />

        <h1 className="text-3xl font-bold mb-4">Captcha v2/v3 Testing Site</h1>
        <p className="text-lg ">
          Instantly test Google reCAPTCHA v2 and v3 by generating responses
          using your own site key. Choose a version below to get started.
        </p>
        <div className="flex flex-col py-8 sm:flex-row justify-center gap-6">
          <Link
            href="/captcha/v2"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Test reCAPTCHA v2
          </Link>
          <Link
            href="/captcha/v3"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Test reCAPTCHA v3
          </Link>
        </div>
        <div className="mb-8 text-base text-gray-700">
          <h2 className="text-xl font-semibold mb-2">
            What is Google reCAPTCHA?
          </h2>
          <p className="mb-2">
            <a
              href="https://www.google.com/recaptcha/about/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Google reCAPTCHA
            </a>{" "}
            is a security service that protects your website from spam and
            abuse. It uses advanced risk analysis techniques to tell humans and
            bots apart. reCAPTCHA v2 requires users to solve a challenge (like
            checking a box or selecting images), while reCAPTCHA v3 works
            invisibly in the background and assigns a score based on user
            interactions.
          </p>
        </div>

        {/* Health-focused SEO details */}
        <div className="mt-10 text-left text-gray-800 text-base max-w-2xl mx-auto">
          <h2 className="text-lg font-bold mb-2">
            Why reCAPTCHA Matters for Website Health & Security
          </h2>
          <p className="mb-2">
            Keeping your website healthy means protecting it from malicious
            bots, spam, and automated abuse. Google reCAPTCHA is a vital tool
            for maintaining the integrity and security of your online forms,
            login pages, and sensitive user interactions. By verifying that
            users are human, reCAPTCHA helps prevent fraudulent registrations,
            comment spam, and brute-force attacks, which can compromise your
            site&apos;s health and reputation.
          </p>
          <p className="mb-2">
            Implementing reCAPTCHA also supports user privacy and safety by
            reducing the risk of data breaches and unauthorized access. A secure
            website builds trust with your visitors and ensures compliance with
            best practices for digital health and cybersecurity.
          </p>
          <p>
            Regularly testing your reCAPTCHA integration ensures your defenses
            remain strong and your users are protected. Use this tool to verify
            your setup and keep your website healthy, secure, and user-friendly.
          </p>
        </div>

        <div className="mt-10 text-left  text-base max-w-2xl mx-auto">
          <h2 className="text-lg font-bold mb-2">
            Benefits of Using reCAPTCHA
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>Protects your website from spam and automated abuse.</li>
            <li>Improves user experience by reducing unwanted interactions.</li>
            <li>
              Helps maintain the integrity of your data and user accounts.
            </li>
            <li>Supports compliance with security and privacy standards.</li>
            <li>Easy to integrate with modern web frameworks and platforms.</li>
          </ul>
          <h2 className="text-lg font-bold mb-2">Common Use Cases</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Securing registration and login forms.</li>
            <li>
              Protecting contact and feedback forms from spam submissions.
            </li>
            <li>Preventing abuse in voting, polling, and survey systems.</li>
            <li>Safeguarding e-commerce checkout and payment processes.</li>
            <li>
              Ensuring only real users can access sensitive or premium content.
            </li>
          </ul>
          <h2 className="text-lg font-bold mb-2">
            Best Practices for Implementation
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              Always use your own site key and secret key for production
              environments.
            </li>
            <li>
              Test your reCAPTCHA integration regularly to ensure it works as
              expected.
            </li>
            <li>
              Inform users why reCAPTCHA is present and how it protects them.
            </li>
            <li>
              Keep your site keys and secret keys secure and never expose
              secrets in client-side code.
            </li>
            <li>
              Stay updated with the latest reCAPTCHA documentation and security
              advisories.
            </li>
          </ul>
        </div>
        <div className="mt-10 text-left text-gray-800 text-base max-w-2xl mx-auto">
          <h2 className="text-lg font-bold mb-2">Further Reading</h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="/blog/test-google-reCAPTCHA-v2"
                className="underline"
                target="_blank"
                rel="noopener"
              >
                How to Test Google reCAPTCHA v2 (Blog)
              </a>
            </li>
            <li>
              <a
                href="/blog/test-google-reCAPTCHA-v3"
                className="underline"
                target="_blank"
                rel="noopener"
              >
                How to Test Google reCAPTCHA v3 (Blog)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
