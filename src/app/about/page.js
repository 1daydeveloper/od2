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
                  <p className="text-lg mb-4 leading-relaxed">
                    Founded with the vision of revolutionizing software development 
                    timelines, we specialize in rapid prototyping, MVP development, 
                    and emergency technical solutions. Our team comprises experienced 
                    developers, designers, and technical consultants who understand 
                    the critical importance of time-to-market in today&apos;s competitive landscape.
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
        
        {/* Our Values Section */}
        <Card className="py-5 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-6">
              Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Speed & Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We deliver quality solutions within 24 hours without compromising 
                    on excellence. Our streamlined processes ensure rapid development cycles.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We embrace cutting-edge technologies and innovative approaches 
                    to solve complex problems and create exceptional user experiences.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your success is our priority. We work closely with clients to 
                    understand their needs and deliver solutions that exceed expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Our Expertise Section */}
        <Card className="py-5 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-6">
              Our Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Development Services</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Full-Stack Web Development</li>
                  <li>• Mobile Application Development</li>
                  <li>• Desktop Application Development</li>
                  <li>• API Development & Integration</li>
                  <li>• E-commerce Solutions</li>
                  <li>• Custom Software Development</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Consulting</h3>
                <ul className="space-y-2 text-sm">
                  <li>• System Architecture Design</li>
                  <li>• Technology Stack Selection</li>
                  <li>• Performance Optimization</li>
                  <li>• Security Assessment</li>
                  <li>• Code Review & Quality Assurance</li>
                  <li>• Technical Documentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us Section */}
        <Card className="py-5 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-6">
              Why Choose One Day Developers?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">24hrs</div>
                <h3 className="font-semibold mb-2">Rapid Delivery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Most projects completed within 24 hours
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">5+</div>
                <h3 className="font-semibold mb-2">Years Experience</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Proven track record in software development
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rigorous testing and quality control
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2"> Dedicated</div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ongoing maintenance and support
                </p>
              </div>
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
