"use client";
import {
  Fish,
  Fullscreen,
  ImageDown,
  ImageUp,
  ShieldCheckIcon,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography";

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
    setImageName(uploadedImage.name); // Set the file name
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
      <TypographyH1>Passport Size Printable Photo Maker(6*4)</TypographyH1>
      <div className="maincard flex flex-row flex-wrap mt-5 gap-4">
        <Card className="flex flex-col gap-4 p-4 items-center w-full rounded-lg shadow lg:w-1/3">
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
                <TypographyP className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </TypographyP>
                <TypographyP className="text-xs text-gray-500 dark:text-gray-400">
                  JPG or PNG (MAX. 5MB)
                </TypographyP>
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
              <TypographyP className="mb-4 text-center text-green-600">
                Uploaded File: <span>{imageName}</span>
              </TypographyP>
            </div>
          ) : (
            <TypographyP className="text-red-500 mb-4 text-center">
              No Passport Size Image Uploded{" "}
            </TypographyP>
          )}
          {uploadError && (
            <TypographyP className="text-red-500 mb-4 text-center">{uploadError}</TypographyP>
          )}
          {image && (
            <>
              <TypographyP className="text-lg font-bold">DPI</TypographyP>
              <div className="flex flex-row gap-3 w-full ">
                <Button
                  variant={photoSettings.DPI === 300 ? "secondary" : "default"}
                  onClick={() => handlePhotoSettingsChange(96)}
                  className="justify-center flex gap-1 font-extrabold p-3 w-full"
                >
                  <ShieldCheckIcon />
                  96
                </Button>
                <Button
                  variant={photoSettings.DPI === 300 ? "default" : "secondary"}
                  onClick={() => handlePhotoSettingsChange(300)}
                  className="justify-center flex gap-1 font-extrabold p-3 w-full"
                >
                  <ShieldCheckIcon />
                  300
                </Button>
              </div>
              <Button
                onClick={GeneratePrintableImage}
                className="bg-yellow-600 justify-center flex gap-1 text-black font-extrabold p-3 w-full rounded-md"
              >
                <ImageUp />
                Generate Photo
              </Button>
              {canvasd && (
                <Button
                  onClick={downloadCanvasAsPNG}
                  className="bg-blue-500 hover:bg-blue-700 justify-center flex gap-1 w-full text-black font-extrabold p-3 rounded-md "
                >
                  <ImageDown />
                  Download PNG
                </Button>
              )}
            </>
          )}
        </Card>
        <Card className="flex flex-col w-full gap-4 lg:w-7/12 rounded-lg shadow">
          <CardHeader className="items-center flex justify-center gap-2 font-extrabold rounded-md p-4 w-full">
            <Fullscreen />
            <TypographyH2>Photo Preview</TypographyH2>
          </CardHeader>
          <CardContent>
            {image && canvasd ? (
              <>
                <img src={canvasd} alt="Passport Size Image" className="w-full" />
                <Button onClick={downloadCanvasAsPNG} className="justify-center flex gap-1 font-extrabold p-3 rounded-md">
                  <ImageDown />
                  Download
                </Button>
              </>
            ) : (
              <Card className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow">
                <Fish size={58} />
                <TypographyH2 className="text-lg font-bold">No Preview Available</TypographyH2>
                <TypographyP className="text-sm">
                  To view a preview, please follow these steps:
                </TypographyP>
                <ul className="text-sm list-disc list-inside">
                  <li>Upload the Photo in Upload Area.</li>
                  <li>Choose an image file (JPG or PNG).</li>
                  <li>Make sure the file size is within 5MB.</li>
                  <li>
                    Then Click Generate Photo Button to generat the Printable
                    Photo.
                  </li>
                </ul>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
