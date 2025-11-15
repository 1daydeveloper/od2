"use client";
import { useState, React } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Brain,
  ChartAreaIcon,
  CloudCogIcon,
  CodeXml,
  Columns4,
  FolderCode,
  Megaphone,
  MoveRight,
  Package,
  ShoppingBag,
  Sliders,
  TabletSmartphone,
  TargetIcon,
} from "lucide-react";

const Mainpage = () => {
  const [openCollapseIndex, setOpenCollapseIndex] = useState(null);

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

  return (
    <div className="flex flex-col gap-3">
      {/* Top Banner */}
      <div className="flex flex-col text-center gap-3 p-4 sm:p-6 rounded-lg shadow">
        <div className="hidden lg:block">
          <Button asChild variant="secondary" className="mb-7 rounded-full px-1 pe-4">
            <Link href="/api-wd" className="inline-flex items-center">
              <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
                New
              </span>
              <span className="text-sm font-medium">
                Try our new API Workflow Designer
              </span>
              <MoveRight className="ml-3" />
            </Link>
          </Button>
        </div>
        
        {/* Tools Highlight Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-blue-800 mb-1">
                🛠️ Free Online Tools Available Now!
              </h3>
              <p className="text-sm text-blue-600">
                Temp Mail, Passport Photos, API Designer, and more - All completely free!
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="#tools" className="inline-flex items-center">
                  Explore Tools
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Card className="border p-6">
            <CardTitle className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
              One Day Developers (OD2)
            </CardTitle>
          </Card>
        </div>
        <div>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            We invest in the Time
          </h2>
        </div>
        <div>
          <p className="mb-8 text-lg font-normal lg:text-xl">
            We invest time to deliver value, ensuring lasting impact and growth
            with every effort we make.
          </p>
        </div>
        <div className="inline-flex justify-center">
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
      {/* Cards Section */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 w-full justify-center items-stretch py-4">
        <Card className="flex flex-1 flex-col justify-between p-4 sm:p-6 rounded-lg shadow min-w-0">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Megaphone size={36} className="shrink-0" />
            <CardTitle>
              <Link href="#advertising">We Advertise</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardDescription>
              Boost your brand with targeted advertising solutions designed to engage, attract, and grow your business.
            </CardDescription>
            <Button asChild className="w-full sm:w-auto">
              <Link href="#advertising" className="inline-flex items-center">
                Get Popular!
                <MoveRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-1 flex-col justify-between p-4 sm:p-6 rounded-lg shadow min-w-0">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <CodeXml size={36} className="shrink-0" />
            <CardTitle>
              <Link href="#development">We Develop</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardDescription>
              We develop innovative solutions to transform ideas into reality, delivering excellence for every project we undertake.
            </CardDescription>
            <Button asChild className="w-full sm:w-auto">
              <Link href="#development" className="inline-flex items-center">
                Let Us Start!
                <MoveRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-1 flex-col justify-between p-4 sm:p-6 rounded-lg shadow min-w-0">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Package size={36} className="shrink-0" />
            <CardTitle>
              <Link href="#tools">Our Tools & Products</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardDescription>
              Discover our free online tools and premium products that combine quality, innovation, and reliability to meet modern needs.
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild className="flex-1">
                <Link href="#tools" className="inline-flex items-center justify-center">
                  View Tools
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/products" className="inline-flex items-center justify-center">
                  Products
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Advertising Section */}
      <section id="advertising" className="maincard py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">We Advertise</h2>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg">
              Boost your brand with targeted advertising solutions designed to
              engage, attract, and grow your business. Leverage our advanced
              advertising strategies to maximize your ROI.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <Sliders size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Advanced Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  We leverage data-driven strategies to ensure your ads reach the
                  right audience at the right time, maximizing your return on
                  investment. Explore more on{" "}
                  <a
                    href="https://learn.g2.com/advanced-marketing-strategies"
                    target="_blank"
                    className="hover:underline"
                  >
                    advanced advertising strategies
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <TargetIcon size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Targeted Advertising</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  Our advanced targeting tools ensure that your message reaches
                  the perfect audience, improving engagement and driving
                  conversions. Learn more about{" "}
                  <a
                    href="https://www.facebook.com/business/ads/ad-targeting"
                    target="_blank"
                    className="hover:underline"
                  >
                    targeted advertising tools
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <ChartAreaIcon size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Comprehensive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  Track and optimize your campaigns with our comprehensive
                  analytics, allowing you to refine your strategy and boost
                  performance over time. Check out{" "}
                  <a
                    href="https://ads.google.com/home/tools/google-analytics/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Google Analytics
                  </a>{" "}
                  for more on campaign performance tracking.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-base sm:text-lg mb-3 sm:mb-4">
              Ready to take your advertising to the next level? Let’s create
              campaigns that drive real results.
            </p>
            <Button asChild aria-label="Get Started Button" className="w-full sm:w-auto">
              <a href="#contactus">Get Started</a>
            </Button>
          </div>
        </div>
      </section>
      {/* Development Section */}
      <section id="development" className="py-10 sm:py-16 px-2 sm:px-6 maincard rounded-lg shadow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">We Develop</h2>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg">
              We develop innovative solutions to transform ideas into reality,
              delivering excellence for every project we undertake. Our
              expertise spans a variety of technologies to ensure we meet your
              unique business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <FolderCode size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Web Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  We build dynamic, high-performance websites and web applications
                  with modern frameworks like{" "}
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Next.js
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://reactjs.org/"
                    target="_blank"
                    className="hover:underline"
                  >
                    React
                  </a>{" "}
                  to bring your ideas to life.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <TabletSmartphone size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Mobile Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  Our mobile development services create seamless, user-friendly
                  apps for both iOS and Android, using cutting-edge technologies
                  like{" "}
                  <a
                    href="https://reactnative.dev/"
                    target="_blank"
                    className="hover:underline"
                  >
                    React Native
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://flutter.dev/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Flutter
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <Columns4 size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Custom Software Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  We develop custom software solutions tailored to your business
                  needs, using technologies like{" "}
                  <a
                    href="https://nodejs.org/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Node.js
                  </a>
                  ,{" "}
                  <a
                    href="https://www.python.org/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Python
                  </a>
                  , and{" "}
                  <a
                    href="https://www.java.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Java
                  </a>{" "}
                  to build scalable, secure applications.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <CloudCogIcon size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Cloud Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  We implement scalable cloud solutions with platforms like{" "}
                  <a
                    href="https://aws.amazon.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    AWS
                  </a>
                  ,{" "}
                  <a
                    href="https://azure.microsoft.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Azure
                  </a>
                  , and{" "}
                  <a
                    href="https://cloud.google.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Google Cloud
                  </a>{" "}
                  to ensure high availability, security, and performance for your
                  applications.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <ShoppingBag size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">E-Commerce Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  We create powerful, user-friendly e-commerce platforms using
                  solutions like{" "}
                  <a
                    href="https://www.shopify.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Shopify
                  </a>
                  ,{" "}
                  <a
                    href="https://magento.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Magento
                  </a>
                  , and{" "}
                  <a
                    href="https://woocommerce.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    WooCommerce
                  </a>{" "}
                  to help you sell more and scale faster.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-col items-center text-center">
                <Brain size={40} className="mb-2 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">
                  Our AI & ML solutions empower your business with data-driven
                  insights, predictive models, and intelligent automation using
                  technologies like{" "}
                  <a
                    href="https://www.tensorflow.org/"
                    target="_blank"
                    className="hover:underline"
                  >
                    TensorFlow
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://pytorch.org/"
                    target="_blank"
                    className="hover:underline"
                  >
                    PyTorch
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-base sm:text-lg mb-3 sm:mb-4">
              Let us transform your ideas into reality with innovative,
              cutting-edge solutions. Contact us today and start your
              development journey!
            </p>
            <Button asChild className="w-full sm:w-auto inline-block">
              <a href="#contactus">Get Started</a>
            </Button>
          </div>
        </div>
      </section>
      {/* Our Tools Section */}
      <section id="tools" className="py-10 sm:py-16 px-2 sm:px-6 maincard rounded-lg shadow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Our Tools</h2>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg">
              Discover our collection of powerful, free online tools designed to make your life easier.
              From privacy protection to photo processing, we've got you covered!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Card className="flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 border-l-blue-500 hover:border-l-blue-600">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-blue-600">Temp Mail</CardTitle>
                <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full mb-4">FREE & POPULAR</span>
                <p className="text-center text-sm sm:text-base mb-4 flex-grow">
                  Generate temporary email addresses instantly! Perfect for protecting your privacy,
                  avoiding spam, and testing software. Auto-deletes after 12 hours.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">No Signup</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Instant Access</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Auto-Delete</span>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/temp-mail" className="inline-flex items-center justify-center">
                  Try Temp Mail
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 border-l-purple-500 hover:border-l-purple-600">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-purple-600">Passport Photo Maker</CardTitle>
                <span className="px-3 py-1 text-xs font-bold bg-orange-100 text-orange-800 rounded-full mb-4">FREE TOOL</span>
                <p className="text-center text-sm sm:text-base mb-4 flex-grow">
                  Create perfect passport-size photos for India, UK, USA, and Australia.
                  Upload, crop, and generate printable 6x4 sheets with cut lines instantly.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">Multi-Country</span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">Printable</span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">Instant</span>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/passport-photo-printing" className="inline-flex items-center justify-center">
                  Create Photos
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 border-l-green-500 hover:border-l-green-600">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CodeXml className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-green-600">API Workflow Designer</CardTitle>
                <span className="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full mb-4">NEW</span>
                <p className="text-center text-sm sm:text-base mb-4 flex-grow">
                  Design and visualize API workflows with our intuitive drag-and-drop interface.
                  Perfect for developers and API designers.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded">Drag & Drop</span>
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded">Visual</span>
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded">Developer</span>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/api-wd" className="inline-flex items-center justify-center">
                  Try Designer
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 border-l-red-500 hover:border-l-red-600">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z"/>
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-red-600">reCAPTCHA Tools</CardTitle>
                <span className="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full mb-4">SECURITY</span>
                <p className="text-center text-sm sm:text-base mb-4 flex-grow">
                  Test and implement Google reCAPTCHA v2 and v3 for your websites.
                  Protect against spam and abuse with our testing tools.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded">v2 & v3</span>
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded">Testing</span>
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded">Security</span>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/captcha" className="inline-flex items-center justify-center">
                  Test CAPTCHA
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 border-l-indigo-500 hover:border-l-indigo-600">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-3 rounded-full mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-indigo-600">OD2 Billing System</CardTitle>
                <span className="px-3 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full mb-4">PREMIUM</span>
                <p className="text-center text-sm sm:text-base mb-4 flex-grow">
                  Robust billing system built for performance and scalability.
                  Perfect for managing your business workflow with advanced features.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">Customizable</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">Scalable</span>
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">Advanced</span>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/products" className="inline-flex items-center justify-center">
                  Learn More
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 border-l-amber-500 hover:border-l-amber-600">
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 p-3 rounded-full mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-amber-600">More Tools Coming</CardTitle>
                <span className="px-3 py-1 text-xs font-bold bg-gray-100 text-gray-800 rounded-full mb-4">COMING SOON</span>
                <p className="text-center text-sm sm:text-base mb-4 flex-grow">
                  We're constantly developing new tools to make your digital life easier.
                  Stay tuned for more innovative solutions!
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded">Innovation</span>
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded">Updates</span>
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded">Free</span>
                </div>
              </div>
              <Button asChild className="w-full mt-4" disabled>
                <span className="inline-flex items-center justify-center cursor-not-allowed opacity-50">
                  Coming Soon
                  <MoveRight className="ml-2" />
                </span>
              </Button>
            </Card>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-base sm:text-lg mb-3 sm:mb-4">
              All our tools are free to use! We believe in making technology accessible to everyone.
              Have a suggestion for a new tool? Let us know!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/tools" className="inline-flex items-center">
                  Browse All Tools
                  <MoveRight className="ml-2" />
                </Link>
              </Button>
             
            </div>
          </div>
        </div>
      </section>
      {/* Who We Are Section */}
      <div>
        <Card className="flex flex-col p-2 sm:p-4">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg">
              Who We Are!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              value={openCollapseIndex !== null ? String(openCollapseIndex) : undefined}
              onValueChange={(val) =>
                setOpenCollapseIndex(val !== undefined ? Number(val) : null)
              }
              className="w-full"
            >
              {collapseData.map((item, index) => (
                <AccordionItem key={item.id} value={String(index)}>
                  <AccordionTrigger className="text-base sm:text-lg font-bold">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm sm:text-base">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mainpage;
