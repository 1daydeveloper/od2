"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Handle, Position } from "reactflow";
import { Edit, Trash2, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomNode({ data, selected, id }) {
  const [imageError, setImageError] = useState(false);
  const getMethodColor = (method) => {
    const colors = {
      GET: "bg-blue-500",
      POST: "bg-green-500",
      PUT: "bg-orange-500",
      PATCH: "bg-yellow-500",
      DELETE: "bg-red-500",
      HEAD: "bg-purple-500",
      OPTIONS: "bg-gray-500",
    };
    return colors[method] || "bg-gray-500";
  };

  const handleEdit = () => {
    if (data.onEdit) {
      data.onEdit({ id, data });
    }
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <Card 
      className={`min-w-64 max-w-80 transition-all duration-200 ${
        selected ? "ring-2 ring-primary" : ""
      } bg-card shadow-lg`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-primary border-2 border-background"
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {data.method && (
                <Badge
                  className={`${getMethodColor(data.method)} text-white text-xs font-mono`}
                >
                  {data.method}
                </Badge>
              )}
              {data.path && (
                <span className="text-xs font-mono text-muted-foreground truncate">
                  {data.path}
                </span>
              )}
            </div>
            <CardTitle className="text-sm font-semibold truncate">
              {data.name || "Untitled Node"}
            </CardTitle>
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={handleEdit}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Node Image */}
        {(data.imageUpload || data.imageLink) && (
          <div className="flex justify-center">
            <div className="w-16 h-16 relative bg-muted rounded-lg border overflow-hidden">
              {!imageError ? (
                <Image
                  src={data.imageUpload || data.imageLink}
                  alt={data.name || "Node image"}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  unoptimized={!!data.imageLink} // Use unoptimized for external URLs
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                  Error
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {data.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        )}

        {/* API Documentation Link */}
        {data.apiDocumentationLink && (
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
            <a
              href={data.apiDocumentationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline truncate"
            >
              API Documentation
            </a>
          </div>
        )}

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {data.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{data.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="success"
        style={{ top: "40%" }}
        className="w-3 h-3 bg-green-500 border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="failure"
        style={{ top: "70%" }}
        className="w-3 h-3 bg-red-500 border-2 border-background"
      />
      
      {/* Handle Labels */}
      <div className="absolute right-[-50px] top-[35%] text-xs text-muted-foreground">
        ✅
      </div>
      <div className="absolute right-[-50px] top-[65%] text-xs text-muted-foreground">
        ❌
      </div>
    </Card>
  );
}
