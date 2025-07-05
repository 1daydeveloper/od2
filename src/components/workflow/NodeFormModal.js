"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, Trash2, ExternalLink, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NodeFormModal({ node, onSave, onClose, onDelete }) {
  const [formData, setFormData] = useState({
    name: node?.data?.name || "",
    description: node?.data?.description || "",
    apiDocumentationLink: node?.data?.apiDocumentationLink || "",
    imageLink: node?.data?.imageLink || "",
    imageUpload: node?.data?.imageUpload || null,
  });
  
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange("imageUpload", e.target.result);
        handleInputChange("imageLink", ""); // Clear image link when uploading
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLinkChange = (value) => {
    handleInputChange("imageLink", value);
    setImageError(false); // Reset error state when changing image
    if (value) {
      handleInputChange("imageUpload", null); // Clear uploaded image when using link
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const clearImage = () => {
    handleInputChange("imageUpload", null);
    handleInputChange("imageLink", "");
    setImageError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">
            {node?.data?.name ? `Edit Node: ${node.data.name}` : "Configure Node"}
          </CardTitle>
          <div className="flex gap-2">
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* API Information (Read-only) */}
            {node?.data?.method && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium text-sm">API Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Method:</span>
                    <span className="ml-2 font-mono">{node.data.method}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Path:</span>
                    <span className="ml-2 font-mono">{node.data.path}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Operation ID:</span>
                    <span className="ml-2 font-mono">{node.data.operationId}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Node Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Node Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter a descriptive name for this node"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what this API endpoint does..."
                className="w-full min-h-20 px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                rows={3}
              />
            </div>

            {/* API Documentation Link */}
            <div className="space-y-2">
              <Label htmlFor="apiLink">API Documentation Link</Label>
              <div className="flex gap-2">
                <Input
                  id="apiLink"
                  type="url"
                  value={formData.apiDocumentationLink}
                  onChange={(e) => handleInputChange("apiDocumentationLink", e.target.value)}
                  placeholder="https://api-docs.example.com/endpoint"
                />
                {formData.apiDocumentationLink && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formData.apiDocumentationLink, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="space-y-4">
              <Label>Node Image</Label>
              
              {/* Current Image Preview */}
              {(formData.imageUpload || formData.imageLink) && (
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 relative bg-muted rounded-lg border overflow-hidden">
                    {!imageError ? (
                      <Image
                        src={formData.imageUpload || formData.imageLink}
                        alt="Node preview"
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                        unoptimized={!!formData.imageLink} // Use unoptimized for external URLs
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Failed to load
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Current Image</p>
                    <p className="text-xs text-muted-foreground">
                      {formData.imageUpload ? "Uploaded file" : "External link"}
                    </p>
                    {imageError && (
                      <p className="text-xs text-red-500">
                        Failed to load image. Please check the URL.
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearImage}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Upload from Local */}
              <div className="space-y-2">
                <Label htmlFor="imageUpload">Upload Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUpload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* External Image Link */}
              <div className="space-y-2">
                <Label htmlFor="imageLink">Or use External Image URL</Label>
                <Input
                  id="imageLink"
                  type="url"
                  value={formData.imageLink}
                  onChange={(e) => handleImageLinkChange(e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Node
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
