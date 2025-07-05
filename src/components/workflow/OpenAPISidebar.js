"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import YAML from "yaml";
import { toast } from "react-toastify";
import { Search, Upload, FileText, Globe, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OpenAPISidebar({ openAPISchema, onSchemaUpload }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [parsedEndpoints, setParsedEndpoints] = useState([]);

  // Parse endpoints whenever the schema changes (including from import)
  useEffect(() => {
    if (openAPISchema) {
      parseEndpoints(openAPISchema);
    } else {
      setParsedEndpoints([]);
    }
  }, [openAPISchema]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/json": [".json"],
      "application/x-yaml": [".yaml", ".yml"],
      "text/yaml": [".yaml", ".yml"],
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const text = await file.text();
          let schema;
          
          if (file.name.endsWith(".json")) {
            schema = JSON.parse(text);
          } else {
            schema = YAML.parse(text);
          }
          
          onSchemaUpload(schema);
          parseEndpoints(schema);
          
          // Show success toast
          const endpointCount = Object.keys(schema.paths || {}).length;
          toast.success(
            `OpenAPI schema loaded successfully!\n• ${endpointCount} endpoints found\n• Schema: ${schema.info?.title || 'Unknown'}`,
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
          
        } catch (error) {
          console.error("Error parsing OpenAPI schema:", error);
          toast.error(`Failed to parse OpenAPI schema: ${error.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    },
  });

  const parseEndpoints = (schema) => {
    if (!schema.paths) return;

    const endpoints = [];
    Object.entries(schema.paths).forEach(([path, pathItem]) => {
      Object.entries(pathItem).forEach(([method, operation]) => {
        if (typeof operation === "object" && operation.operationId) {
          endpoints.push({
            path,
            method: method.toUpperCase(),
            operationId: operation.operationId,
            summary: operation.summary || "",
            description: operation.description || "",
            tags: operation.tags || [],
            parameters: operation.parameters || [],
            responses: operation.responses || {},
          });
        }
      });
    });
    
    setParsedEndpoints(endpoints);
  };

  const filteredEndpoints = useMemo(() => {
    if (!searchTerm) return parsedEndpoints;
    
    return parsedEndpoints.filter(
      (endpoint) =>
        endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.operationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [parsedEndpoints, searchTerm]);

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

  const onDragStart = (event, endpoint) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(endpoint));
    event.dataTransfer.effectAllowed = "move";
  };

  const loadSampleSchema = async () => {
    try {
      const response = await fetch('/examples/sample-openapi.json');
      if (!response.ok) {
        throw new Error('Failed to load sample schema');
      }
      const schema = await response.json();
      
      onSchemaUpload(schema);
      parseEndpoints(schema);
      
      // Show success toast
      const endpointCount = Object.keys(schema.paths || {}).length;
      toast.success(
        `Sample OpenAPI schema loaded!\n• ${endpointCount} endpoints found\n• Schema: ${schema.info?.title || 'Sample API'}`,
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
      
    } catch (error) {
      console.error("Error loading sample schema:", error);
      toast.error(`Failed to load sample schema: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          OpenAPI Schema
        </h2>

        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the OpenAPI schema here..."
              : "Drag & drop OpenAPI schema (JSON/YAML) or click to select"}
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Choose File
          </Button>
        </div>

        {/* Sample Schema Button - Outside dropzone */}
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground mb-2">Need a sample? Try:</p>
          <Button
            variant="outline"
            size="sm"
            onClick={loadSampleSchema}
            className="text-xs"
          >
            <FileText className="w-3 h-3 mr-1" />
            Load Sample OpenAPI
          </Button>
        </div>

        {openAPISchema && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4" />
              <span className="font-medium">
                {openAPISchema.info?.title || "OpenAPI Schema"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Version: {openAPISchema.info?.version || "Unknown"}
            </p>
            <p className="text-xs text-muted-foreground">
              Endpoints: {parsedEndpoints.length}
            </p>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {parsedEndpoints.length > 0 && (
        <div className="flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Endpoints List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredEndpoints.length > 0 ? (
          filteredEndpoints.map((endpoint, index) => (
            <Card
              key={`${endpoint.path}-${endpoint.method}-${index}`}
              className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
              draggable
              onDragStart={(event) => onDragStart(event, endpoint)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${getMethodColor(endpoint.method)} text-white text-xs font-mono`}
                  >
                    {endpoint.method}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    {endpoint.path}
                  </span>
                </div>
                <CardTitle className="text-sm">
                  {endpoint.operationId}
                </CardTitle>
              </CardHeader>
              {(endpoint.summary || endpoint.tags.length > 0) && (
                <CardContent className="pt-0">
                  {endpoint.summary && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {endpoint.summary}
                    </p>
                  )}
                  {endpoint.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {endpoint.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))
        ) : openAPISchema ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            {searchTerm
              ? "No endpoints match your search"
              : "No endpoints found in schema"}
          </div>
        ) : (
          <div className="text-center text-muted-foreground text-sm py-8">
            <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-50" />
            Upload an OpenAPI schema to get started
          </div>
        )}
      </div>
    </div>
  );
}
