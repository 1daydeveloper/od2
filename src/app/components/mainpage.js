"use client";
import { useEffect, useState, React } from "react";
import Link from "next/link";
const Mainpage = () => {
  const [openCollapseIndex, setOpenCollapseIndex] = useState(null); // Track which collapse is open

  const collapseData = [
    {
      id: "whatweoffer",
      title: "What We Offer?",
      content:
        "We provide innovative software solutions tailored to your business needs.",
    },
    {
      id: "ourmission",
      title: "Our Mission",
      content:
        "Our mission is to deliver high-quality products with maximum customer satisfaction on time with effective retention.",
    },
    {
      id: "contactus",
      title: "Contact Us",
      content: "Reach us on  call us at +91 7010178914.",
    },
  ];

  const toggleCollapse = (index) => {
    setOpenCollapseIndex(openCollapseIndex === index ? null : index); // Open/close the collapse
  };

  const DownArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 9l-7.5 7.5L4.5 9"
      />
    </svg>
  );

  const UpArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15l7.5-7.5L19.5 15"
      />
    </svg>
  );

  return (
    <div className={"grid gap-3 "}>
      {" "}
      <div className={"flex flex-row "}>
        <section className="bg-gray-700 dark:bg-gray-900 w-full">
          <div className="py-8 px-4 text-center lg:py-16 z-10 ">
            <Link
              href="/temp-mail"
              className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
                New
              </span>{" "}
              <span className="text-sm font-medium">
                New Temp Mail System is Lached Check that Now!
              </span>
              <svg
                className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-yellow-500 border p-6">
            One Day Developers(OD2)
            </h1>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white">
              We invest in the Time
            </h2>
            <p className="mb-8 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
              We invest time to deliver value, ensuring lasting impact and
              growth with every effort we make.
            </p>
            <div className={"inline-flex"}>
              <Link href="https://www.instagram.com/onedaydevelopers/" aria-label="Share on Instagram">
                <svg
                  className="w-[40px] h-[40px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA"                 aria-label="Share on Youtube"
              >
                <svg
                  className="w-[40px] h-[40px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className={"flex flex-col w-full gap-2 md:flex-row"}>
        <div className="flex flex-col gap-2 p-6 bg-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-[40px] h-[40px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              clipRule="evenodd"
            />
          </svg>

          <Link href="#advertising">
            <h2 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">
              We Advertise
            </h2>
          </Link>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
            Boost your brand with targeted advertising solutions designed to
            engage, attract, and grow your business.
          </p>
          <Link
            href="#advertising"
            className="inline-flex w-1/2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Popular!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-2 p-6 bg-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-[40px] h-[40px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
            />
          </svg>

          <Link href="#development">
            <h2 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">
              We Develop
            </h2>
          </Link>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
            We develop innovative solutions to transform ideas into reality,
            delivering excellence for every project we undertake.
          </p>
          <Link
            href="#development"
            className="inline-flex w-1/2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Let Us Start!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        <div className=" flex flex-col gap-2 p-6 bg-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-[40px] h-[40px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
              clipRule="evenodd"
            />
          </svg>

          <Link href="/products">
            <h2 className="mb-2 text-2xl   font-bold tracking-tight  dark:text-white">
              Our Products
            </h2>
          </Link>
          <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
            Our products combine quality, innovation, and reliability to meet
            the needs of modern businesses and consumers.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-3 w-1/2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Check Out!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        <div></div>
      </div>
      <section id="advertising" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO-Friendly Title and Meta Description */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">We Advertise</h2>
            <p className="mt-4 text-lg text-gray-400">
              Boost your brand with targeted advertising solutions designed to
              engage, attract, and grow your business. Leverage our advanced
              advertising strategies to maximize your ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Advanced Strategy */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-12"
                >
                  <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Advanced Strategy
              </h3>
              <p className="text-gray-400 text-center">
                We leverage data-driven strategies to ensure your ads reach the
                right audience at the right time, maximizing your return on
                investment. Explore more on{" "}
                <a
                  href="https://learn.g2.com/advanced-marketing-strategies"
                  target="_blank"
                  className=" hover:underline"
                >
                  advanced advertising strategies
                </a>
                .
              </p>
            </div>

            {/* Targeted Advertising */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Targeted Advertising
              </h3>
              <p className="text-gray-400 text-center">
                Our advanced targeting tools ensure that your message reaches
                the perfect audience, improving engagement and driving
                conversions. Learn more about{" "}
                <a
                  href="https://www.facebook.com/business/ads/ad-targeting"
                  target="_blank"
                  className=" hover:underline"
                >
                  targeted advertising tools
                </a>
                .
              </p>
            </div>

            {/* Comprehensive Analytics */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Comprehensive Analytics
              </h3>
              <p className="text-gray-400 text-center">
                Track and optimize your campaigns with our comprehensive
                analytics, allowing you to refine your strategy and boost
                performance over time. Check out{" "}
                <a
                  href="https://ads.google.com/home/tools/google-analytics/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Google Analytics
                </a>{" "}
                for more on campaign performance tracking.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Ready to take your advertising to the next level? Let’s create
              campaigns that drive real results.
            </p>
            <a
              href="#contactus"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              aria-label="Get Started Button"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <section
        id="development"
        className="py-16 p-6 bg-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold ">We Develop</h2>
            <p className="mt-4 text-lg text-gray-400">
              We develop innovative solutions to transform ideas into reality,
              delivering excellence for every project we undertake. Our
              expertise spans a variety of technologies to ensure we meet your
              unique business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Web Development */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Web Development
              </h3>
              <p className="text-gray-400 text-center">
                We build dynamic, high-performance websites and web applications
                with modern frameworks like{" "}
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  className=" hover:underline"
                >
                  React
                </a>{" "}
                to bring your ideas to life.
              </p>
            </div>

            {/* Mobile Development */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 12l10 10 10-10-10-10z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Mobile Development
              </h3>
              <p className="text-gray-400 text-center">
                Our mobile development services create seamless, user-friendly
                apps for both iOS and Android, using cutting-edge technologies
                like{" "}
                <a
                  href="https://reactnative.dev/"
                  target="_blank"
                  className=" hover:underline"
                >
                  React Native
                </a>{" "}
                and{" "}
                <a
                  href="https://flutter.dev/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Flutter
                </a>
                .
              </p>
            </div>

            {/* Custom Software Development */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 4.5v15m7.5-7.5H4.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Custom Software Development
              </h3>
              <p className="text-gray-400 text-center">
                We develop custom software solutions tailored to your business
                needs, using technologies like{" "}
                <a
                  href="https://nodejs.org/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Node.js
                </a>
                ,{" "}
                <a
                  href="https://www.python.org/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Python
                </a>
                , and{" "}
                <a
                  href="https://www.java.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Java
                </a>{" "}
                to build scalable, secure applications.
              </p>
            </div>

            {/* Cloud Solutions */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 3H3v18h3V3zm12 18h3V3h-3v18z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                Cloud Solutions
              </h3>
              <p className="text-gray-400 text-center">
                We implement scalable cloud solutions with platforms like{" "}
                <a
                  href="https://aws.amazon.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  AWS
                </a>
                ,{" "}
                <a
                  href="https://azure.microsoft.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Azure
                </a>
                , and{" "}
                <a
                  href="https://cloud.google.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Google Cloud
                </a>{" "}
                to ensure high availability, security, and performance for your
                applications.
              </p>
            </div>

            {/* E-Commerce Solutions */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 12l2-2m0 0l4 4 4-4 4 4 4-4m0 0l2 2m-4-4l2-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                E-Commerce Solutions
              </h3>
              <p className="text-gray-400 text-center">
                We create powerful, user-friendly e-commerce platforms using
                solutions like{" "}
                <a
                  href="https://www.shopify.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Shopify
                </a>
                ,{" "}
                <a
                  href="https://magento.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  Magento
                </a>
                , and{" "}
                <a
                  href="https://woocommerce.com/"
                  target="_blank"
                  className=" hover:underline"
                >
                  WooCommerce
                </a>{" "}
                to help you sell more and scale faster.
              </p>
            </div>

            {/* AI & Machine Learning */}
            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <svg
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-3">
                AI & Machine Learning
              </h3>
              <p className="text-gray-400 text-center">
                Our AI & ML solutions empower your business with data-driven
                insights, predictive models, and intelligent automation using
                technologies like{" "}
                <a
                  href="https://www.tensorflow.org/"
                  target="_blank"
                  className=" hover:underline"
                >
                  TensorFlow
                </a>{" "}
                and{" "}
                <a
                  href="https://pytorch.org/"
                  target="_blank"
                  className=" hover:underline"
                >
                  PyTorch
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Let us transform your ideas into reality with innovative,
              cutting-edge solutions. Contact us today and start your
              development journey!
            </p>
            <a
              href="#contactus"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <div>
        <div className="flex flex-col p-4">
          <h3 className="text-3xl font-bold mb-6 bg-gray-950 p-3 rounded-lg">
            Who We Are!
          </h3>
          <div className="">
            {collapseData.map((item, index) => (
              <div
                id={item.id}
                key={index}
                className="border rounded-lg shadow-sm my-2"
              >
                <button
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center w-full p-4 hover:border-headfoot_color rounded-lg focus:outline-none"
                >
                  <span className="text-lg font-medium">{item.title}</span>
                  {openCollapseIndex === index ? <UpArrow /> : <DownArrow />}
                </button>

                {openCollapseIndex === index && (
                  <div className="p-4 bg-gray-700 rounded-b-lg ">
                    <p className="text-gray-400">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
