// app/about/page.js

"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import "../../styles/photo.css";
import html2canvas from "html2canvas";

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null);
  const photoRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (photoRef.current) {
      const canvas = await html2canvas(photoRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Ensure cross-origin images are allowed
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "passport_photos_4x6.png";
      link.click();
    }
  };

  return (
    <div class="flex w-full">
      <div
        class="flex-none w-4/12  bg-white border-gray-100 rounded-md	"
        style={{ padding: "20px", padding: "10px", margin: "10px" }}
      >
        <input
          class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {imageSrc && (
          <div style={{ marginTop: "30px" }}>
            <h3>Preview</h3>
            <div
              style={{
                border: "1px solid black",
                width: "150px",
                height: "193px", // Keep the aspect ratio
                margin: "0 auto",
                overflow: "hidden",
              }}
            >
              <img
                src={imageSrc}
                alt="Small Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        )}
        {" No image uploaded"}
      </div>
      <div class="flex-initial w-8/12">
        {imageSrc && (
          <div style={{ "text-align": "center" }}>
            <button
              onClick={handleDownload}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Download as Image
            </button>
            <div>
              <div
                ref={photoRef}
                style={{
                  width: "1200px", // Width for 4 inches at 300 DPI
                  height: "1800px", // Height for 6 inches at 300 DPI
                  position: "relative",
                  backgroundColor: "white",
                }}
              >
                {/* Passport Photos Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)",
                    gap: "20px",
                    padding: "20px",
                    "justify-items": "center",
                  }}
                >
                  {Array(8)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={index}
                        className="photo-frame"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        <img
                          src={imageSrc}
                          alt="Passport Size"
                          style={{
                            width: "315px", // 3.5 cm = 315px
                            height: "405px", // 4.5 cm = 405px
                            objectFit: "cover",
                            border: "1px solid black",
                          }}
                        />
                      </div>
                    ))}
                </div>

                {/* Cut Guides */}
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}
