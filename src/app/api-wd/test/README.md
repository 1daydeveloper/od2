# Workflow Viewer Test Page

This test page demonstrates the OD2 Workflow Viewer functionality at `/api-wd/test`.

## Features

### 🔧 Workflow Loading
- **File-based Loading**: Load workflows directly from `/public/examples/` directory
- **API-based Loading**: Load workflows through the `/api/workflow` endpoint
- **Custom JSON Input**: Paste custom workflow JSON for testing

### 🎨 Theme Support
- **Light Theme**: Clean light interface
- **Dark Theme**: Dark mode for better visibility
- **Auto Theme**: Follows system preference

### 📊 Interactive Visualization
- **Pan & Zoom**: Mouse controls for navigation
- **Node Interaction**: Click nodes for details
- **Responsive Design**: Works on different screen sizes

## Available Workflows

The test page includes several sample workflows:

1. **E-commerce Order Processing** - Complete order workflow
2. **Sample Embed Flow** - Basic embedding example
3. **OpenAPI Integration** - API documentation workflow

Each workflow is available in two loading modes:
- Direct file access from `/public/examples/`
- API endpoint access through `/api/workflow`

## API Endpoints

### GET `/api/workflow?file={filename}`
Load a predefined workflow file.

**Parameters:**
- `file`: Filename from the examples directory

**Response:**
```json
{
  "success": true,
  "data": { /* workflow object */ },
  "filename": "sample-workflow.json",
  "timestamp": "2024-07-05T10:30:00.000Z"
}
```

### POST `/api/workflow`
Validate custom workflow data.

**Body:**
```json
{
  "workflow": { /* custom workflow object */ }
}
```

## Workflow JSON Structure

Workflows should follow this basic structure:

```json
{
  "name": "Workflow Name",
  "description": "Workflow description",
  "nodes": [
    {
      "id": "node-1",
      "type": "customNode",
      "position": { "x": 100, "y": 100 },
      "data": {
        "name": "Node Name",
        "method": "GET|POST|PUT|DELETE",
        "path": "/api/endpoint",
        "operationId": "operationName",
        "description": "Node description",
        "apiDocumentationLink": "https://docs.example.com",
        "imageLink": "https://example.com/icon.png",
        "tags": ["tag1", "tag2"]
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "smoothstep"
    }
  ]
}
```

## Usage

1. Visit `/api-wd/test` in your browser
2. Select a workflow from the dropdown
3. Choose a theme (light/dark/auto)
4. Interact with the visualization
5. Optionally load custom JSON

## Files

- `/src/app/api-wd/test/page.js` - Main test page component
- `/src/app/api-wd/test/layout.js` - Layout configuration
- `/src/app/api/workflow/route.js` - API endpoint for workflow data
- `/public/api-wd/workflow-viewer.js` - Workflow renderer script
- `/public/api-wd/workflow-viewer.css` - Viewer styles
- `/public/examples/*.json` - Sample workflow files

## Development

The test page automatically:
- Loads required CSS and JavaScript files
- Handles React hook dependencies properly
- Validates JSON input
- Provides error handling and loading states
- Supports both file and API-based loading

## Error Handling

The page includes comprehensive error handling for:
- Invalid JSON format
- Missing workflow files
- API endpoint failures
- Network connectivity issues
- Script loading problems
