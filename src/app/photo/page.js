"use client";
import { useState } from "react";

export default function Photo() {
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [canvasd, setCanvasd] = useState(null);

  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    if (uploadedImage.size > 1024 * 1024 * 5) {
      // 5 MB
      setUploadError("Image size exceeds 5MB");
      return;
    }
    setUploadError(null);
    setImage(uploadedImage);
  };

  const GeneratePrintableImage = () => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      processImage(e.target.result);
    };
    reader.readAsDataURL(image);
  };

  const processImage = (imageDataURL) => {
    // Updated paper size to 10x6 inches
    const paperWidth = 6 * 96; // 10 inches * 96 DPI
    const paperHeight = 4 * 96; // 6 inches * 96 DPI
    const photosPerRow = 4; // Assuming 2 photos per row
    const photosPerColumn = 2; // Assuming 4 rows of photos
    const photoWidth = 140; // Photo width
    const photoHeight = 170; // Photo height
    const margin = 3; // in pixels
    const photoPadding = 5; // Padding around the photo (within its slot)

    const canvas = document.createElement("canvas");
    canvas.width = paperWidth;
    canvas.height = paperHeight;
    const ctx = canvas.getContext("2d");

    // Draw white background for the paper
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, paperWidth, paperHeight);

    const img = new Image();
    img.onload = () => {
      for (let i = 0; i < photosPerRow * photosPerColumn; i++) {
        const x = (i % photosPerRow) * (photoWidth + margin);
        const y = Math.floor(i / photosPerRow) * (photoHeight + margin);

        // Draw white background for each photo slot
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, photoWidth, photoHeight);

        // Scale the image to fit within the photo area, maintaining aspect ratio
        const scale = Math.min(
          (photoWidth - 1 * photoPadding) / img.width,
          (photoHeight - 1 * photoPadding) / img.height
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = x + (photoWidth - scaledWidth) / 2 + photoPadding;
        const offsetY = y + (photoHeight - scaledHeight) / 2 + photoPadding;
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
      }
      setCanvasd(canvas.toDataURL("image/png"));
    };
    img.src = imageDataURL;
  };

  const downloadCanvasAsPNG = () => {
    const link = document.createElement("a");
    link.download = "passport_photos.png";
    link.href = canvasd;
    link.click();
    link.remove();
  };

  return (
    <>
      <h1 className="font-extrabold text-2xl">
        Passport Size Printable Photo Maker(6*4)
      </h1>

      <div className="flex flex-row flex-wrap mt-5 gap-4">
        <div className="flex flex-col gap-4 p-4 items-center w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-1/3">
          <div className="items-center flex justify-center gap-2 text-slate-800 font-extrabold rounded-md p-4 bg-white w-full text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>
            <h3 className="text-xl">Upload Photo Below</h3>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col w-full items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-center"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </label>
          </div>
          <input
            id="dropzone-file"
            onChange={handleImageChange}
            accept="image/*"
            type="file"
            className="w-full "
          />
          {uploadError && (
            <div className="text-red-500 mb-4 text-center">{uploadError}</div>
          )}
          {image && (
            <>
              <button
                onClick={GeneratePrintableImage}
                className="bg-yellow-600 justify-center flex gap-1 text-black font-extrabold p-3 w-full rounded-md mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                    clipRule="evenodd"
                  />
                </svg>
                Generate Photo
              </button>
              {canvasd && (
                <button
                  onClick={downloadCanvasAsPNG}
                  className="bg-blue-500 hover:bg-blue-700 justify-center flex gap-1 w-full text-black font-extrabold p-3 rounded-md mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download PNG
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col w-full gap-4 lg:w-7/12 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="items-center flex justify-center gap-2 text-slate-800 font-extrabold rounded-md p-4 bg-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z"
                clipRule="evenodd"
              />
            </svg>

            <h3 className="text-2xl">Photo Preview</h3>
          </div>
          {image && canvasd ? (
            <>
              <img
                src={canvasd}
                alt="Passport Size Image"
                className="w-full"
                priority
              />
              <button
                onClick={downloadCanvasAsPNG}
                className="bg-blue-500 hover:bg-blue-700 justify-center flex gap-1 text-black font-extrabold p-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Download
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow">
              <svg
                className="w-12 h-12 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 16.5V4.75A2.25 2.25 0 016.25 2.5h11.5A2.25 2.25 0 0120 4.75V16.5M2 20.25h20M12 6.75v6M8.25 12.75l3.75-3.75 3.75 3.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                No Preview Available
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To view a preview, please follow these steps:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                <li>Upload the Photo in Upload Area.</li>
                <li>Choose an image file (JPG or PNG).</li>
                <li>Make sure the file size is within 5MB.</li>
                <li>
                  Then Click Generate Photo Button to generat the Printable
                  Photo.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {" "}
        <section className="text-white">
          {" "}
          <div className="container mx-auto px-4 lg:px-8 mb-2">
            {" "}
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
              {" "}
              Create Printable Passport Photos Instantly with OD2{" "}
            </h2>{" "}
            <p className="text-lg text-center mb-8">
              {" "}
              Upload a passport-sized photo and receive a printable PNG file
              with 8 perfectly aligned photos ready for 6x4-inch paper printing
              — delivered in seconds!{" "}
            </p>{" "}
            <div className="grid gap-8 lg:grid-cols-2">
              {" "}
              <div className="mb-3">
                {" "}
                <h2 className="text-2xl font-semibold mb-4">
                  {" "}
                  Why Choose OD2 Passport Photo Generator?{" "}
                </h2>{" "}
                <ul className="list-disc pl-5 space-y-2">
                  {" "}
                  <li>
                    {" "}
                    <strong>Instant Photo Processing:</strong> Generate a
                    high-quality printable PNG with 8 passport-sized photos in
                    just seconds.{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong>Perfect Dimensions:</strong> Optimized for 6x4-inch
                    paper, ensuring professional-quality results.{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong>Hassle-Free Experience:</strong> No complicated
                    tools or editing skills required. Upload, process, and
                    print.{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong>Affordable & Accessible:</strong> Save time and
                    money by avoiding costly photo studios.{" "}
                  </li>{" "}
                </ul>{" "}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Ideal For:</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Visa and Passport Applications:</strong> Get
                    perfectly aligned photos that meet official requirements.
                  </li>
                  <li>
                    <strong>School or Job Submissions:</strong> Easily generate
                    and print passport photos for any formal submission.
                  </li>
                  <li>
                    <strong>Frequent Travelers:</strong> Quickly create passport
                    photos without visiting a studio.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-3">
              <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                Features of Our Passport Photo Tool
              </h1>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Precision:</strong> Perfect alignment and size for
                  every photo.
                </li>
                <li>
                  <strong>Downloadable PNG:</strong> Receive a single file ready
                  for printing.
                </li>
                <li>
                  <strong>Ease of Use:</strong> A clean, user-friendly interface
                  for all users.
                </li>
              </ul>
            </div>
            <div>
              <section className="bg-black shadow-lg rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold">Try It Now</h2>
                <p className="mt-4">
                  Save time and effort! Use our passport photo generator today
                  for a quick, professional, and hassle-free solution.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Generate Printable Passport Photos
                </a>
              </section>

              <section className="shadow-lg rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold">How It Works</h2>
                <ol className="list-decimal list-inside mt-4 space-y-2">
                  <li>Upload your passport-size photo.</li>
                  <li>Review the layout for a 6x4-inch printable PNG.</li>
                  <li>Download your file instantly.</li>
                  <li>Print your file on a 6x4-inch paper, ready to use.</li>
                </ol>
              </section>

              <section className="shadow-lg rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold">
                  FAQs About Our Passport Photo Tool
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-bold">What is the output format?</h3>
                    <p>
                      You will receive a PNG file containing 8 passport-sized
                      photos perfectly aligned for 6x4-inch printing.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold">
                      How quickly can I generate the file?
                    </h3>
                    <p>
                      The process takes just seconds after uploading your photo.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold">Is this tool free to use?</h3>
                    <p>Yes, our tool is free to use.</p>
                  </div>
                </div>
              </section>

              <div className="shadow-lg bg-black rounded-lg p-6 mt-8 text-white text-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Ready to Simplify Your Passport Photo Needs?
                </h3>
                <p className="text-lg mb-6">
                  Start using OD2 Passport Photo Generator today for a fast and
                  professional solution at your fingertips.
                </p>
                <a
                  href="#"
                  className="inline-block px-6 py-3 text-lg font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-800 focus:ring focus:ring-blue-300"
                >
                  Generate Your Printable Photos Now
                </a>
              </div>
            </div>
          </div>
        </section>{" "}
      </div>
    </>
  );
}
