"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Download, MousePointer, GitBranch, Settings, FileText, Globe, Zap, Code, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
                <div className="flex items-center gap-4 mb-8">

           <Link href="/api-wd">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workflow Builder
            </Button>
          </Link>
          <Link href="/api-wd/test">
            <Button variant="outline" size="sm">
              🔧 Test Viewer
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-8">
       
          <div>
            <h1 className="text-3xl font-bold">Workflow Builder Documentation</h1>
            <p className="text-muted-foreground mt-2">
              Create, export, and embed visual API workflows with OpenAPI integration
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Getting Started</h4>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Quick Start Guide</li>
                  <li>• 🔧 Test Viewer</li>
                  <li>• OpenAPI Integration</li>
                  <li>• Creating Workflows</li>
                  <li>• Node Configuration</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Export & Integration</h4>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Download Files & Demo</li>
                  <li>• Export Options</li>
                  <li>• Local CDN Integration</li>
                  <li>• Code Examples</li>
                  <li>• Embedding Guide</li>
                  <li>• Best Practices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Build visual API workflows in 4 simple steps. Perfect for documenting complex API interactions and creating embeddable workflow diagrams.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="font-semibold">Upload OpenAPI Schema</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Drag & drop your OpenAPI JSON/YAML file or click &ldquo;Load Sample OpenAPI&rdquo; to get started with pre-built endpoints
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="font-semibold">Drag API Endpoints</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Drag API endpoints from the left sidebar onto the canvas to create workflow nodes with automatic configuration
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="font-semibold">Connect Workflow Steps</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Connect nodes using success (✅) and failure (❌) handles to build logical workflow paths
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <h3 className="font-semibold">Export & Embed</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Choose &ldquo;Export Workflow&rdquo; for editing or &ldquo;Export for Embed&rdquo; for website integration
                </p>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-primary mb-2">
                🎯 Pro Tip: Start with Sample Data
              </h4>
              <p className="text-sm text-primary/80">
                Click &ldquo;Load Sample OpenAPI&rdquo; and &ldquo;Load Sample Workflow&rdquo; to explore features with pre-built content before uploading your own API schema.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Viewer Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              🔧 Test Viewer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Use the Test Viewer to preview and test workflow visualizations with different themes and sample data.
            </p>
            
            <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
              <h4 className="font-semibold text-secondary-foreground mb-2 flex items-center gap-2">
                🚀 Quick Testing
              </h4>
              <p className="text-sm text-secondary-foreground/80 mb-3">
                Test your workflow visualizations with predefined samples or custom JSON data.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Load sample workflows (E-commerce, OpenAPI, Embed flows)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Test both direct file access and API endpoints</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Switch between light, dark, and auto themes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Preview JSON data and test custom workflow uploads</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-secondary">
                <Link 
                  href="/api-wd/test" 
                  className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  🔧 Open Test Viewer
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>
                OpenAPI Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Upload className="w-4 h-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Schema Upload & Parsing</h4>
                  <p className="text-sm text-muted-foreground">
                    Support for OpenAPI 3.0 JSON and YAML formats with automatic endpoint parsing and validation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MousePointer className="w-4 h-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Drag & Drop Interface</h4>
                  <p className="text-sm text-muted-foreground">
                    Intuitive drag-and-drop interface to add API endpoints to your workflow canvas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Endpoint Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic parsing of HTTP methods, paths, descriptions, tags, and operation IDs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Visual Workflow Canvas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 bg-primary rounded-full" />
                <div>
                  <h4 className="font-medium">Success Flow Paths</h4>
                  <p className="text-sm text-muted-foreground">
                    Green connectors (✅) represent successful API call paths and positive outcomes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 mt-1 bg-destructive rounded-full" />
                <div>
                  <h4 className="font-medium">Error Handling</h4>
                  <p className="text-sm text-muted-foreground">
                    Red connectors (❌) represent error handling paths and fallback scenarios
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Settings className="w-4 h-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Node Customization</h4>
                  <p className="text-sm text-muted-foreground">
                    Click nodes to edit names, descriptions, images, and documentation links
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Step-by-Step Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4 bg-primary/10 py-3 rounded-r">
                <h3 className="font-semibold text-lg mb-3 text-primary">1. Setting Up Your OpenAPI Schema</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-primary">Upload:</span>
                    <span>Drag & drop your OpenAPI JSON/YAML file into the left sidebar upload area</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-primary">Sample:</span>
                    <span>Click &ldquo;Load Sample OpenAPI&rdquo; to try with pre-built endpoints and explore features</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-primary">Validation:</span>
                    <span>The system automatically validates your schema and displays parsing results</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-primary">Search:</span>
                    <span>Use the search bar to filter endpoints by name, path, HTTP method, or tags</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-secondary pl-4 bg-secondary/50 py-3 rounded-r">
                <h3 className="font-semibold text-lg mb-3 text-secondary-foreground">2. Creating Workflow Nodes</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-secondary-foreground">Drag:</span>
                    <span>Drag API endpoints from the sidebar directly onto the canvas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-secondary-foreground">Configure:</span>
                    <span>A configuration modal opens automatically for each new node</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-secondary-foreground">Customize:</span>
                    <span>Add custom descriptions, upload images, and include documentation links</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-secondary-foreground">Edit:</span>
                    <span>Click the edit button (✏️) on any node to modify configuration later</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50/50 dark:bg-orange-950/20 py-3 rounded-r">
                <h3 className="font-semibold text-lg mb-3 text-orange-700 dark:text-orange-300">3. Connecting Workflow Steps</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-orange-600 dark:text-orange-400">Success Path:</span>
                    <span>Drag from the green handle (✅) to connect successful API response flows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-orange-600 dark:text-orange-400">Error Path:</span>
                    <span>Drag from the red handle (❌) to connect error handling and fallback paths</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-orange-600 dark:text-orange-400">Multiple:</span>
                    <span>Each node can have multiple outgoing connections for complex workflows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-orange-600 dark:text-orange-400">Visual:</span>
                    <span>Connections are color-coded and labeled for easy understanding</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50/50 dark:bg-purple-950/20 py-3 rounded-r">
                <h3 className="font-semibold text-lg mb-3 text-purple-700 dark:text-purple-300">4. Export & Import Workflows</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-purple-600 dark:text-purple-400">Export Workflow:</span>
                    <span>Full export with OpenAPI schema for re-editing and backup</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-purple-600 dark:text-purple-400">Export for Embed:</span>
                    <span>Lightweight export optimized for external website integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-purple-600 dark:text-purple-400">Import File:</span>
                    <span>Upload previously exported workflow JSON files from your computer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-purple-600 dark:text-purple-400">File Formats:</span>
                    <span>Full workflows (*_workflow.json) and embed flows (*_embed_flow.json)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Node Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Node Configuration Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  Basic Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-blue-300 pl-3">
                    <h4 className="font-medium">Node Name</h4>
                    <p className="text-muted-foreground">Custom display name for the workflow step (overrides API endpoint name)</p>
                  </div>
                  <div className="border-l-2 border-green-300 pl-3">
                    <h4 className="font-medium">Description</h4>
                    <p className="text-muted-foreground">Detailed explanation of what this step does in your workflow</p>
                  </div>
                  <div className="border-l-2 border-purple-300 pl-3">
                    <h4 className="font-medium">Documentation Link</h4>
                    <p className="text-muted-foreground">Link to external API documentation or additional resources</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">
                  Visual Customization
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-orange-300 pl-3">
                    <h4 className="font-medium">Image Upload</h4>
                    <p className="text-muted-foreground">Upload local images for visual representation of the API endpoint</p>
                  </div>
                  <div className="border-l-2 border-red-300 pl-3">
                    <h4 className="font-medium">External Image URL</h4>
                    <p className="text-muted-foreground">Use images from external URLs (consider CORS policies)</p>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-3">
                    <h4 className="font-medium">Auto-generated Info</h4>
                    <p className="text-muted-foreground">HTTP method, path, and operation ID automatically extracted from OpenAPI</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Export Options Explained
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Choose the right export format based on your use case. Each option is optimized for different scenarios.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 bg-blue-50/50 dark:bg-blue-950/20">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  📦 Export Workflow
                  <Badge variant="secondary" className="text-xs">Full Export</Badge>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Purpose:</span>
                    <span className="text-muted-foreground">Complete backup with OpenAPI schema</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">File Size:</span>
                    <span className="text-muted-foreground">Larger - includes full schema data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Format:</span>
                    <span className="text-muted-foreground">*_workflow.json naming</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Contains:</span>
                    <span className="text-muted-foreground">Nodes, edges, OpenAPI schema, metadata</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Best For:</span>
                    <span className="text-muted-foreground">Re-editing, backup, sharing</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50/50 dark:bg-green-950/20">
                <h3 className="font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center gap-2">
                  🚀 Export for Embed
                  <Badge variant="secondary" className="text-xs">Lightweight</Badge>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Purpose:</span>
                    <span className="text-muted-foreground">Website embedding & integration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">File Size:</span>
                    <span className="text-muted-foreground">Smaller - no OpenAPI schema</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Format:</span>
                    <span className="text-muted-foreground">*_embed_flow.json naming</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Contains:</span>
                    <span className="text-muted-foreground">Nodes, edges, visual data only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Best For:</span>
                    <span className="text-muted-foreground">External embedding, fast loading</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                💡 When to Use Each Export Option
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-amber-700 dark:text-amber-300">Use &ldquo;Export Workflow&rdquo; when:</span>
                  <ul className="text-amber-600 dark:text-amber-400 mt-1 space-y-1 ml-4">
                    <li>• You want to edit the workflow later</li>
                    <li>• Creating backups for version control</li>
                    <li>• Sharing with other developers</li>
                    <li>• You need the complete OpenAPI schema</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium text-amber-700 dark:text-amber-300">Use &ldquo;Export for Embed&rdquo; when:</span>
                  <ul className="text-amber-600 dark:text-amber-400 mt-1 space-y-1 ml-4">
                    <li>• Embedding in external websites</li>
                    <li>• Creating documentation diagrams</li>
                    <li>• Optimizing for fast web loading</li>
                    <li>• You only need the visual workflow</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Links and Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Download Files & Live Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Download the required files and see the workflow viewer in action.
            </p>
            
            {/* CDN URLs Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                Public CDN URLs (Recommended)
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                Use these URLs to include the workflow viewer in any website without downloading files:
              </p>
              
              <div className="space-y-3">
                <div className="bg-white/80 dark:bg-gray-900/50 rounded-lg p-3 border">
                  <div className="text-xs text-gray-500 mb-1">CSS</div>
                  <code className="text-sm text-blue-600 dark:text-blue-400 font-mono break-all">
                    https://od2.in/api-wd/workflow-viewer.css
                  </code>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/50 rounded-lg p-3 border">
                  <div className="text-xs text-gray-500 mb-1">JavaScript</div>
                  <code className="text-sm text-blue-600 dark:text-blue-400 font-mono break-all">
                    https://od2.in/api-wd/workflow-viewer.js
                  </code>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">Copy-Paste Integration:</div>
                <code className="text-xs text-green-600 dark:text-green-400 block">
                  {'<link rel="stylesheet" href="https://od2.in/api-wd/workflow-viewer.css">'}<br/>
                  {'<script src="https://od2.in/api-wd/workflow-viewer.js"></script>'}
                </code>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Download JavaScript */}
              <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20 text-center">
                <div className="mb-3">
                  <Code className="w-8 h-8 mx-auto text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">JavaScript File</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  Main workflow viewer script with all functionality
                </p>
                <a 
                  href="/api-wd/workflow-viewer.js" 
                  download="workflow-viewer.js"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download JS
                </a>
                <div className="mt-2 text-xs text-primary">
                  workflow-viewer.js (~15KB)
                </div>
              </div>

              {/* Download CSS */}
              <div className="border border-secondary rounded-lg p-4 bg-secondary/50 text-center">
                <div className="mb-3">
                  <Layers className="w-8 h-8 mx-auto text-secondary-foreground" />
                </div>
                <h4 className="font-semibold text-secondary-foreground mb-2">CSS Styles</h4>
                <p className="text-sm text-secondary-foreground/80 mb-3">
                  Themes and styling for the workflow viewer
                </p>
                <a 
                  href="/api-wd/workflow-viewer.css" 
                  download="workflow-viewer.css"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download CSS
                </a>
                <div className="mt-2 text-xs text-secondary-foreground/80">
                  workflow-viewer.css (~8KB)
                </div>
              </div>

              {/* Live Demo */}
              <div className="border border-accent rounded-lg p-4 bg-accent/50 text-center">
                <div className="mb-3">
                  <Globe className="w-8 h-8 mx-auto text-accent-foreground" />
                </div>
                <h4 className="font-semibold text-accent-foreground mb-2">Public CDN Demo</h4>
                <p className="text-sm text-accent-foreground/80 mb-3">
                  Interactive demo with CDN integration examples and theme switching
                </p>
                <a 
                  href="/api-wd/demo.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Open Demo
                </a>
                <div className="mt-2 text-xs text-accent-foreground/80">
                  Opens in new tab
                </div>
              </div>
            </div>

            {/* Additional Demo Links */}
            <div className="border border-orange-200 dark:border-orange-800 rounded-lg p-4 bg-orange-50/50 dark:bg-orange-950/20">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">
                Additional Test Pages
              </h4>
              <div className="grid md:grid-cols-1 gap-3">
                <a 
                  href="/api-wd/demo.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm"
                >
                  <Globe className="w-4 h-4" />
                  CDN Integration Demo
                </a>
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                Both pages open in new tabs for easy testing alongside your development
              </p>
            </div>

            {/* Quick Start with Downloads */}
            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3">
                Quick Start Guide
              </h4>
              <ol className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Download both files using the buttons above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Upload files to your website&apos;s /api-wd/ directory (or any path)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Export your workflow using &ldquo;Export for Embed&rdquo;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Include the files and use <code>od2ApiWorkflowRenderer()</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">5.</span>
                  <span>Check the live demo for examples and inspiration</span>
                </li>
              </ol>
            </div>

            {/* File URLs for Copy-Paste */}
            <div className="space-y-3">
              <h4 className="font-semibold">CDN URLs for Your Website</h4>
              <div className="space-y-2">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm font-medium mb-1">CSS File:</div>
                  <code className="text-sm text-blue-600 dark:text-blue-400">
                    https://od2.in/api-wd/workflow-viewer.css
                  </code>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm font-medium mb-1">JavaScript File:</div>
                  <code className="text-sm text-blue-600 dark:text-blue-400">
                    https://od2.in/api-wd/workflow-viewer.js
                  </code>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Use the OD2 public CDN URLs for instant access, or download and host the files yourself.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Local CDN Integration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Local CDN Integration Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Embed your workflows in any website using our self-hosted CDN files. No external dependencies, full control over hosting and versioning.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                📦 Integration Process
              </h4>
              <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Build your workflow in the OD2 Workflow Builder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Click &ldquo;Export for Embed&rdquo; to create an optimized embed flow JSON file</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Download the files from OD2 CDN or copy them to your website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Save the *_embed_flow.json file to your website directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">5.</span>
                  <span>Include the CDN files and initialize the viewer with your JSON</span>
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Simple API (Recommended)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Use the global <code>od2ApiWorkflowRenderer</code> function for quick and easy embedding:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`<!DOCTYPE html>
<html>
<head>
  <!-- Include OD2 Public CDN -->
  <link rel="stylesheet" href="https://od2.in/api-wd/workflow-viewer.css">
  <script src="https://od2.in/api-wd/workflow-viewer.js"></script>
</head>
<body>
  <!-- Workflow Container -->
  <div id="my-workflow" style="height: 500px;"></div>
  
  <!-- Simple API - just pass container ID and JSON data -->
  <script>
    // Your workflow data (from API, file, or inline)
    const workflowData = {
      name: "My Workflow",
      nodes: [...],
      edges: [...]
    };
    
    // Render the workflow
    od2ApiWorkflowRenderer('my-workflow', workflowData);
  </script>
</body>
</html>`}
                  </code>
                </pre>
              </div>
              
              <h4 className="font-semibold">Advanced API</h4>
              <p className="text-sm text-muted-foreground mb-3">
                For more control, use the full OD2WorkflowViewer API:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`<!DOCTYPE html>
<html>
<head>
  <!-- Include OD2 Public CDN -->
  <link rel="stylesheet" href="https://od2.in/api-wd/workflow-viewer.css">
  <script src="https://od2.in/api-wd/workflow-viewer.js"></script>
</head>
<body>
  <!-- Workflow Container -->
  <div id="my-workflow" style="height: 500px;"></div>
  
  <!-- Initialize Viewer -->
  <script>
    OD2WorkflowViewer.render({
      container: '#my-workflow',
      workflowUrl: './my-workflow_embed_flow.json',
      theme: 'light',
      fitView: true,
      interactive: true
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Simple API Usage</h4>
                <p className="text-sm text-muted-foreground mb-2">Basic function call:</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                  <code>od2ApiWorkflowRenderer(containerId, jsonData)</code>
                </div>
                <p className="text-sm text-muted-foreground mb-2">With options:</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
                  <code>{`od2ApiWorkflowRenderer('my-workflow', data, {
  theme: 'dark',
  height: '600px',
  interactive: true
})`}</code>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Configuration Options</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">container</code>
                    <span className="text-muted-foreground">CSS selector or DOM element</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">workflowUrl</code>
                    <span className="text-muted-foreground">Path to embed flow JSON</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">theme</code>
                    <span className="text-muted-foreground">&lsquo;light&rsquo;, &lsquo;dark&rsquo;, or &lsquo;auto&rsquo;</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">interactive</code>
                    <span className="text-muted-foreground">Enable pan/zoom/drag</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-muted px-2 py-1 rounded">fitView</code>
                    <span className="text-muted-foreground">Auto-fit to container</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Local CDN Benefits</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    No external dependencies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Full control over versioning
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    No CORS issues
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Faster loading from your domain
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Customizable and brandable
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Best Practices & Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-green-600 flex items-center gap-2">
                  ✅ Best Practices
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="border-l-2 border-green-300 pl-3">
                    <span className="font-medium text-green-600">Export Strategy:</span>
                    <p>Always use &ldquo;Export for Embed&rdquo; for website integration to ensure optimal file size and loading performance</p>
                  </div>
                  <div className="border-l-2 border-green-300 pl-3">
                    <span className="font-medium text-green-600">Testing:</span>
                    <p>Test embed flow JSON files in a staging environment before production deployment</p>
                  </div>
                  <div className="border-l-2 border-green-300 pl-3">
                    <span className="font-medium text-green-600">Container Setup:</span>
                    <p>Set explicit container dimensions (height/width) for consistent layout across devices</p>
                  </div>
                  <div className="border-l-2 border-green-300 pl-3">
                    <span className="font-medium text-green-600">Documentation:</span>
                    <p>Include API documentation links in nodes for interactive and informative workflows</p>
                  </div>
                  <div className="border-l-2 border-green-300 pl-3">
                    <span className="font-medium text-green-600">Mobile UX:</span>
                    <p>Consider using interactive: false for mobile users to improve touch interaction</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-orange-600 flex items-center gap-2">
                  ⚠️ Common Issues
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="border-l-2 border-orange-300 pl-3">
                    <span className="font-medium text-orange-600">Wrong Export:</span>
                    <p>Using full workflow export instead of embed flow export causes slower loading and larger file sizes</p>
                  </div>
                  <div className="border-l-2 border-orange-300 pl-3">
                    <span className="font-medium text-orange-600">Missing Height:</span>
                    <p>Not setting container height causes layout issues and invisible workflow displays</p>
                  </div>
                  <div className="border-l-2 border-orange-300 pl-3">
                    <span className="font-medium text-orange-600">CORS Errors:</span>
                    <p>External image URLs may be blocked by CORS policies - use local images when possible</p>
                  </div>
                  <div className="border-l-2 border-orange-300 pl-3">
                    <span className="font-medium text-orange-600">Script Loading:</span>
                    <p>Scripts loading before DOM is ready - ensure proper script placement or use DOMContentLoaded</p>
                  </div>
                  <div className="border-l-2 border-orange-300 pl-3">
                    <span className="font-medium text-orange-600">JSON Fetch:</span>
                    <p>Missing error handling for JSON fetch failures - check network tab for loading issues</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Keyboard Shortcuts & Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Canvas Navigation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Mouse Wheel</kbd>
                    <span className="text-muted-foreground">Zoom in/out</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Click + Drag</kbd>
                    <span className="text-muted-foreground">Pan canvas</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + Scroll</kbd>
                    <span className="text-muted-foreground">Fine zoom</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Node Actions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Click</kbd>
                    <span className="text-muted-foreground">Select node</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Drag</kbd>
                    <span className="text-muted-foreground">Move node</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Delete</kbd>
                    <span className="text-muted-foreground">Remove selected</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Workflow Actions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + S</kbd>
                    <span className="text-muted-foreground">Quick export</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + O</kbd>
                    <span className="text-muted-foreground">Import file</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">F11</kbd>
                    <span className="text-muted-foreground">Fullscreen</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples and Implementation Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Code Examples & Implementation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Complete implementation examples and function details for the <code>od2ApiWorkflowRenderer</code> function.
            </p>

            {/* Function Signature */}
            <div className="space-y-4">
              <h4 className="font-semibold">Function Signature</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`// Global function available after including workflow-viewer.js
