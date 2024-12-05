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
        Passport Size Printable Photo nmaker(6*4)
      </h1>

      <div className="flex flex-row flex-wrap mt-5 gap-4">
        <div className="flex flex-col gap-4 items-center w-full lg:w-1/3">
          <div className="items-center flex justify-center gap-2 text-slate-800 font-extrabold rounded-md p-4 bg-white w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>

            <h3 className="text-2xl">Upload Photo</h3>
          </div>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col w-full items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col  items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
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
            className=""
          />
          {uploadError && (
            <div className="text-red-500 mb-4">{uploadError}</div>
          )}
          {image && (
            <>
              <button
                onClick={GeneratePrintableImage}
                className="bg-yellow-600 justify-center flex gap-1 text-black font-extrabold p-3 w-full  rounded-md"
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
                <>
                  <button
                    onClick={downloadCanvasAsPNG}
                    className="bg-blue-500 hover:bg-blue-700bg-yellow-600 justify-center flex gap-1 w-full text-black font-extrabold p-3  rounded-md"
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
                </>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col w-full gap-4 lg:w-7/12">
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
          {image && (
            <>
              {canvasd && (
                <>
                  {" "}
                  <img
                    src={canvasd}
                    alt="Passport Size Image"
                    className="w-full"
                    priority
                  />
                  <button
                    onClick={downloadCanvasAsPNG}
                    className="bg-blue-500 hover:bg-blue-700bg-yellow-600 justify-center flex gap-1 text-black font-extrabold p-3  rounded-md"
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
                    Download
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
