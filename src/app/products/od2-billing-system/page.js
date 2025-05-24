import { CircleCheck, MoveRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BillingSystem() {
  // Tools & Technologies data array
  const tools = [
    {
      href: "https://nextjs.org/",
      label: (
        <>
          Get started with <strong>Next.js</strong>
        </>
      ),
    },
    {
      href: "https://tailwindcss.com/",
      label: (
        <>
          Start with <strong>Tailwind CSS</strong> for your styles
        </>
      ),
    },
    {
      href: "https://auth0.com/",
      label: (
        <>
          Secure your app with <strong>Auth0</strong>
        </>
      ),
    },
    {
      href: "https://www.mongodb.com/",
      label: (
        <>
          Learn <strong>MongoDB</strong> for database management
        </>
      ),
    },
    {
      href: "https://vercel.com/",
      label: (
        <>
          Deploy with <strong>Vercel</strong>
        </>
      ),
    },
  ];

  return (
    <div>
      <main className="container mx-auto">
        <Card className="text-center mb-10 p-6 rounded-lg shadow">
          <CardHeader>
            <CardTitle>Welcome to OD2 Billing System</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              An advanced, flexible, and secure billing solution for businesses
              of all sizes. Built with web technologies and Bootstrap CSS for
              optimal performance.
            </CardDescription>
          </CardContent>
        </Card>

        <section id="features" className="mb-10">
          <h3 className="text-3xl font-bold text-center mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-md rounded-lg p-6 text-center h-56 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Multi-Platform Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access and manage your billing system on multiple platforms,
                  whether locally or through the internet.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg p-6 text-center h-56 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Customizable Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easily customize your billing processes with flexible
                  workflows to meet your specific needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg p-6 text-center h-56 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Advanced Database Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Leverage powerful database mechanisms and advanced querying
                  capabilities to manage large datasets efficiently.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg p-6 text-center h-56 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Security & Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure your billing data with authentication-based access,
                  ensuring only authorized users can make changes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg p-6 text-center h-56 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Multi-Lingual Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our system supports multiple languages, making it easier to
                  serve clients worldwide.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-md rounded-lg p-6 text-center h-56 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  5-Year Premium Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Benefit from a premium 5-year policy with no yearly renewals.
                  Get continuous updates and support.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card id="why-choose" className="py-12 mb-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-6">
              Why Choose OD2 Billing System?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-lg max-w-4xl m-5">
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <CircleCheck className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>
                  Built for performance and scalability with HTML and Bootstap
                  CSS.
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <CircleCheck className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>
                  Highly customizable, flexible workflows to suit any business
                  requirement.
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <CircleCheck className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>
                  Advanced querying capabilities to manage and analyze your
                  billing data effectively.
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <CircleCheck className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>
                  Comprehensive security with authentication-based access to
                  ensure your data is always safe.
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <CircleCheck className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span>
                  Support for multi-language and multi-platform use, so you can
                  reach a global audience.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <section id="tools-technologies" className="py-12">
          <h3 className="text-3xl font-bold text-center mb-6">
            Explore More Tools & Technologies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                role="link"
                className="focus:outline-none"
              >
                <Card className="inline-flex items-center justify-between p-5 text-base font-medium rounded-lg cursor-pointer hover:bg-muted transition h-40 w-full">
                  <CardContent className="flex items-center justify-between w-full p-0">
                    <div className="flex items-center">
                      <span>{tool.label}</span>
                    </div>

                    {/* Right side content */}
                    <div>
                      {/* You can place any element here you want to push to the right */}
                      <span className="text-sm text-gray-400">
                        <MoveRight  />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
