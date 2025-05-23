"use client";
import { useEffect, useState, React } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUpIcon, Brain, ChartAreaIcon, CloudCogIcon, CodeXml, Columns4, FolderCode, Megaphone, MoveRight, Package, ShoppingBag, Sliders, Table2Icon, TabletSmartphone, TargetIcon } from "lucide-react";

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





  return (
    <div className={"flex flex-col gap-3"}>
      {" "}
      <div className="flex flex-col text-center">
        <div >
          <Link
            href="/captcha"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
              New
            </span>{" "}
            <span className="text-sm font-medium">
              New CAPTCHA Test Suit is Introduced check that out!
            </span>
          <MoveRight className="ml-3" />
          </Link>
        </div>
        <div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl border p-6">
            One Day Developers(OD2)
          </h1>
        </div>
        <div>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl ">
            We invest in the Time
          </h2>
        </div>
        <div>
          <p className="mb-8 text-lg font-normal lg:text-xl">
            We invest time to deliver value, ensuring lasting impact and growth
            with every effort we make.
          </p>
        </div>
        <div className={"inline-flex justify-center"}>
          <Link
            href="https://www.instagram.com/onedaydevelopers/"
            aria-label="Share on Instagram"
          >
            <svg
              className="w-[40px] h-[40px] text-fuchsia-700"
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
          <Link
            href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA"
            aria-label="Share on Youtube"
          >
            <svg
              className="w-[40px] h-[40px]"
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
      <div className={"bg-slate-400 flex flex-col w-full gap-2 md:flex-row p-2"}>
        <div className="card flex flex-col gap-2 p-6 rounded-lg shadow">
          <Megaphone size={40} />

          <Link href="#advertising">
            <h2 className="mb-2 text-2xl font-bold tracking-tight ">
              We Advertise
            </h2>
          </Link>
          <p className="mb-3 font-normal">
            Boost your brand with targeted advertising solutions designed to
            engage, attract, and grow your business.
          </p>
          <Link
            href="#advertising"
            className="abtn inline-flex w-1/2 items-center px-3 py-2 text-sm font-medium text-center focus:ring-4 focus:outline-none"
          >
            Get Popular!
           <MoveRight className="ml-3" />
          </Link>
        </div>

        <div className="card flex flex-col gap-2 p-6  ">
         <CodeXml size={40} />

          <Link href="#development">
            <h2 className="mb-2 text-2xl font-bold tracking-tight  ">
              We Develop
            </h2>
          </Link>
          <p className="mb-3 font-normal ">
            We develop innovative solutions to transform ideas into reality,
            delivering excellence for every project we undertake.
          </p>
          <Link
            href="#development"
            className="abtn inline-flex w-1/2 items-center px-3 py-2 text-sm font-medium text-center"
          >
            Let Us Start!
           <MoveRight className="ml-3" />
          </Link>
        </div>

        <div className="card flex flex-col gap-2 p-6 ">
          <Package size={40} />

          <Link href="/products">
            <h2 className="mb-2 text-2xl   font-bold tracking-tight ">
              Our Products
            </h2>
          </Link>
          <p className="mb-3 font-normal">
            Our products combine quality, innovation, and reliability to meet
            the needs of modern businesses and consumers.
          </p>
          <Link
            href="/products"
            className="abtn inline-flex items-center px-3 w-1/2 py-2 text-sm font-medium text-center"
          >
            Check Out!
           <MoveRight className="ml-3" />
          </Link>
        </div>
        <div></div>
      </div>
      <section id="advertising" className="maincard py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO-Friendly Title and Meta Description */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">We Advertise</h2>
            <p className="mt-4 text-lg">
              Boost your brand with targeted advertising solutions designed to
              engage, attract, and grow your business. Leverage our advanced
              advertising strategies to maximize your ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Advanced Strategy */}
            <div className="card flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <Sliders size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">Advanced Strategy</h3>
              <p className=" text-center">
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
            <div className="card flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
               <TargetIcon size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Targeted Advertising
              </h3>
              <p className=" text-center">
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
            <div className="card flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">
                <ChartAreaIcon size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">
                Comprehensive Analytics
              </h3>
              <p className=" text-center">
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
            <p className="text-lg mb-4">
              Ready to take your advertising to the next level? Let’s create
              campaigns that drive real results.
            </p>
            <a
              href="#contactus"
              className="abtn inline-block"
              aria-label="Get Started Button"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <section
        id="development"
        className="py-16 p-6 maincard  rounded-lg shadow "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold ">We Develop</h2>
            <p className="mt-4 text-lg ">
              We develop innovative solutions to transform ideas into reality,
              delivering excellence for every project we undertake. Our
              expertise spans a variety of technologies to ensure we meet your
              unique business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Web Development */}
            <div className="card flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <FolderCode size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">Web Development</h3>
              <p className="text-center">
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
            <div className="card flex flex-col items-center p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
              <TabletSmartphone size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">
                Mobile Development
              </h3>
              <p className=" text-center">
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
            <div className="card flex flex-col items-center p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
              <Columns4 size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">
                Custom Software Development
              </h3>
              <p className=" text-center">
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
            <div className="card flex flex-col items-center p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
                <CloudCogIcon size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">Cloud Solutions</h3>
              <p className=" text-center">
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
            <div className="card flex flex-col items-center p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
               <ShoppingBag size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">
                E-Commerce Solutions
              </h3>
              <p className=" text-center">
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
            <div className="card flex flex-col items-center p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className=" text-4xl mb-4">
               <Brain size={40} />
              </div>
              <h3 className="text-xl font-semibold  mb-3">
                AI & Machine Learning
              </h3>
              <p className=" text-center">
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
            <p className="text-lg mb-4">
              Let us transform your ideas into reality with innovative,
              cutting-edge solutions. Contact us today and start your
              development journey!
            </p>
            <a href="#contactus" className="abtn inline-block ">
              Get Started
            </a>
          </div>
        </div>
      </section>
      <div>
        <div className="card flex flex-col p-4">
          <h3 className="text-3xl font-bold mb-6 p-3 rounded-lg">
            Who We Are!
          </h3>
          <div className="">
            {collapseData.map((item, index) => (
              <div
                id={item.id}
                key={index}
                className="border rounded-lg shadow-sm my-2"
              >
                <Button variant="outline"
                  className="flex justify-between items-center w-full p-4 text-left rounded-lg"
                  onClick={() => toggleCollapse(index)}
                >
                  <span className="text-lg font-bold">{item.title}</span>
                  {openCollapseIndex === index ? <ArrowUpIcon /> : <ArrowDown />}
                </Button>

                {openCollapseIndex === index && (
                  <div className="p-4 rounded-b-lg ">
                    <p>{item.content}</p>
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