od2ApiWorkflowRenderer(containerId, workflowData, options)

Parameters:
  containerId  (string)  - Container element ID (without #)
  workflowData (object)  - Workflow JSON from "Export for Embed"
  options      (object)  - Optional configuration object

Returns:
  WorkflowRenderer instance for advanced control`}</code>
                </pre>
              </div>
            </div>

            {/* Basic Implementation */}
            <div className="space-y-4">
              <h4 className="font-semibold">Basic Implementation</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My API Workflow</title>
  
  <!-- Include OD2 Workflow Viewer CSS -->
  <link rel="stylesheet" href="https://od2.in/api-wd/workflow-viewer.css">
</head>
<body>
  <!-- Container with explicit dimensions -->
  <div id="api-workflow" style="
    width: 100%;
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 8px;
  "></div>

  <!-- Include OD2 Workflow Viewer JavaScript -->
  <script src="https://od2.in/api-wd/workflow-viewer.js"></script>
  
  <script>
    // Load and render workflow
    fetch('./my-api-workflow_embed_flow.json')
      .then(response => response.json())
      .then(workflowData => {
        od2ApiWorkflowRenderer('api-workflow', workflowData);
      })
      .catch(error => {
        console.error('Failed to load workflow:', error);
      });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>
            </div>

            {/* Advanced Configuration */}
            <div className="space-y-4">
              <h4 className="font-semibold">Advanced Configuration</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`// Advanced usage with all configuration options
od2ApiWorkflowRenderer('my-workflow', workflowData, {
  // Visual Options
  theme: 'dark',              // 'light', 'dark', or 'auto'
  width: '100%',              // Container width
  height: '600px',            // Container height
  
  // Interaction Options
  interactive: true,          // Enable pan/zoom/drag
  showControls: true,         // Show zoom controls
  fitView: true,             // Auto-fit workflow to container
  
  // Event Handlers
  onNodeClick: function(node) {
    console.log('Node clicked:', node.data.name);
    
    // Open API documentation
    if (node.data.apiDocumentationLink) {
      window.open(node.data.apiDocumentationLink, '_blank');
    }
    
    // Custom analytics tracking
    analytics.track('workflow_node_clicked', {
      nodeName: node.data.name,
      method: node.data.method,
      path: node.data.path
    });
  },
  
  // Error Handling
  onError: function(error) {
    console.error('Workflow error:', error);
    alert('Failed to load workflow: ' + error.message);
  }
});`}</code>
                </pre>
              </div>
            </div>

            {/* Performance Tips */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                🚀 Performance & Best Practices
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">Optimization Tips:</span>
                  <ul className="text-blue-600 dark:text-blue-400 mt-1 space-y-1 ml-4">
                    <li>• Use &ldquo;Export for Embed&rdquo; for smaller file sizes</li>
                    <li>• Set explicit container dimensions</li>
                    <li>• Implement proper error handling</li>
                    <li>• Cache workflow JSON files when possible</li>
                    <li>• Use theme: &lsquo;auto&rsquo; for system preference</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium text-blue-700 dark:text-blue-300">Security Notes:</span>
                  <ul className="text-blue-600 dark:text-blue-400 mt-1 space-y-1 ml-4">
                    <li>• Validate JSON data before rendering</li>
                    <li>• Use HTTPS for external resources</li>
                    <li>• Sanitize user-provided URLs</li>
                    <li>• Implement CSP headers for security</li>
                    <li>• Avoid exposing sensitive API data</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm bg-muted/50 rounded-lg p-4">
          <div className="space-y-2">
            <p className="font-medium">Need Additional Help?</p>
            <p>
              Ensure your embed flow JSON is properly formatted and accessible from your website. 
              For OpenAPI schema issues, verify that each endpoint includes an operationId.
            </p>
            <p>
              Check browser console for loading errors and verify all local CDN files are properly hosted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
