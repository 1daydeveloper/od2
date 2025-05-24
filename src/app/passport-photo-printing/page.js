// Passport Photo Maker 4-step flow
'use client';
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Upload,
	ImageUp,
	ImageDown,
	ShieldCheckIcon,
	Fullscreen,
	Fish,
  ImagePlay,
  ImageUpscale
} from "lucide-react";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";

import PassportPhotoPrintingContent from "./content";

// Dynamically import react-easy-crop to avoid SSR issues
const Cropper = dynamic(() => import("react-easy-crop"), { ssr: false });

const countryOptions = [
  { label: "India (51x51 mm, 600x600 px, white background)", value: "india", size: [600, 600], aspect: 1 },
  { label: "UK (35x45 mm, 413x531 px, white/light grey background)", value: "uk", size: [413, 531], aspect: 413 / 531 },
  { label: "USA (2x2 in, 600x600 px, white background)", value: "usa", size: [600, 600], aspect: 1 },
  { label: "Australia (35x45 mm, 413x531 px, white background)", value: "australia", size: [413, 531], aspect: 413 / 531 },
];

export default function Photo() {
	const [image, setImage] = useState(null);
	const [imageName, setImageName] = useState("");
	const [uploadError, setUploadError] = useState("");
	const [photoSettings, setPhotoSettings] = useState({ DPI: 300 });
	const [country, setCountry] = useState("uk");
	const [showCropModal, setShowCropModal] = useState(false);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [croppedPhoto, setCroppedPhoto] = useState(null);
	const [stage, setStage] = useState(0); // 0: upload, 1: crop, 2: preview
	const [canvasd, setCanvasd] = useState(null);
	const canvasdRef = React.useRef(null);

	React.useEffect(() => {
		canvasdRef.current = canvasd;
	}, [canvasd]);

	// Placeholder handlers
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImageName(file.name);
			setUploadError("");
		}
	};

	const handleDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
			setImage(file);
			setImageName(file.name);
			setUploadError("");
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleCountryChange = (e) => {
		setCountry(e.target.value);
		setCroppedPhoto(null);
		setCanvasd(null); // Remove generated sheet
		setStage(0);
	};

	const handleOpenCrop = () => {
		setShowCropModal(true);
		setStage(1);
	};
	const handleCloseCrop = () => setShowCropModal(false);

	const handleCropComplete = (_, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleConfirmCrop = async () => {
		if (!image || !croppedAreaPixels) return;
		const croppedImg = await getCroppedImg(URL.createObjectURL(image), croppedAreaPixels);
		setCroppedPhoto(croppedImg);
		setCanvasd(null); // Remove generated sheet when cropping is updated
		setShowCropModal(false);
		setStage(2);
	};

	const handlePhotoSettingsChange = (dpi) => {
		setPhotoSettings({ DPI: dpi });
	};

	// Download handler for single and sheet
	const handleDownload = async (type) => {
		if (!croppedPhoto) return;
		const selected = countryOptions.find(opt => opt.value === country);
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		if (type === 'single') {
			// Download the cropped photo as per selected country
			const url = await resizeImageToSize(croppedPhoto, selected.size[0], selected.size[1]);
			triggerDownload(url, `OD2_Single_passport_photo_${timestamp}.jpg`);
		} else if (type === 'sheet') {
			// Download a 6x4 inch (1800x1200px) sheet with selected country grid
			const url = await createPrintableSheet(croppedPhoto, selected.size);
			triggerDownload(url, `OD2_Printable_passport_photo_${timestamp}.jpg`);
		}
		setFormat(type);
		setSuccess(true);
		setStep(3);
	};

	// Handler to download single cropped photo
	const downloadSinglePhoto = async () => {
		if (!croppedPhoto) return;
		const selected = countryOptions.find(opt => opt.value === country);
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		const url = await resizeImageToSize(croppedPhoto, selected.size[0], selected.size[1]);
		triggerDownload(url, `OD2_Single_passport_photo_${timestamp}.jpg`);
	};

	// Generate printable sheet and set preview
	const GeneratePrintableImage = async () => {
		if (!croppedPhoto) return;
		const selected = countryOptions.find(opt => opt.value === country);
		const url = await createPrintableSheet(croppedPhoto, selected.size);
		setCanvasd(url);
	};

	// Download the generated printable sheet PNG
	const downloadCanvasAsPNG = () => {
	  if (!canvasdRef.current) return;
	  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
	  const link = document.createElement("a");
	  link.download = `OD2_Printable_passport_photo_${timestamp}.png`;
	  link.href = canvasdRef.current;
	  link.click();
	  link.remove();
	};

	return (
		<>
			<TypographyH1>Passport Size Printable Photo Maker(6*4)</TypographyH1>
			<div className="maincard flex flex-row flex-wrap mt-5 gap-4">
				<Card className="flex flex-col gap-4 p-4 items-center w-full rounded-lg shadow lg:w-1/3">
					{/* Country Dropdown */}
					<div className="w-full mb-2">
						<label className="block mb-1 font-semibold">Select Country:</label>
						<select
							value={country}
							onChange={handleCountryChange}
							className="w-full p-2 border rounded"
						>
							{countryOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					{/* ...existing upload UI... */}
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
						<div className="flex flex-col sm:flex-row items-center mt-4 w-full">
							<TypographyP className="mb-4 text-center text-green-600">
								Uploaded File: <span>{imageName}</span>
							</TypographyP>
							{/* Uploaded image preview */}
							<div className="w-full flex justify-center mb-4">
								<Image
									src={URL.createObjectURL(image)}
									alt="Uploaded preview"
									width={200}
									height={200}
									className="rounded border object-contain max-h-48"
								/>
							</div>
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
							{/* Reset button above DPI */}
							{/* <div className="flex flex-row gap-3 w-full mt-2">
								<Button
									onClick={() => {
										setImage(null);
										setImageName("");
										setUploadError("");
										setCroppedPhoto(null);
										setCanvasd(null);
										setStage(0);
									}}
									className="bg-red-500 hover:bg-red-700 justify-center flex gap-1 w-full text-white font-extrabold p-3 rounded-md"
								>
									Reset
								</Button>
							</div> */}
							{/* DPI and other controls below */}
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
							{/* Crop Button */}
							<Button
								onClick={handleOpenCrop}
								className="bg-green-600 justify-center flex gap-1 text-white font-extrabold p-3 w-full rounded-md mt-2"
							>
								<ImageUpscale />
								Crop Photo
							</Button>
							{/* Generate Button only after crop */}
							{croppedPhoto && (
								<Button
									onClick={GeneratePrintableImage}
									className=" justify-center flex gap-1 font-extrabold p-3 w-full rounded-md"
								>
									<ImagePlay />
									Generate Photo
								</Button>
							)}
							{canvasd && (
								<>
									<div className="flex flex-col flex-wrap sm:flex-row gap-3 w-full mt-4">
										<Button
											onClick={downloadSinglePhoto}
											className="bg-green-500 hover:bg-green-700 justify-center flex gap-1 w-full text-white font-extrabold p-3 rounded-md"
										>
											<ImageDown />
											Download Single Photo
										</Button>
										<Button
											onClick={downloadCanvasAsPNG}
											className="bg-blue-500 hover:bg-blue-700 justify-center flex gap-1 w-full text-black font-extrabold p-3 rounded-md"
										>
											<ImageDown />
											Download Printable Sheet
										</Button>
									</div>
									{/* Reset button to clear all */}
									<div className="flex flex-row gap-3 w-full mt-2">
										<Button
											onClick={() => {
												setImage(null);
												setImageName("");
												setUploadError("");
												setCroppedPhoto(null);
												setCanvasd(null);
												setStage(0);
											}}
											className="bg-red-500 hover:bg-red-700 justify-center flex gap-1 w-full text-white font-extrabold p-3 rounded-md"
										>
											Reset
										</Button>
									</div>
								</>
							)}
						</>
					)}
					{/* Crop Modal */}
					{showCropModal && image && (
						<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
							<div className="bg-white p-4 rounded shadow-lg max-w-lg w-full relative">
								<h3 className="text-lg font-semibold mb-2">Crop & Adjust</h3>
								<div className="relative w-full h-96 bg-gray-100">
									<Cropper
										image={URL.createObjectURL(image)}
										crop={crop}
										zoom={zoom}
										aspect={countryOptions.find(opt => opt.value === country).aspect}
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={handleCropComplete}
									/>
								</div>
								<div className="flex gap-2 mt-4">
									<Button variant="secondary" onClick={handleCloseCrop}>Cancel</Button>
									<Button variant="default" onClick={handleConfirmCrop}>Confirm Crop</Button>
								</div>
							</div>
						</div>
					)}
				</Card>
				<Card className="flex flex-col w-full gap-4 lg:w-7/12 rounded-lg shadow">
					<CardHeader className="items-center flex justify-center gap-2 font-extrabold rounded-md p-4 w-full">
						<Fullscreen />
						<TypographyH2>Photo Preview</TypographyH2>
					</CardHeader>
					<CardContent>
						{/* Preview logic based on stage */}
						{stage === 1 && (
							<Card className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow">
								<TypographyH2 className="text-lg font-bold">Cropping in Progress</TypographyH2>
								<TypographyP className="text-sm">Adjust your photo in the cropping popup.</TypographyP>
							</Card>
						)}
						{stage === 2 && croppedPhoto ? (
							<>
								<div className="mb-4">
									<TypographyP className="text-center font-bold mb-2">Cropped Photo Preview</TypographyP>
									<Image
										src={croppedPhoto}
										alt="Cropped Passport Size Image"
										width={countryOptions.find(opt => opt.value === country).size[0]}
										height={countryOptions.find(opt => opt.value === country).size[1]}
										className="w-full max-w-xs mx-auto border rounded"
									/>
									<Button onClick={downloadSinglePhoto} className="justify-center flex gap-1 font-extrabold p-3 rounded-md mt-2 w-full">
										<ImageDown />
										Download Single Photo
									</Button>
								</div>
								{canvasd && (
									<div className="mt-6">
										<TypographyP className="text-center font-bold mb-2">Printable Sheet Preview</TypographyP>
										<Image src={canvasd} alt="Passport Size Image" width={1200} height={800} className="w-full mt-2 border rounded" />
										<Button onClick={downloadCanvasAsPNG} className="justify-center flex gap-1 font-extrabold p-3 rounded-md mt-2 w-full">
											<ImageDown />
											Download Printable Sheet
										</Button>
									</div>
								)}
								{!canvasd && (
									<TypographyP className="text-center mt-2">Cropped preview. Now generate printable sheet.</TypographyP>
								)}
							</>
						) : null}
						{(!image || stage === 0) && (
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
									<li>Click Crop Photo, adjust, then confirm.</li>
									<li>Then Click Generate Photo Button to generate the Printable Photo.</li>
								</ul>
							</Card>
						)}
					</CardContent>
				</Card>
        <Card className="flex flex-col w-full gap-2 rounded-lg shadow">
          <CardHeader className="items-center flex justify-center gap-2 font-extrabold rounded-md p-4 w-full">
            <ImageUp />
            <TypographyH2>Passport Photo Printing Guide</TypographyH2>
          </CardHeader>
          <CardContent>
            <PassportPhotoPrintingContent />
          </CardContent>
        </Card>
      </div>
		</>
	);
}

