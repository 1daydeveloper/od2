"use client";
import React, { useRef } from "react";
import { Save, Upload, Download, Trash2, Edit, FileText, HelpCircle, Globe, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Link from "next/link";

export default function WorkflowToolbar({
  workflowName,
  onNameChange,
  onExport,
  onEmbedExport,
  onImport,
  onClear,
}) {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImport(file);
      event.target.value = ""; // Reset file input
    }
  };

  const loadSampleWorkflow = async () => {
    try {
      const response = await fetch('/examples/sample-workflow.json');
      if (!response.ok) {
        throw new Error('Failed to load sample workflow');
      }
      const blob = await response.blob();
      const file = new File([blob], 'sample-workflow.json', { type: 'application/json' });
      
      onImport(file);
      
      toast.success(
        "Sample workflow loaded successfully!\nTry dragging endpoints from the sidebar to create new nodes.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      
    } catch (error) {
      console.error("Error loading sample workflow:", error);
      toast.error(`Failed to load sample workflow: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="bg-card border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Edit className="w-4 h-4 text-muted-foreground" />
          <Input
            value={workflowName}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:bg-background focus:border-input"
            placeholder="Workflow Name"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/awd/docs">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            title="View documentation"
          >
            <HelpCircle className="w-4 h-4" />
            Docs
          </Button>
        </Link>
        <Link href="/awd/test">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            title="Test the workflow viewer"
          >
            <TestTube className="w-4 h-4" />
            Test
          </Button>
        </Link>
       
        <Button
          variant="outline"
          size="sm"
          onClick={handleImportClick}
          className="flex items-center gap-2"
          title="Import from file"
        >
          <Upload className="w-4 h-4" />
          Import
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="flex items-center gap-2"
          title="Export full workflow with OpenAPI schema"
        >
          <Download className="w-4 h-4" />
          Export Workflow
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onEmbedExport}
          className="flex items-center gap-2"
          title="Export flow for embedding (lightweight)"
        >
          <Globe className="w-4 h-4" />
          Export for Embed
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/examples/sample-workflow.json';
            link.download = 'sample-workflow.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex items-center gap-2"
          title="Download sample workflow file"
        >
          <FileText className="w-4 h-4" />
          Sample
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={onClear}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
