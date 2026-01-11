import React from "react";

export default function Disclaimer() {
  return (
    <div className="mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-2">Disclaimer</h1>
      <div className="text-sm text-gray-500 mb-6">
        Effective Date: November 17, 2025<br />
        Last Updated: November 17, 2025
      </div>

      <p className="mb-6">
        The information contained on the{" "}
        <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          https://www.od2.in
        </a>{" "}
        website and any related services provided by <strong>One Day Developers (OD2)</strong>
        are subject to the following disclaimer of warranties and limitations of liability.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">1. Information Accuracy</h2>
      <p className="mb-4">
        While we strive to provide accurate and up-to-date information on our website, One Day Developers
        makes no representations or warranties of any kind, express or implied, about the completeness,
        accuracy, reliability, suitability, or availability of the information, products, services,
        or related graphics contained on the website for any purpose.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">2. Service Delivery Timeline</h2>
      <p className="mb-4">
        Our &quot;24-hour delivery&quot; claim is a goal and commitment we strive to achieve for most projects.
        However, actual delivery times may vary depending on project complexity, scope, client requirements,
        and unforeseen circumstances. The 24-hour timeline should be considered an estimate rather than a guarantee.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">3. Technical Information</h2>
      <p className="mb-4">
        Any technical information, code samples, tutorials, or guides provided on this website are for
        educational and informational purposes only. While we endeavor to keep the information accurate
        and current, we make no warranties about the suitability of this information for your specific use case.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">4. External Links</h2>
      <p className="mb-4">
        Our website may contain links to external websites that are not provided or maintained by or
        in any way affiliated with One Day Developers. Please note that we do not guarantee the accuracy,
        relevance, timeliness, or completeness of any information on these external websites.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">5. Software and Tools</h2>
      <p className="mb-4">
        Any software, tools, or applications developed or provided by One Day Developers are provided
        &quot;as is&quot; without warranty of any kind, either express or implied, including but not limited to
        the implied warranties of merchantability and fitness for a particular purpose.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
      <p className="mb-4">
        In no event will One Day Developers be liable for any loss or damage including without limitation,
        indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of
        data or profits arising out of, or in connection with, the use of this website or our services.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">7. Professional Advice</h2>
      <p className="mb-4">
        The information on this website does not constitute professional advice. You should consult with
        appropriate professionals for advice specific to your situation before making any important decisions
        based on the information provided on our website.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">8. Use at Your Own Risk</h2>
      <p className="mb-4">
        Any reliance you place on information from our website is strictly at your own risk. We disclaim
        all liability and responsibility arising from any reliance placed on such materials by you or any
        other visitor to our website, or by anyone who may be informed of any of its contents.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">9. Updates and Changes</h2>
      <p className="mb-4">
        We reserve the right to update, change, or replace any part of this disclaimer at any time without
        prior notice. Changes will be effective immediately upon posting on the website. Your continued use
        of the website following the posting of changes constitutes acceptance of those changes.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">10. Contact Information</h2>
      <p className="mb-4">
        If you have any questions about this disclaimer, please contact us:
      </p>

      <div className="mb-4">
        <strong>One Day Developers</strong><br />
        Email: <a href="mailto:dev@od2.in" className="text-blue-600 underline">dev@od2.in</a><br />
        Website: <a href="https://www.od2.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://www.od2.in</a>
      </div>

      <hr className="my-6" />

      <p className="text-sm text-gray-500">
        By using our website and services, you acknowledge that you have read and understood this disclaimer
        and agree to be bound by its terms.
      </p>
    </div>
  );
}