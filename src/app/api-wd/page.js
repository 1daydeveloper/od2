"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";

export default function APIWDPage() {
  // Track page view on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'API Workflow Designer',
        page_location: window.location.href,
        event_category: 'api_workflow_designer',
        event_label: 'main_page_loaded'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Links */}


      <WorkflowBuilder />

      {/* SEO Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Visual API Workflow Designer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Design, visualize, and prototype your API workflows with our intuitive drag-and-drop interface.
              Perfect for developers, architects, and product managers who need to map out complex logic flows
              without writing a single line of code.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Features</h3>
              <ul className="space-y-3">
                {[
                  "Drag-and-drop interface for easy workflow creation",
                  "Real-time visualization of API logic and data flow",
                  "Support for various node types (HTTP requests, Conditions, Loops)",
                  "Export workflows to JSON for easy sharing and backup",
                  "Dark mode support for comfortable late-night coding"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <svg className="w-5 h-5 text-green-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: "Is this tool free to use?",
                  a: "Yes, the API Workflow Designer is completely free to use. You can create unlimited workflows without any cost."
                },
                {
                  q: "Do I need to sign up?",
                  a: "No account is required. You can start designing immediately. Your work is saved locally in your browser."
                },
                {
                  q: "Can I export my designs?",
                  a: "Absolutely! You can export your workflows as JSON files to save them or share them with your team."
                },
                {
                  q: "What is an API Workflow?",
                  a: "An API workflow represents the sequence of steps an API takes to process a request. Visualizing this helps in understanding logic, debugging issues, and communicating designs to stakeholders."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{faq.q}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional SEO Text */}
        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Why Use a Visual API Designer?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Modern application development often involves complex logic that can be hard to visualize in code alone.
            Our <strong>API Workflow Designer</strong> bridges the gap between abstract logic and concrete implementation.
            By providing a visual canvas, we help teams align on requirements, identify potential bottlenecks early,
            and document their architecture effectively.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you are building microservices, designing serverless functions, or just planning a simple REST API,
            having a visual reference is invaluable. This tool runs entirely in your browser, ensuring your data remains
            private and secure while giving you the performance of a native application.
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
