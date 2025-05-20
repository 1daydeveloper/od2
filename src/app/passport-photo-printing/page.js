"use client";
import { Fish, Fullscreen, ImageDown, ImageUp, ShieldCheckIcon, Upload, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function Photo() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(""); // State to store file name
  const [uploadError, setUploadError] = useState(null);
  const [canvasd, setCanvasd] = useState(null);
  const [photoSettings, setPhotoSettings] = useState({
    DPI: 300,
    photoWidth: 420,
    photoHeight: 510,
    margin: 10,
    photoPadding: 15,
  });

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedImage = event.dataTransfer.files[0];
    if (droppedImage.size > 1024 * 1024 * 5) {
      setUploadError("Image size exceeds 5MB");
      return;
    }
    setUploadError(null);
    setImage(droppedImage);
    setImageName(droppedImage.name); // Set the file name
  };

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
    setImageName(uploadedImage.name); // Set the file nam\
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const GeneratePrintableImage = () => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      processImage(e.target.result);
    };
    reader.readAsDataURL(image);
    gtag("event", "button_click", {
      event_category: "engagement",
      event_label: "Generate_Passport_photo",
      value: 1,
    });
  };

  const handlePhotoSettingsChange = (DPI) => {
    if (DPI == 300) {
      setPhotoSettings({
        DPI: 300,
        photoWidth: 420,
        photoHeight: 510,
        margin: 10,
        photoPadding: 15,
      });
    } else {
      setPhotoSettings({
        DPI: 96,
        photoWidth: 140,
        photoHeight: 170,
        margin: 4,
        photoPadding: 5,
      });
    }
    gtag("event", "button_click", {
      event_category: "engagement",
      event_label: "Passport_photo_Quality_" + DPI,
      value: 1,
    });
  };
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  const processImage = (imageDataURL) => {
    // Increased DPI for better resolution
    const paperWidth = 6 * photoSettings.DPI; // 10 inches * 300 DPI
    const paperHeight = 4 * photoSettings.DPI; // 6 inches * 300 DPI
    const photosPerRow = 4; // Assuming 4 photos per row
    const photosPerColumn = 2; // Assuming 2 rows of photos
    const photoWidth = photoSettings.photoWidth; // Increased photo width for better quality (based on new DPI)
    const photoHeight = photoSettings.photoHeight; // Increased photo height for better quality
    const margin = photoSettings.margin; // in pixels
    const photoPadding = photoSettings.photoPadding; // Padding around the photo (within its slot)

    const canvas = document.createElement("canvas");
    canvas.width = paperWidth;
    canvas.height = paperHeight;
    const ctx = canvas.getContext("2d");

    // Set canvas image smoothing (anti-aliasing) for better image quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

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
          (photoWidth - 2 * photoPadding) / img.width,
          (photoHeight - 2 * photoPadding) / img.height
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const offsetX = x + (photoWidth - scaledWidth) / 2 + photoPadding;
        const offsetY = y + (photoHeight - scaledHeight) / 2 + photoPadding;
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
      }

      // Convert the canvas to a high-quality image using toBlob
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setCanvasd(url); // Use the Blob URL for the image source
      }, "image/png");
    };
    img.src = imageDataURL;
  };

  const downloadCanvasAsPNG = () => {
    const link = document.createElement("a");
    link.download = `OD2_passport_photo_${timestamp}.png`;
    link.href = canvasd;
    link.click();
    link.remove();
  };

  return (
    <>
      <h1 className="font-extrabold text-2xl">
        Passport Size Printable Photo Maker(6*4)
      </h1>

      <div className="maincard flex flex-row flex-wrap mt-5 gap-4">
        <div className="card flex flex-col gap-4 p-4 items-center w-full   rounded-lg shadow  lg:w-1/3">
         
          <div
            className="flex items-center justify-center w-full"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col w-full items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-center"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={48} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JPG or PNG (MAX. 5MB)
                </p>
              </div>
            </label>
          </div>
          <input
            id="dropzone-file"
            onChange={handleImageChange}
            accept="image/*"
            type="file"
            className="w-full hidden"
          />
          {image && imageName ? (
            <div className="flex flex-col sm:flex-row items-center mt-4">
              {/* Photo Preview */}
              {/* <div className="flex-shrink-0">
    <p className="text-sm text-gray-500">Preview:</p>
    <img
      src={URL.createObjectURL(image)}
      alt="Uploaded Preview"
      className="mt-2 rounded border"
      style={{
        width: photoSettings.photoWidth,
        height: photoSettings.photoHeight,
      }}
    />
  </div> */}

              {/* File Name */}
              <div className="mb-4 text-center text-green-600">
                <p className="text-sm ">
                  Uploaded File: <span className="text-white">{imageName}</span>
                </p>
              </div>
            </div>
          ) : (
            <h3 className="text-red-500 mb-4 text-center">
              No Passport Size Image Uploded{" "}
            </h3>
          )}
          {uploadError && (
            <div className="text-red-500 mb-4 text-center">{uploadError}</div>
          )}
          {image && (
            <>
            <p className="text-lg font-bold">DPI</p>
              <div className="flex flex-row gap-3 w-full ">
                
                <button
                  onClick={() => handlePhotoSettingsChange(96)}
                  className={` justify-center flex gap-1 text-black font-extrabold p-3 w-full ${
                    photoSettings.DPI == 300 ? `bg-yellow-600` : `bg-green-600`
                  } rounded-md `}
                >
                  <ShieldCheckIcon />
                  96
                </button>
                <button
                  onClick={() => handlePhotoSettingsChange(300)}
                  className={` justify-center flex gap-1 text-black font-extrabold p-3 w-full ${
                    photoSettings.DPI == 300 ? `bg-green-600` : `bg-yellow-600 `
                  } rounded-md `}
                >
                  <ShieldCheckIcon />
                  300
                </button>
              </div>
              <button
                onClick={GeneratePrintableImage}
                className="bg-yellow-600 justify-center flex gap-1 text-black font-extrabold p-3 w-full rounded-md"
              >
               <ImageUp />
                Generate Photo
              </button>
              {canvasd && (
                <button
                  onClick={downloadCanvasAsPNG}
                  className="bg-blue-500 hover:bg-blue-700 justify-center flex gap-1 w-full text-black font-extrabold p-3 rounded-md "
                >
                  <ImageDown />
                  Download PNG
                </button>
              )}
            </>
          )}
        </div>

        <div className="card flex flex-col w-full gap-4 lg:w-7/12 rounded-lg shadow  ">
          <div className="card items-center flex justify-center gap-2  font-extrabold rounded-md p-4  w-full">
            <Fullscreen />

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
                className="  justify-center flex gap-1 font-extrabold p-3 rounded-md"
              >
                <ImageDown />
                Download
              </button>
            </>
          ) : (
            <div className="card flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow">
              <Fish size={58}/>

              <h4 className="text-lg font-bold ">No Preview Available</h4>
              <p className="text-sm">
                To view a preview, please follow these steps:
              </p>
              <ul className="text-sm list-disc list-inside">
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
      <div className="maincard p-6 mt-4 bg-white rounded-lg shadow ">
        <section>
          <div className="container mx-auto px-4 lg:px-8 mb-2">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
              Create Printable Passport Photos Instantly with OD2
            </h2>
            <p className="text-lg text-center mb-8">
              Upload a passport-sized photo and receive a high-quality,
              printable PNG file with 8 perfectly aligned photos ready for
              6x4-inch photo paper printing — fast and easy!
            </p>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="mb-3">
                <h2 className="text-2xl font-semibold mb-4">
                  Why Choose OD2 Passport Photo Generator?
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Instant Photo Processing:</strong> Generate a
                    high-resolution PNG file with 8 passport-sized photos in
                    seconds.
                  </li>
                  <li>
                    <strong>Perfect Dimensions:</strong> Optimized for 6x4-inch
                    photo paper, ensuring professional-quality results.
                  </li>
                  <li>
                    <strong>Hassle-Free Experience:</strong> No technical skills
                    required. Upload, crop, and print with ease.
                  </li>
                  <li>
                    <strong>Affordable & Accessible:</strong> Save money by
                    avoiding costly photo studios.
                  </li>
                  <li>
                    <strong>Meets Global Standards:</strong> Our tool complies
                    with official size requirements for passport and ID photos
                    worldwide.
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Ideal For:</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Visa and Passport Applications:</strong> Generate
                    perfectly aligned photos that meet official requirements.
                  </li>
                  <li>
                    <strong>School or Job Submissions:</strong> Easily create
                    and print passport photos for any formal use.
                  </li>
                  <li>
                    <strong>Frequent Travelers:</strong> Quickly create passport
                    photos without visiting a studio.
                  </li>
                  <li>
                    <strong>Digital Use:</strong> Use the generated PNG for
                    online applications or digital IDs.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-3">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                Features of Our Passport Photo Tool
              </h2>
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
                  designed for everyone.
                </li>
                <li>
                  <strong>Multiple Formats:</strong> Supports global photo size
                  standards like 2x2 inches and 35x45 mm.
                </li>
              </ul>
            </div>
            <div>
              <div className="card shadow-lg rounded-lg p-6 mt-8">
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
              </div>

              <div className="card p-6 mt-8">
                <h2 className="text-2xl font-bold">How It Works</h2>
                <ol className="list-decimal list-inside mt-4 space-y-2">
                  <li>Upload your passport-size photo.</li>
                  <li>Review the layout for a 6x4-inch printable PNG.</li>
                  <li>Download your file instantly.</li>
                  <li>
                    Print your file on a 6x4-inch photo paper, ready to use.
                  </li>
                </ol>
              </div>

              <div className="card p-6 mt-8">
                <h2 className="text-2xl font-bold">
                  Why Printable 6x4 Photo Paper?
                </h2>
                <p>
                  The 6x4 photo paper layout is perfect for maximizing
                  efficiency and saving costs. Each sheet can accommodate
                  multiple passport-size photos, making it ideal for personal,
                  family, or professional needs. Print your photos at home or a
                  local shop, and cut them effortlessly to the required size.
                </p>
              </div>

              <div className="card p-6 mt-8">
                <h2 className="text-2xl font-bold">
                  FAQs About Our Passport Photo Tool
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-bold">What is the output format?</h3>
                    <p>
                      You will receive a high-quality PNG file containing 8
                      passport-sized photos perfectly aligned for 6x4-inch
                      printing.
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
                    <p>Yes, our tool is completely free to use.</p>
                  </div>
                  <div>
                    <h3 className="font-bold">
                      Can I use the PNG for online applications?
                    </h3>
                    <p>
                      Yes, the generated PNG file is suitable for both printing
                      and digital use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6 mt-8 text-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  Ready to Simplify Your Passport Photo Needs?
                </h3>
                <p className="text-lg mb-6">
                  Start using OD2 Passport Photo Generator today for a fast and
                  professional solution at your fingertips.
                </p>
                <a
                  href="#"
                  className="abtn inline-block px-6 py-3 text-lg font-medium ounded-lg"
                >
                  Generate Your Printable Photos Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
