"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ImageToDataURL() {
  const [imageFile, setImageFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dataUrl).then(() => {
      toast.success("Data URL copied to clipboard!");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Image to Data URL Converter(Blob Converter)
      </h1>
      <div className=" p-6 shadow-md border rounded-lg">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block mb-4 w-full border border-gray-300 rounded-lg p-2"
        />
        {imageFile && (
          <div>
            <h2 className="font-semibold mb-2">Uploaded Image Preview:</h2>
            <img
              src={dataUrl}
              alt="Uploaded"
              className="w-full max-w-xs rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">Data URL:</h3>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={dataUrl}
                readOnly
                className="flex-grow border text-balck bg-transparent border-gray-300 rounded-lg p-2 mr-2"
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-500  px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
            <a
              href={dataUrl}
              download="converted-image.png"
              className="inline-block bg-blue-500  px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
      <div className="max-w-3xl mx-auto text-center pt-3">
        <p className="text-lg text-gray-300 mb-6">
          Convert images into Base64 Data URLs quickly and easily. This tool is perfect for embedding images directly into web pages, CSS, or JavaScript.  
        </p>

        {/* Call to Action */}
        <a href="https://www.od2.in/itbc" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg inline-block mb-6 transition">
          Try the Tool Now!
        </a>

        {/* Features Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Why Use This Tool?</h2>
          <ul className="text-left text-gray-300 list-disc pl-6 space-y-2">
            <li>🚀 <strong>Faster Loading</strong> – Reduces HTTP requests.</li>
            <li>📂 <strong>Offline Support</strong> – No external image hosting needed.</li>
            <li>🔒 <strong>Improved Security</strong> – Prevents image hotlinking.</li>
            <li>📧 <strong>Ideal for Emails</strong> – Keeps images visible in email templates.</li>
            <li>🛠️ <strong>Free & Easy</strong> – No sign-up required, just upload and convert.</li>
          </ul>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">How to Convert an Image?</h2>
          <ol className="text-left text-gray-300 list-decimal pl-6 space-y-2">
            <li>📤 <strong>Upload</strong> an image (JPG, PNG, GIF, SVG, etc.).</li>
            <li>⚡ The tool will **automatically convert** it to a **Base64 Data URL**.</li>
            <li>📋 <strong>Copy or Download</strong> the generated Data URL for your project.</li>
          </ol>
        </div>

        {/* Use Cases */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Where Can You Use Data URLs?</h2>
          <ul className="text-left text-gray-300 list-disc pl-6 space-y-2">
            <li>💻 <strong>Web Development</strong> – Embed images in HTML, CSS, or JavaScript.</li>
            <li>📧 <strong>Email Templates</strong> – Prevents broken images in newsletters.</li>
            <li>📊 <strong>Data Storage</strong> – Store small images in JSON or databases.</li>
            <li>🔐 <strong>Privacy & Security</strong> – No external hosting required.</li>
          </ul>
        </div>

        {/* External Link & Final CTA */}
        <div className="bg-blue-600 p-4 rounded-lg shadow-md text-xl font-semibold">
          Start Converting Your Images Instantly!  
          <a href="https://www.od2.in/itbc" className="underline ml-2">Click Here to Use the Tool</a>
        </div>
      </div>
    </div>
  );
}
