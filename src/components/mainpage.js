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
            <Link href="/captcha" className="inline-flex items-center">
              <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
                New
              </span>
              <span className="text-sm font-medium">
                New CAPTCHA Test Suit is Introduced check that out!
              </span>
              <MoveRight className="ml-3" />
            </Link>
          </Button>
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
              <Link href="/products">Our Products</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardDescription>
              Our products combine quality, innovation, and reliability to meet the needs of modern businesses and consumers.
            </CardDescription>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/products" className="inline-flex items-center">
                Check Out!
                <MoveRight className="ml-2" />
              </Link>
            </Button>
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
