"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function ImageToDataURL() {
  const [imageFile, setImageFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");

  // Track page view on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Image to Data URL Converter',
        page_location: window.location.href,
        event_category: 'image_converter',
        event_label: 'page_loaded'
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
        
        // Track successful image conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'image_converted', {
            event_category: 'image_converter',
            event_label: 'conversion_success',
            file_size: file.size,
            file_type: file.type,
            file_name: file.name
          });
        }
      };
      reader.readAsDataURL(file);
      
      // Track image upload event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'file_upload', {
          event_category: 'image_converter',
          event_label: 'image_uploaded',
          file_size: file.size,
          file_type: file.type
        });
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dataUrl).then(() => {
      toast.success("Data URL copied to clipboard!");
      
      // Track copy to clipboard event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'copy_data_url', {
          event_category: 'image_converter',
          event_label: 'clipboard_copy',
          data_url_length: dataUrl.length,
          custom_parameter: 'user_copied'
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Image to Data URL Converter (Blob Converter)
      </h1>
      <Card className="p-6 mb-4 w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Select an image to convert it to a Base64 Data URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {imageFile && (
            <div>
              <div className="mb-2 font-semibold">Uploaded Image Preview:</div>
              <img
                src={dataUrl}
                alt="Uploaded"
                className="w-full max-w-xs rounded-lg mb-4"
              />
              <div className="mb-2 font-semibold">Data URL:</div>
              <div className="flex items-center mb-4 gap-2">
                <Input
                  type="text"
                  value={dataUrl}
                  readOnly
                  className="flex-grow"
                />
                <Button onClick={copyToClipboard} variant="default">
                  Copy
                </Button>
              </div>
              <Button 
                onClick={() => {
                  // Create standardized filename with timestamp
                  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                  const originalName = imageFile?.name || 'image';
                  const fileExtension = originalName.split('.').pop() || 'png';
                  const downloadFileName = `OD2_converted_image_${timestamp}.${fileExtension}`;
                  
                  // Track download click
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'download', {
                      event_category: 'image_converter',
                      event_label: 'image_download',
                      file_name: downloadFileName,
                      data_url_length: dataUrl.length,
                      original_file_name: originalName
                    });
                  }
                }}
                asChild 
                variant="default"
              >
                <a 
                  href={dataUrl} 
                  download={`OD2_converted_image_${new Date().toISOString().replace(/[:.]/g, "-")}.${imageFile?.name.split('.').pop() || 'png'}`}
                >
                  Download Image
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="maincard max-w-3xl mx-auto text-center mt-3">
        <p className="text-lg mb-6">
          Convert images into Base64 Data URLs quickly and easily. This tool is
          perfect for embedding images directly into web pages, CSS, or
          JavaScript.
        </p>
        {/* Call to Action */}
        <Button 
          onClick={() => {
            // Track CTA click
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'cta_click', {
                event_category: 'image_converter',
                event_label: 'try_tool_now_click',
                custom_parameter: 'main_cta'
              });
            }
          }}
          asChild 
          size="lg" 
          className="mb-6"
        >
          <a
            href="https://www.od2.in/convert-image-to-blob"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try the Tool Now!
          </a>
        </Button>
        {/* Features Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Why Use This Tool?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left list-disc pl-6 space-y-2">
              <li>
                🚀 <strong>Faster Loading</strong> – Reduces HTTP requests.
              </li>
              <li>
                📂 <strong>Offline Support</strong> – No external image hosting
                needed.
              </li>
              <li>
                🔒 <strong>Improved Security</strong> – Prevents image hotlinking.
              </li>
              <li>
                📧 <strong>Ideal for Emails</strong> – Keeps images visible in
                email templates.
              </li>
              <li>
                🛠️ <strong>Free & Easy</strong> – No sign-up required, just upload
                and convert.
              </li>
            </ul>
          </CardContent>
        </Card>
        {/* Usage Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How to Convert an Image?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="text-left list-decimal pl-6 space-y-2">
              <li>
                📤 <strong>Upload</strong> an image (JPG, PNG, GIF, SVG, etc.).
              </li>
              <li>
                ⚡ The tool will <strong>automatically convert</strong> it to a <strong>Base64 Data
                URL</strong>.
              </li>
              <li>
                📋 <strong>Copy or Download</strong> the generated Data URL for
                your project.
              </li>
            </ol>
          </CardContent>
        </Card>
        {/* Use Cases */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Where Can You Use Data URLs?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left list-disc pl-6 space-y-2">
              <li>
                💻 <strong>Web Development</strong> – Embed images in HTML, CSS,
                or JavaScript.
              </li>
              <li>
                📧 <strong>Email Templates</strong> – Prevents broken images in
                newsletters.
              </li>
              <li>
                📊 <strong>Data Storage</strong> – Store small images in JSON or
                databases.
              </li>
              <li>
                🔐 <strong>Privacy & Security</strong> – No external hosting
                required.
              </li>
            </ul>
          </CardContent>
        </Card>
        {/* External Link & Final CTA */}
        <Card>
          <CardContent className="text-xl font-semibold flex flex-col items-center">
            Start Converting Your Images Instantly!
            <a
              href="https://www.od2.in/convert-image-to-blob"
              className="underline mt-2"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Track bottom CTA click
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'cta_click', {
                    event_category: 'image_converter',
                    event_label: 'bottom_cta_click',
                    custom_parameter: 'final_cta'
                  });
                }
              }}
            >
              Click Here to Use the Tool
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