// Utility to crop image using canvas
async function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      // Calculate scale between displayed image and natural image
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;
      const scaleX = naturalWidth / image.width;
      const scaleY = naturalHeight / image.height;
      const sx = Math.round(crop.x * scaleX);
      const sy = Math.round(crop.y * scaleY);
      const sw = Math.round(crop.width * scaleX);
      const sh = Math.round(crop.height * scaleY);
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        sw,
        sh
      );
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          resolve(url);
        },
        "image/jpeg"
      );
    };
  });
}

// Utility: Download a blob/image url
function triggerDownload(url, filename) {
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// Utility: Resize image to given size (canvas)
async function resizeImageToSize(imageUrl, width, height) {
	return new Promise((resolve) => {
		const img = new window.Image();
		img.crossOrigin = 'anonymous';
		img.src = imageUrl;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, width, height);
			canvas.toBlob((blob) => {
				const url = URL.createObjectURL(blob);
				resolve(url);
			}, 'image/jpeg');
		};
	});
}

// Utility: Create a 6x4 inch (1800x1200px) printable sheet with as many passport photos as fit, with cut lines between photos
async function createPrintableSheet(imageUrl, size) {
	return new Promise((resolve) => {
		const sheetWidth = 1800, sheetHeight = 1200;
		const [pw, ph] = size;
		const img = new window.Image();
		img.crossOrigin = 'anonymous';
		img.src = imageUrl;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = sheetWidth;
			canvas.height = sheetHeight;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, sheetWidth, sheetHeight);
			// Grid and gap for selected country
			const cols = Math.floor(sheetWidth / pw);
			const rows = Math.floor(sheetHeight / ph);
			const xMargin = (sheetWidth - cols * pw) / (cols + 1);
			const yMargin = (sheetHeight - rows * ph) / (rows + 1);
			// Draw photos
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const x = Math.round(xMargin + col * (pw + xMargin));
					const y = Math.round(yMargin + row * (ph + yMargin));
					ctx.fillStyle = '#fff';
					ctx.fillRect(x, y, pw, ph);
					ctx.drawImage(img, x, y, pw, ph);
				}
			}
			// Draw cut lines at the center of the gaps
			ctx.save();
			ctx.strokeStyle = '#888'; // light gray cut line
			ctx.lineWidth = 2;
			ctx.setLineDash([10, 10]);
			// Vertical lines (between columns)
			for (let col = 1; col < cols; col++) {
				const prevRight = xMargin + (col - 1) * (pw + xMargin) + pw;
				const nextLeft = xMargin + col * (pw + xMargin);
				const x = Math.round((prevRight + nextLeft) / 2);
				ctx.beginPath();
				ctx.moveTo(x, yMargin);
				ctx.lineTo(x, sheetHeight - yMargin);
				ctx.stroke();
			}
			// Horizontal lines (between rows)
			for (let row = 1; row < rows; row++) {
				const prevBottom = yMargin + (row - 1) * (ph + yMargin) + ph;
				const nextTop = yMargin + row * (ph + yMargin);
				const y = Math.round((prevBottom + nextTop) / 2);
				ctx.beginPath();
				ctx.moveTo(xMargin, y);
				ctx.lineTo(sheetWidth - xMargin, y);
				ctx.stroke();
			}
			ctx.restore();
			canvas.toBlob((blob) => {
				const url = URL.createObjectURL(blob);
				resolve(url);
			}, 'image/jpeg');
		};
	});
}

// TODO: Add optional enhancements: background removal, head alignment guide, auto-enhance, multi-language support
// TODO: Style .btn-primary and .btn-secondary in your global CSS
// TODO: Integrate cropping and image processing libraries for full functionality