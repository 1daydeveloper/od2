"use client";
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';

const PassportPhotoGenerator = () => {
  const [image, setImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const saveCroppedImages = async () => {
    if (!croppedAreaPixels || !image) return; // Ensure we have a cropped area and image

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = 6 * 72; // 6 inches in pixels (assuming 72 DPI)
    const height = 4 * 72; // 4 inches in pixels

    canvas.width = width;
    canvas.height = height;

    for (let i = 0; i < 8; i++) {
      const x = (i % 4) * (width / 4);
      const y = Math.floor(i / 4) * (height / 2);

      const img = new Image();
      img.src = image; // Using the original image for cropping
      img.onload = () => {
        // Draw the cropped image into the canvas
        ctx.drawImage(
          img,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          x + 10, // Add a margin of 10px
          y + 10, // Add a margin of 10px
          (width / 4) - 20, // Image width in each cell
          (height / 2) - 20 // Image height in each cell
        );

        // Once all images are drawn, convert to PNG
        if (i === 7) { // Last image drawn
          const dataUrl = canvas.toDataURL("image/png", 1.0); // PNG format
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "passport-photos.png"; // Save as PNG
          link.click();
        }
      };
    }
  };

  const renderCroppedImagesPreview = () => {
    if (!croppedAreaPixels || !image) return null; // Check for null before rendering

    const previews = [];
    for (let i = 0; i < 8; i++) {
      previews.push(
        <div
          key={i}
          style={{
            width: '1.5in',
            height: '1.5in',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #ddd',
            margin: '5px'
          }}
        >
          <img
            src={image}
            alt={`Cropped Preview ${i + 1}`}
            style={{
              position: 'absolute',
              top: `-${croppedAreaPixels.y}px`,
              left: `-${croppedAreaPixels.x}px`,
              width: `${100 * zoom}%`,
            }}
          />
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {previews}
      </div>
    );
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #ddd', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        {image ? (
          <p>Upload a new image</p>
        ) : (
          <p>Click or drag to upload an image</p>
        )}
      </div>

      {image && (
        <div  style={{ display: 'inline', gap: '8px' }}>

          <h3>Crop your image:</h3>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // Maintain square aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style= {{containerStyle:{width:"50%"}, mediaStyle: {}, cropAreaStyle: {}}  }
          />
        </div>
      )}

      {image && (
        <div>
          <button onClick={saveCroppedImages}>Save Photo as PNG</button>
          <h3>Preview:</h3>
          {renderCroppedImagesPreview()}
        </div>
      )}

      <style jsx>{`
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PassportPhotoGenerator;
