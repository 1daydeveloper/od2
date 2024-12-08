// pages/index.js or any other relevant page in your Next.js project

import Head from "next/head";

export default function BillingSystem() {
  return (
    <div>
      <main className="container mx-auto">
        <section className="text-center mb-10 p-6 bg-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
          <h2 className="text-4xl font-bold ">Welcome to OD2 Billing System</h2>
          <p className="text-lg mt-4 text-gray-400">
            An advanced, flexible, and secure billing solution for businesses of
            all sizes. Built with web technologies and Bootstrap CSS for optimal
            performance.
          </p>
        </section>

        <section id="features" className="mb-10">
          <h3 className="text-3xl font-bold text-center  mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold ">Multi-Platform Support</h4>
              <p className="mt-4 text-gray-400">
                Access and manage your billing system on multiple platforms,
                whether locally or through the internet.
              </p>
            </div>
            <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold ">Customizable Workflows</h4>
              <p className="mt-4 text-gray-400">
                Easily customize your billing processes with flexible workflows
                to meet your specific needs.
              </p>
            </div>
            <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold ">
                Advanced Database Management
              </h4>
              <p className="mt-4 text-gray-400">
                Leverage powerful database mechanisms and advanced querying
                capabilities to manage large datasets efficiently.
              </p>
            </div>
            <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold ">
                Security & Authentication
              </h4>
              <p className="mt-4 text-gray-400">
                Secure your billing data with authentication-based access,
                ensuring only authorized users can make changes.
              </p>
            </div>
            <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold ">Multi-Lingual Support</h4>
              <p className="mt-4 text-gray-400">
                Our system supports multiple languages, making it easier to
                serve clients worldwide.
              </p>
            </div>
            <div className="bg-gray-700 shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold ">5-Year Premium Policy</h4>
              <p className="mt-4 text-gray-400">
                Benefit from a premium 5-year policy with no yearly renewals.
                Get continuous updates and support.
              </p>
            </div>
          </div>
        </section>

        <section id="why-choose" className="bg-gray-700  py-12 mb-10">
          <h3 className="text-3xl font-bold text-center  mb-6">
            Why Choose OD2 Billing System?
          </h3>
          <ul className="space-y-4 text-lg text-gray-400  max-w-4xl m-5">
            <li class="flex items-center  space-x-3 rtl:space-x-reverse">
              <svg
                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>
                Built for performance and scalability with HTML and Bootstap
                CSS.
              </span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>
                Highly customizable, flexible workflows to suit any business
                requirement.
              </span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>
                Advanced querying capabilities to manage and analyze your
                billing data effectively.
              </span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>
                Comprehensive security with authentication-based access to
                ensure your data is always safe.
              </span>
            </li>
            <li class="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>
                Support for multi-language and multi-platform use, so you can
                reach a global audience.
              </span>
            </li>
          </ul>
        </section>
        <section id="tools-technologies" class="py-12">
          <h3 class="text-3xl font-bold text-center  mb-6">
            Explore More Tools & Technologies
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <a
              href="https://nextjs.org/"
              target="_blank"
              class="inline-flex items-center justify-between p-5 text-base font-medium text-gray-400 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gry-900 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <div class="flex items-center ">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 me-3"
                  viewBox="0 0 22 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.50085 30.1242C8.53625 30.1242 10.9998 27.8749 10.9998 25.1035V20.0828H5.50085C2.46546 20.0828 0.00195312 22.332 0.00195312 25.1035C0.00195312 27.8749 2.46546 30.1242 5.50085 30.1242Z"
                    fill="#0ACF83"
                  />
                </svg>
                <span class="w-full">
                  Get started with <strong>Next.js</strong>
                </span>
              </div>
              <svg
                class="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>

            <a
              href="https://tailwindcss.com/"
              target="_blank"
              class="inline-flex items-center justify-between p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <div class="flex items-center">
                <svg
                  className="w-6 h-6 me-3 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z" />
                </svg>

                <span class="w-full">
                  Start with <strong>Tailwind CSS</strong> for your styles
                </span>
              </div>
              <svg
                class="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>

            <a
              href="https://auth0.com/"
              target="_blank"
              class="inline-flex items-center justify-between p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <div class="flex items-center">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 me-3"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.01 11c0-2.76 2.24-5 5-5h12c2.76 0 5 2.24 5 5s-2.24 5-5 5H5c-2.76 0-5-2.24-5-5z"
                    fill="#0ACF83"
                  />
                </svg>
                <span class="w-full">
                  Secure your app with <strong>Auth0</strong>
                </span>
              </div>
              <svg
                class="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>

            <a
              href="https://www.mongodb.com/"
              target="_blank"
              class="inline-flex items-center justify-between p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <div class="flex items-center">
                <svg
                  className="w-6 h-6 me-3 text-gray-800 dark:text-white"
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
                    d="M7.29395 11.8039c0-3.96638 2.13959-6.41723 3.53335-8.01378.6733-.7712 1.1725-1.34306 1.1725-1.79012 0 .44706.4993 1.01892 1.1725 1.79013 1.3938 1.59654 3.5334 4.04739 3.5334 8.01377 0 4.3266-2.7501 6.9507-4.0764 7.7654L12.3701 22h-.7071l-.2906-2.4295c-1.3255-.8132-4.07845-3.4378-4.07845-7.7666Zm4.06395 6.7007.6419-9.44578.649 9.44578-.649.7503-.6419-.7503Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span class="w-full">
                  Learn <strong>MongoDB</strong> for database management
                </span>
              </div>
              <svg
                class="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>

            <a
              href="https://vercel.com/"
              target="_blank"
              class="inline-flex items-center justify-between p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 me-3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span class="w-full">
                  Deploy with <strong>Vercel</strong>
                </span>
              </div>
              <svg
                class="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
