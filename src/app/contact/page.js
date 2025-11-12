"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const openTawkChat = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      // Track chat open event
      if (window.gtag) {
        window.gtag('event', 'chat_opened', {
          event_category: 'engagement',
          event_label: 'tawk_to_chat'
        });
      }
      window.Tawk_API.toggle();
    }
  };

  const trackEmailClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_click', {
        event_category: 'engagement',
        event_label: 'contact_email'
      });
    }
  };



  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get in touch with our team. We&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Google Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdZG_cOpBV-IhU9bRVtg9ndpIn4dOvKacIMn3pJrf5RvKnDSQ/viewform?embedded=true"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="w-full h-full"
                  title="Contact Form"
                >
                  Loading…
                </iframe>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Ready to start your project? Contact us today!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-blue-600 mt-1 cursor-pointer" />
                  <div>
                    <h3 className="font-semibold">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <button 
                        onClick={openTawkChat}
                        className="hover:text-blue-600 underline"
                      >
                        Start a live chat with us
                      </button>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a 
                        href="mailto:dev@od2.in" 
                        className="hover:text-blue-600"
                        onClick={trackEmailClick}
                      >
                        dev@od2.in
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Typically within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      India (Remote Services Worldwide)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose OD2?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>24-hour project delivery commitment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Expert team of developers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Quality-focused development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Competitive pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Ongoing support & maintenance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services We Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Custom Web Applications</li>
                  <li>• Mobile App Development</li>
                  <li>• API Development & Integration</li>
                  <li>• E-commerce Solutions</li>
                  <li>• Database Design & Management</li>
                  <li>• Cloud Deployment & DevOps</li>
                  <li>• Technical Consulting</li>
                  <li>• Maintenance & Support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}