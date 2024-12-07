// pages/products.js
import Link from "next/link";

export default function Products() {
  return (
    <div className="bg-gradient-to-b ">
      <div className="text-center mb-10 p-6 bg-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-center bg-gray-700 mb-6">
          OD2 Products Showcase
        </h1>
        <p className="text-center text-grey-400 mb-3 text-lg">
          Discover our innovative and user-friendly products, each designed to
          enhance your experience. Click below to explore further!
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Temp Mail Beta */}
          <div className="bg-gray-600 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold bg-gray-900 mb-4 p-3 rounded-lg">
              Temp Mail Beta
            </h2>
            <p className="text-grey-400 mb-6">
              Generate disposable emails effortlessly. Protect your privacy
              while signing up for services or testing software.
            </p>
            <ul className="text-sm text-grey-400 mb-6 space-y-2">
              <li>• No signup required</li>
              <li>• Auto-deletion in 12 hours</li>
              <li>• Instant inbox access</li>
            </ul>
            <Link
              href="/tmail"
              className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Passport Size Printable Photo Maker */}
          <div className="bg-gray-600 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold bg-gray-900 mb-4 p-3 rounded-lg">
              Passport Size Printable Photo Maker
            </h2>
            <p className="text-grey-400 mb-6">
              Upload and generate 8 perfectly aligned passport-sized photos in
              seconds, optimized for 6x4-inch paper.
            </p>
            <ul className="text-sm text-grey-400 mb-6 space-y-2">
              <li>• Instant photo processing</li>
              <li>• Perfect dimensions</li>
              <li>• Affordable and accessible</li>
            </ul>
            <Link
              href="/photo"
              className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* OD2 Billing App */}
          <div className="bg-gray-600 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold bg-gray-900 mb-4 p-3 rounded-lg">
              OD2 Billing App
            </h2>
            <p className="text-grey-400 mb-6">
              A robust billing system built for performance and scalability,
              perfect for managing your business workflow.
            </p>
            <ul className="text-sm text-grey-400 mb-6 space-y-2">
              <li>• Highly customizable</li>
              <li>• Advanced querying capabilities</li>
              <li>• Multi-language support</li>
            </ul>
            <Link
              href="/products/od2bs"
              className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
