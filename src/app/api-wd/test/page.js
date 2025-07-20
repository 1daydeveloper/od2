'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';

export default function WorkflowTestPage() {
  const [workflowData, setWorkflowData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState('/examples/sample-workflow.json');
  const [theme, setTheme] = useState('light');
  const workflowContainerRef = useRef(null);

  const availableWorkflows = useMemo(() => [
    { path: '/examples/sample-workflow.json', name: 'E-commerce Order Processing', type: 'file' },
    { path: '/examples/sample-embed-flow.json', name: 'Sample Embed Flow', type: 'file' },
    { path: '/examples/sample-openapi.json', name: 'OpenAPI Integration', type: 'file' },
    { path: 'sample-workflow.json', name: '🔗 API: E-commerce Order Processing', type: 'api' },
    { path: 'sample-embed-flow.json', name: '🔗 API: Sample Embed Flow', type: 'api' },
    { path: 'sample-openapi.json', name: '🔗 API: OpenAPI Integration', type: 'api' }
  ], []);

  // Render workflow using the viewer
  const renderWorkflow = useCallback((data) => {
    if (typeof window !== 'undefined' && window.od2ApiWorkflowRenderer && workflowContainerRef.current) {
      // Clear previous content
      workflowContainerRef.current.innerHTML = '';
      
      // Render new workflow
      window.od2ApiWorkflowRenderer(workflowContainerRef.current, data, {
        theme: theme,
        height: '600px',
        width: '100%',
        interactive: true,
        showControls: true,
        fitView: true
      });
    }
  }, [theme]);

  // Load workflow data
  const loadWorkflow = useCallback(async (filePath) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      let data;

      // Check if this is an API call or direct file access
      const selectedWorkflow = availableWorkflows.find(w => w.path === filePath);
      
      if (selectedWorkflow?.type === 'api') {
        // Use API endpoint
        response = await fetch(`/api/workflow?file=${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to load workflow from API: ${response.statusText}`);
        }
        const apiResult = await response.json();
        data = apiResult.data;
      } else {
        // Direct file access
        response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load workflow: ${response.statusText}`);
        }
        data = await response.json();
      }
      
      setWorkflowData(data);
      
      // Render workflow after data is loaded
      setTimeout(() => renderWorkflow(data), 100);
    } catch (err) {
      setError(err.message);
      console.error('Error loading workflow:', err);
    } finally {
      setIsLoading(false);
    }
  }, [renderWorkflow, availableWorkflows]);

  // Load workflow when file selection changes
  useEffect(() => {
    if (selectedFile) {
      loadWorkflow(selectedFile);
    }
  }, [selectedFile, loadWorkflow]);

  // Re-render when theme changes
  useEffect(() => {
    if (workflowData) {
      renderWorkflow(workflowData);
    }
  }, [theme, workflowData, renderWorkflow]);

  // Load scripts on component mount
  useEffect(() => {
    const loadScripts = () => {
      // Load CSS
      if (!document.querySelector('link[href="/api-wd/workflow-viewer.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '/api-wd/workflow-viewer.css';
        document.head.appendChild(cssLink);
      }

      // Load JS
      if (!document.querySelector('script[src="/api-wd/workflow-viewer.js"]')) {
        const script = document.createElement('script');
        script.src = '/api-wd/workflow-viewer.js';
        script.onload = () => {
          // Scripts loaded, render workflow if data is available
          if (workflowData) {
            renderWorkflow(workflowData);
          }
        };
        document.head.appendChild(script);
      } else if (workflowData) {
        // Scripts already loaded, render immediately
        renderWorkflow(workflowData);
      }
    };

    loadScripts();
  }, [workflowData, renderWorkflow]);

  const handleCustomJson = () => {
    const customJson = prompt('Paste your workflow JSON here:');
    if (customJson) {
      try {
        const data = JSON.parse(customJson);
        setWorkflowData(data);
        setSelectedFile('custom');
        renderWorkflow(data);
      } catch (err) {
        alert('Invalid JSON format');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/api-wd"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to API Workflow Designer
          </Link>
          <Link 
            href="/api-wd/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            📚 Documentation
          </Link>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🔧 Workflow Viewer Test Page
          </h1>
          <p className="text-muted-foreground mb-6">
            Test the workflow viewer with different JSON files and themes
          </p>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Workflow Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Workflow
              </label>
              <select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
              >
                {availableWorkflows.map((workflow) => (
                  <option key={workflow.path} value={workflow.path}>
                    {workflow.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleCustomJson}
                className="mt-2 px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
              >
                Load Custom JSON
              </button>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Theme
              </label>
              <div className="flex gap-2">
                {['light', 'dark', 'auto'].map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => setTheme(themeOption)}
                    className={`px-4 py-2 rounded-md capitalize transition-colors ${
                      theme === themeOption
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {themeOption}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          {isLoading && (
            <div className="flex items-center gap-2 text-primary mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              Loading workflow...
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="text-destructive">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-destructive">Error loading workflow</h3>
                  <div className="mt-1 text-sm text-destructive/80">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Data Preview */}
          {workflowData && (
            <div className="mb-6">
              <details className="bg-muted rounded-md p-4">
                <summary className="cursor-pointer font-medium text-foreground hover:text-foreground/80">
                  📋 Workflow Data Preview
                </summary>
                <pre className="mt-3 text-xs overflow-auto max-h-40 bg-background p-3 rounded border border-border text-foreground">
                  {JSON.stringify(workflowData, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* Workflow Viewer Container */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            🎨 Workflow Visualization
          </h2>
          
          <div 
            ref={workflowContainerRef}
            className="min-h-[600px] border-2 border-dashed border-border rounded-lg"
            style={{ height: '600px' }}
          >
            {!workflowData && !isLoading && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2">Select a workflow to visualize</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-accent/50 border border-accent rounded-lg p-6">
          <h3 className="text-lg font-semibold text-accent-foreground mb-3">
            📚 How to Use
          </h3>
          <ul className="space-y-2 text-accent-foreground/80">
            <li>• Select a predefined workflow from the dropdown or load custom JSON</li>
            <li>• Switch between light, dark, and auto themes</li>
            <li>• Use mouse to pan and zoom the workflow visualization</li>
            <li>• Click on nodes to see additional information</li>
            <li>• The viewer automatically loads the necessary CSS and JS files</li>
            <li>• Both direct file access and API endpoints are supported</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
