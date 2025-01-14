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
    </div>
  );
}
