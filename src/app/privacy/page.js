"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className=" mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <div className="text-sm text-gray-500 mb-6">Effective Date: July 29, 2025<br/>Last Updated: July 29, 2025</div>
      <p className="mb-6">
        This Privacy Policy describes how <strong>One Day Developers</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects your information when you use our mobile application, <strong>OD2 Label Editor (Advanced)</strong>, and our website {" "}
        <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.od2.in</a>.
      </p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="mb-2">We design our app and website to respect your privacy. We do <strong>not collect any personally identifiable information</strong> unless explicitly provided by you for support or communication.</p>
      <h3 className="font-semibold mt-4 mb-1">Mobile App (OD2 Label Editor - Advanced)</h3>
      <p className="mb-2">We <strong>do not collect or store</strong>:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Personal data (name, email, phone number)</li>
        <li>Location data</li>
        <li>Media files (photos, videos)</li>
      </ul>
      <p className="mb-2">However, the app may request permissions to:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Access storage for saving and loading label templates (<code>.od2label</code> files)</li>
        <li>Connect to Bluetooth devices (for thermal printing)</li>
      </ul>
      <p className="mb-2">These permissions are used <strong>locally</strong> on your device and are <strong>not shared or transmitted</strong> to any server.</p>
      <h3 className="font-semibold mt-4 mb-1">
        Website (
        <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.od2.in</a>
        )
      </h3>
      <p className="mb-2">We may collect non-personal data such as:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Website analytics (via Google Analytics or similar)</li>
        <li>Contact form submissions (name, email, and message)</li>
      </ul>
      <p className="mb-2">This information is used solely to respond to inquiries and improve our services.</p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>Respond to support requests or feedback</li>
        <li>Analyze app and website usage (non-personal, aggregated data)</li>
        <li>Improve our app’s performance and user experience</li>
      </ul>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">3. Third-Party Services</h2>
      <p className="mb-2">Our website uses the following third-party services:</p>
      <ul className="list-disc ml-6 mb-2">
        <li><strong>Google Analytics</strong> to understand visitor behavior and improve our services</li>
        <li><strong>Google AdSense</strong> to display relevant advertisements to our visitors</li>
        <li><strong>Firebase Crashlytics</strong> (optional in future app versions) to monitor app stability</li>
      </ul>
      <p className="mb-2">These services collect <strong>anonymous usage data</strong> and may use cookies to provide personalized experiences.</p>
      
      <h3 className="font-semibold mt-4 mb-2">Google AdSense</h3>
      <p className="mb-2">
        We use Google AdSense to serve advertisements on our website. Google AdSense may collect and use 
        information about your visits to this and other websites in order to provide advertisements about 
        goods and services of interest to you. You can opt out of personalized advertising by visiting 
        <a href="https://www.google.com/settings/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          Google&apos;s Ads Settings
        </a>.
      </p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
      <p className="mb-2">We take security seriously. All data used in the app is stored locally on your device unless explicitly shared by you.</p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">5. Children&apos;s Privacy</h2>
      <p className="mb-2">Our services are not intended for children under the age of 13. We do not knowingly collect personal data from children.</p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">6. Your Choices</h2>
      <ul className="list-disc ml-6 mb-2">
        <li>You can choose to decline app permissions. Some features (e.g., Bluetooth printing) may be limited without them.</li>
        <li>You can contact us at any time to delete or request any data you&apos;ve shared with us.</li>
      </ul>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
      <p className="mb-2">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
      <p className="mb-2">If you have any questions or concerns about this Privacy Policy, feel free to contact us:</p>
      <div className="mb-2">
        <strong>One Day Developers</strong><br />
        Email: <a href="mailto:dev@od2.in" className="text-blue-600 underline">dev@od2.in</a><br />
        Website: <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.od2.in</a>
      </div>
    </div>
  );
}
