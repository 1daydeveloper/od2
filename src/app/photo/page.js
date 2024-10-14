// app/about/page.js

"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import "../../styles/photo.css";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
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
    <div class="flex-col w-full">
      <div
        class="flex-none   bg-white border-gray-100 rounded-md	"
        style={{ padding: "20px", padding: "10px", margin: "10px" }}
      >
        <input
          class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-orange-400 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {imageSrc && (
          <div style={{ marginTop: "30px" }}>            
            <button
              onClick={handleDownload}
              
              className="bg-lime-500 rounded-xl p-3 text-black font-bold hover:bg-orange-500 animate-bounce"
            >
              Download as Image
            </button>
          </div>
        )}
        {" No image uploaded"}
      </div>
      <div class="flex-initial">
        {imageSrc && (
          <div style={{ "text-align": "center" }}>
           
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
                    gap: "1px",
                    padding: "1px",
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
                            transform: "rotate(270deg)",
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
