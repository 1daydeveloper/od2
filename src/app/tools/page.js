// pages/products.js
import Link from "next/link";

export default function Products() {
  return (
    <div className="maincard text-center p-6">
      <h1 className="text-4xl font-bold text-center mb-6">OD2 Tools</h1>
      <p className="text-center mb-3 text-lg">
        Discover our innovative and user-friendly products, each designed to
        enhance your experience. Click below to explore further!
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Temp Mail Beta */}
        {/* Passport Size Printable Photo Maker */}
        <div className="card">
          <h2 className="text-2xl font-semibold  mb-4 p-3 rounded-lg">
            Passport Size Printable Photo Maker
          </h2>
          <p className="text-grey-400 mb-6">
            Upload and generate 8 perfectly aligned passport-sized photos in
            seconds, optimized for 6x4-inch paper.
          </p>
          <ul className="text-sm text-grey-400 mb-6 space-y-2">
            <li>Instant photo processing</li>
            <li>Perfect dimensions</li>
            <li>Affordable and accessible</li>
          </ul>
          <Link
            href="/passport-photo-printing"
            className="abtn inline-block atbn"
          >
            Try Now
          </Link>
        </div>

        <div className="card">
        <h2 className="text-2xl font-semibold mb-4 p-3 rounded-lg">
          Convert Images to Base64
        </h2>
        <p className=" mb-6">
          Quickly convert images into Base64 Data URLs for embedding in web
          pages, CSS, or JavaScript.
        </p>
        <ul className="text-sm  mb-6 space-y-2">
          <li>🚀 Faster loading – Reduces HTTP requests</li>
          <li>📂 Offline support – No external hosting needed</li>
          <li>🔒 Improved security – Prevents image hotlinking</li>
        </ul>
        <Link href="/convert-image-to-blob" className="abtn inline-block atbn">
          Try Now
        </Link>
      </div>
      </div>
   
    </div>
  );
}
