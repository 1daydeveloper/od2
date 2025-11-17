import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Globe, Users, Calendar, Award, Target } from "lucide-react";

export const metadata = {
  title: "About Our Company | OD2 - One Day Developers",
  description: "Learn about One Day Developers (OD2) - our team, mission, values, and commitment to delivering quality software solutions within 24 hours.",
  keywords: "about OD2, One Day Developers team, company information, software development company, rapid development",
  openGraph: {
    title: "About Our Company | OD2 - One Day Developers",
    description: "Learn about One Day Developers (OD2) - our team, mission, values, and commitment to delivering quality software solutions within 24 hours.",
    url: "https://www.od2.in/about/company",
    type: "website",
  },
  canonical: "https://www.od2.in/about/company",
};

export default function CompanyInfo() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">About One Day Developers (OD2)</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Revolutionizing software development with speed, quality, and innovation
          </p>
        </div>

        {/* Company Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Company Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                One Day Developers (OD2) is a pioneering software development company established with a revolutionary mission: 
                to deliver high-quality software solutions within 24 hours. Founded by passionate developers who understand 
                the critical importance of time-to-market in today&apos;s fast-paced business environment, we&apos;ve built a reputation 
                for excellence, speed, and reliability.
              </p>
              <p className="leading-relaxed">
                Our company specializes in rapid application development, emergency technical solutions, MVP creation, 
                and comprehensive software consulting. We serve businesses of all sizes, from startups needing quick 
                prototypes to established enterprises requiring urgent technical solutions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                Established
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2024</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Founded with a vision to transform software development timelines
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5" />
                Team Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">10+ Experts</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Skilled developers, designers, and technical consultants
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">India</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Serving clients globally with remote-first approach
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Mission */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              Our Mission & Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Mission</h3>
                <p className="leading-relaxed">
                  To revolutionize software development by delivering exceptional, custom solutions within 24 hours, 
                  empowering businesses to achieve their goals faster without compromising on quality, security, or scalability.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Vision</h3>
                <p className="leading-relaxed">
                  To become the global leader in rapid software development, setting new standards for speed and quality 
                  in the tech industry while fostering long-term partnerships with our clients.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Values */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6" />
              Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">Speed & Efficiency</h4>
                  <p className="text-sm">
                    We deliver quality solutions within 24 hours through optimized processes and agile methodologies.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400">Quality First</h4>
                  <p className="text-sm">
                    Every solution undergoes rigorous testing and quality assurance to ensure excellence.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">Innovation</h4>
                  <p className="text-sm">
                    We leverage cutting-edge technologies and innovative approaches to solve complex problems.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400">Client-Centric</h4>
                  <p className="text-sm">
                    Our clients&apos; success is our priority, and we tailor solutions to meet their specific needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400">Transparency</h4>
                  <p className="text-sm">
                    We maintain open communication and provide clear project timelines and deliverables.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">Continuous Learning</h4>
                  <p className="text-sm">
                    We stay updated with the latest technologies and best practices in software development.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Sets Us Apart */}
        <Card>
          <CardHeader>
            <CardTitle>What Sets Us Apart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span><strong>24-Hour Delivery:</strong> Unique capability to deliver complete solutions within one day</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span><strong>Full-Stack Expertise:</strong> Comprehensive knowledge across web, mobile, and desktop platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span><strong>Modern Tech Stack:</strong> Expertise in React, Next.js, Node.js, Python, and cloud technologies</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span><strong>Agile Methodology:</strong> Streamlined processes for rapid development cycles</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span><strong>24/7 Support:</strong> Round-the-clock availability for client support and emergency solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <span><strong>Scalable Solutions:</strong> Building applications that grow with your business</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}