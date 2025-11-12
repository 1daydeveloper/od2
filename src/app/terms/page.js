"use client";
import React from "react";

export default function TermsOfService() {


  return (
    <div className="mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <div className="text-sm text-gray-500 mb-6">
        Effective Date: November 12, 2025<br />
        Last Updated: November 12, 2025
      </div>
      
      <p className="mb-6">
        Welcome to <strong>One Day Developers (OD2)</strong>. These Terms of Service (&quot;Terms&quot;) 
        govern your use of our website{" "}
        <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          https://www.od2.in
        </a>{" "}
        (&quot;Service&quot;) operated by One Day Developers (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using this website, you accept and agree to be bound by the terms and 
        provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
      <p className="mb-4">
        One Day Developers provides software development services, technical consulting, 
        and digital solutions. Our services include but are not limited to:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Custom software development</li>
        <li>Web application development</li>
        <li>Mobile application development</li>
        <li>API development and integration</li>
        <li>Technical consulting and support</li>
        <li>Digital tools and utilities</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
      <p className="mb-2">By using our service, you agree to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide accurate and complete information when requested</li>
        <li>Use the service only for lawful purposes</li>
        <li>Not interfere with or disrupt the service or servers</li>
        <li>Not attempt to gain unauthorized access to any portion of the service</li>
        <li>Respect intellectual property rights</li>
        <li>Not engage in any activity that could harm our reputation or business</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">4. Intellectual Property Rights</h2>
      <p className="mb-4">
        The service and its original content, features, and functionality are and will remain 
        the exclusive property of One Day Developers and its licensors. The service is protected 
        by copyright, trademark, and other laws. Our trademarks and trade dress may not be used 
        in connection with any product or service without our prior written consent.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">5. Privacy Policy</h2>
      <p className="mb-4">
        Your privacy is important to us. Please review our Privacy Policy, which also governs 
        your use of the Service, to understand our practices. Our Privacy Policy can be found at{" "}
        <a href="/privacy" className="text-blue-600 underline">
          https://www.od2.in/privacy
        </a>
        .
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">6. Service Availability</h2>
      <p className="mb-4">
        We strive to provide uninterrupted service, but we do not guarantee that the service 
        will be available at all times. We may suspend or restrict access to some features 
        to registered or unregistered users at our discretion.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall One Day Developers, nor its directors, employees, partners, agents, 
        suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
        or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
        or other intangible losses, resulting from your use of the service.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">8. Disclaimer</h2>
      <p className="mb-4">
        The information on this website is provided on an &quot;as is&quot; basis. To the fullest 
        extent permitted by law, this Company excludes all representations, warranties, conditions, 
        and terms (whether express or implied by law) except those expressly set out in these Terms.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be interpreted and governed by the laws of India, without regard to its 
        conflict of law provisions. Our failure to enforce any right or provision of these Terms 
        will not be considered a waiver of those rights.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">10. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
        If a revision is material, we will try to provide at least 30 days notice prior to any new 
        terms taking effect.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">11. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your account and bar access to the service immediately, without 
        prior notice or liability, under our sole discretion, for any reason whatsoever and without 
        limitation, including but not limited to a breach of the Terms.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">12. Contact Information</h2>
      <p className="mb-2">
        If you have any questions about these Terms of Service, please contact us:
      </p>
      <div className="mb-4">
        <strong>One Day Developers</strong><br />
        Email: <a href="mailto:dev@od2.in" className="text-blue-600 underline">dev@od2.in</a><br />
        Website: <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.od2.in</a>
      </div>

      <hr className="my-6" />

      <p className="text-sm text-gray-500">
        By using our service, you acknowledge that you have read and understood these Terms of Service 
        and agree to be bound by them.
      </p>
    </div>
  );
}