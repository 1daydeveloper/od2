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
  Mail,
  Megaphone,
  MoveRight,
  Package,
  ShoppingBag,
  Sliders,
  TabletSmartphone,
  TargetIcon,
  Zap,
} from "lucide-react";
import { menuItems } from "@/lib/common";
import { cn } from "@/lib/utils";

const Mainpage = () => {
  const [openCollapseIndex, setOpenCollapseIndex] = useState(null);

  // Find the new tool to highlight
  const newTool = menuItems.tools.find(tool => tool.isNew);

  const collapseData = [
    {
      id: "whatweoffer",
      title: "Comprehensive Tech Solutions",
      content:
        "We deliver a full spectrum of high-end software development services. From crafting bespoke Next.js web applications and feature-rich React Native mobile apps to architecting complex API ecosystems and scalable cloud infrastructures on AWS and Azure. Our team leverages the latest in AI, real-time data processing, and enterprise-grade security to ensure your digital products are not just functional, but market-leading. Whether it's a rapid MVP or a robust corporate system, we bring technical excellence to every line of code.",
    },
    {
      id: "ourmission",
      title: "The 24-Hour Commitment",
      content:
        "At OD2, our mission is to redefine speed in software engineering. We are committed to delivering premium, production-level solutions within a 24-hour window for critical business needs. By employing advanced agile methodologies, automated CI/CD pipelines, and internal rapid-prototyping frameworks, we eliminate traditional bottlenecks. We don't just work fast; we work smart, ensuring that quality, security, and scalability are never sacrificed for speed. Our goal is to build long-term partnerships through immediate value delivery.",
    },
    {
      id: "globalservices",
      title: "Global Reach & Innovation",
      content:
        "Serving clients across the globe, One Day Developers bridges the gap between ambitious ideas and technical reality. Our innovation lab is constantly exploring emerging technologies like Quantum Computing, Blockchain, and Advanced AI to keep our clients ahead of the curve. We provide detailed technical consulting, security audits, and performance optimization globally, ensuring that no matter your location, you have access to world-class engineering talent. Reach us on call at +91 7010178914 for any global inquiries.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Top Promotion Discovery Banner */}
      <div className=" border rounded-xl bg-blue-600 text-white py-2 px-4 shadow-lg transform transition-transform duration-300 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="hidden sm:inline-block bg-white text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">HOT</span>
            <p className="text-xs sm:text-sm font-medium truncate">
            Try our new <span className="font-bold underline decoration-blue-200">Test Mail Tool</span> – Preview & Test emails for free!
            </p>
          </div>
          <Button asChild size="sm" variant="secondary" className="h-7 text-[10px] sm:text-xs">
            <Link href="#tools">Explore All Tools</Link>
          </Button>
        </div>
      </div>

      <div id="hero-banner"> {/* Offset for the fixed banner */}
        <div className="flex flex-col text-center gap-6 p-8 sm:p-12 rounded-[2rem] bg-gradient-to-br from-background via-muted/20 to-background border shadow-2xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="hidden lg:flex gap-4">
              <Button asChild variant="outline" className="rounded-full px-4 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <Link href={menuItems.tools.find(t => t.id === "temp-mail")?.url || "/temp-mail"} className="inline-flex items-center">
                  <span className="text-[10px] bg-orange-600 rounded-full text-white px-2 py-0.5 me-3 animate-pulse">
                   🔥 HOT
                  </span>
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    Temp Mail
                  </span>
                  <MoveRight className="ml-3 w-4 h-4 text-red-600" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-4 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <Link href={newTool?.url || "/test-mail"} className="inline-flex items-center">
                  <span className="text-[10px] bg-blue-600 rounded-full text-white px-2 py-0.5 me-3 animate-pulse">
                NEW
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {newTool?.label || "Test Mail Content Tool"} is live
                  </span>
                  <MoveRight className="ml-3 w-4 h-4 text-blue-600" />
                </Link>
              </Button>
            </div>

            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground mb-6">
                One Day <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Developers</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-muted-foreground/80 mb-8 italic">
                We invest in the Time.
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                At OD2, we turn complex ideas into high-performance digital realities within <span className="text-foreground font-semibold">24 hours</span>.
                We invest our expertise and time to ensure your growth has a lasting impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-xl bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105">
                <Link href="#development">Start Your Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-muted transition-all">
                <Link href="#tools">Browse Free Tools</Link>
              </Button>
            </div>

            <div className="flex gap-6 mt-8">
              <Link href="https://www.instagram.com/onedaydevelopers/" className="hover:scale-110 transition-transform text-muted-foreground hover:text-fuchsia-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA" className="hover:scale-110 transition-transform text-muted-foreground hover:text-red-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 -mt-6 relative z-20">
        {menuItems.tools.filter(t => t.id === "temp-mail" || t.id === "test-mail").map(tool => (
          <Link key={tool.id} href={tool.url} className="group">
            <Card className={cn(
              "p-6 text-white border-0 shadow-lg transition-all hover:-translate-y-1",
              tool.id === "temp-mail" ? "bg-gradient-to-br from-blue-600 to-blue-800 group-hover:shadow-blue-500/20" : "bg-gradient-to-br from-purple-600 to-purple-800 group-hover:shadow-purple-500/20"
            )}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                  {tool.id === "temp-mail" ? <Mail className="w-6 h-6" /> : <CodeXml className="w-6 h-6" />}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-lg leading-none">{tool.label}</h3>
                    {tool.isHot && <span className="text-[10px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse"><Zap size={10} fill="white" /> HOT</span>}
                    {tool.isNew && <span className="text-[10px] bg-yellow-500 text-white font-black px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">NEW</span>}
                  </div>
                  <p className="text-sm opacity-80 italic line-clamp-1">{tool.description}</p>
                </div>
                <MoveRight className="ml-auto w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          </Link>
        ))}
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
              <a href="/contact">Get Started</a>
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
              <a href="/contact">Get Started</a>
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
              From privacy protection to developer utilities, we&apos;ve got you covered!
            </p>
            {/* New Alert Text */}
            <div className="mt-6 inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
              ✨ We just added <strong>{newTool?.label}</strong> to our toolkit! Give it a try below.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {menuItems.tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className={cn(
                    "flex flex-col justify-between h-full p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full border-l-4 hover:scale-[1.02]",
                    tool.borderColor || "border-l-blue-500"
                  )}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={cn("p-3 rounded-full mb-4 bg-muted/50 border border-border/50", tool.colorClass?.replace('text-', 'bg-').split(' ')[0])} style={{ backgroundColor: 'rgba(var(--primary), 0.05)' }}>
                      <Icon className={cn("w-8 h-8", tool.colorClass || "text-blue-600")} />
                    </div>
                    <CardTitle className={cn("text-lg sm:text-xl font-semibold mb-2 sm:mb-3", tool.colorClass || "text-blue-600")}>
                      {tool.label}
                    </CardTitle>
                    <span className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full mb-4",
                      tool.isNew ? "bg-yellow-600 text-white animate-pulse" : "bg-muted text-muted-foreground"
                    )}>
                      {tool.badgeText || (tool.category?.toUpperCase())}
                    </span>
                    <p className="text-center text-sm sm:text-base mb-4 flex-grow text-muted-foreground">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
                      {tool.features?.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted rounded text-muted-foreground whitespace-nowrap">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4" disabled={tool.isComingSoon}>
                    {tool.isComingSoon ? (
                      <span className="inline-flex items-center justify-center cursor-not-allowed opacity-50">
                        Coming Soon
                        <MoveRight className="ml-2" />
                      </span>
                    ) : (
                      <Link href={tool.url} className="inline-flex items-center justify-center">
                        Try {tool.label}
                        <MoveRight className="ml-2" />
                      </Link>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-base sm:text-lg mb-3 sm:mb-4">
              All our tools are free to use! We believe in making technology accessible to everyone.
              Have a suggestion for a new tool? Let us know!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="w-full sm:w-auto">
                <a href="/contact">Suggest a Tool</a>
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
