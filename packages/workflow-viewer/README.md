# OD2 Workflow Viewer

An embeddable workflow viewer for displaying API workflows created with the OD2 Visual Workflow Builder. This package provides both React components and vanilla JavaScript options for embedding workflow diagrams in any website.

## Installation

### NPM Package (React)

```bash
npm install @od2/workflow-viewer
```

### CDN (Vanilla JavaScript)

```html
<script src="https://unpkg.com/@od2/workflow-viewer/dist/vanilla.min.js"></script>
```

## Usage

### React Component

```jsx
import React from 'react';
import { WorkflowViewer } from '@od2/workflow-viewer';

const MyWorkflowPage = () => {
  const workflowData = {
    name: "My API Workflow",
    nodes: [
      {
        id: "node-1",
        type: "customNode",
        position: { x: 100, y: 100 },
        data: {
          name: "Authenticate User",
          description: "Verify user credentials",
          method: "POST",
          path: "/auth/login",
          apiDocumentationLink: "https://api.example.com/docs"
        }
      }
      // ... more nodes
    ],
    edges: [
      {
        id: "edge-1",
        source: "node-1",
        target: "node-2",
        sourceHandle: "success"
      }
      // ... more edges
    ]
  };

  const options = {
    width: '100%',
    height: '600px',
    theme: 'light',
    interactive: true,
    showControls: true,
    showMinimap: true,
    fitView: true
  };

  return (
    <div>
      <h1>My Workflow</h1>
      <WorkflowViewer workflow={workflowData} options={options} />
    </div>
  );
};

export default MyWorkflowPage;
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
    <title>Workflow Viewer Example</title>
    <script src="https://unpkg.com/@od2/workflow-viewer/dist/vanilla.min.js"></script>
</head>
<body>
    <div id="workflow-container" style="width: 100%; height: 600px;"></div>
    
    <script>
        const workflowData = {
            name: "My API Workflow",
            nodes: [
                {
                    id: "node-1",
                    type: "customNode",
                    position: { x: 100, y: 100 },
                    data: {
                        name: "Authenticate User",
                        description: "Verify user credentials",
                        method: "POST",
                        path: "/auth/login"
                    }
                }
            ],
            edges: []
        };

        const viewer = new WorkflowViewer.EmbeddableWorkflowViewer(workflowData, {
            container: '#workflow-container',
            theme: 'light',
            interactive: true,
            showControls: true,
            fitView: true
        });
    </script>
</body>
</html>
```

### Loading from Embed Flow Export

The OD2 Workflow Builder provides a special "Export for Embed" option that creates optimized JSON files specifically for embedding. These files are lightweight and contain only the essential flow data:

```javascript
// Load embed flow from exported JSON file
fetch('/path/to/your-workflow_embed_flow.json')
  .then(response => response.json())
  .then(embedFlowData => {
    const viewer = new WorkflowViewer.EmbeddableWorkflowViewer(embedFlowData, {
      container: '#workflow-container',
      fitView: true,
      theme: 'light'
    });
  });
```

#### Embed Flow vs Full Workflow Export

| Feature | Full Workflow Export | Embed Flow Export |
|---------|---------------------|-------------------|
| File Size | Larger (includes OpenAPI schema) | Smaller (flow data only) |
| Use Case | Backup, sharing, editing | Embedding, display |
| Contains | Nodes, edges, OpenAPI schema, metadata | Nodes, edges, basic metadata |
| Best For | Importing back to builder | External site embedding |

## API Reference

### WorkflowViewer (React)

#### Props

- **workflow** (WorkflowData): The workflow data object
- **options** (ViewerOptions): Configuration options

#### ViewerOptions

```typescript
interface ViewerOptions {
  width?: string | number;          // Default: '100%'
  height?: string | number;         // Default: '600px'
  theme?: 'light' | 'dark' | 'auto'; // Default: 'light'
  interactive?: boolean;            // Default: true
  showMinimap?: boolean;           // Default: true
  showControls?: boolean;          // Default: true
  showBackground?: boolean;        // Default: true
  fitView?: boolean;               // Default: true
  className?: string;              // Additional CSS class
  style?: React.CSSProperties;     // Additional styles
}
```

### EmbeddableWorkflowViewer (Vanilla JS)

#### Constructor

```javascript
new WorkflowViewer.EmbeddableWorkflowViewer(workflowData, options)
```

#### Options

```typescript
interface VanillaViewerOptions {
  container: string | HTMLElement;  // Required: CSS selector or DOM element
  width?: string | number;          // Default: '100%'
  height?: string | number;         // Default: '600px'
  theme?: 'light' | 'dark' | 'auto'; // Default: 'light'
  interactive?: boolean;            // Default: true
  showMinimap?: boolean;           // Default: false
  showControls?: boolean;          // Default: true
  showBackground?: boolean;        // Default: true
  fitView?: boolean;               // Default: true
  className?: string;              // Additional CSS class
  style?: Record<string, string>;  // Additional styles
}
```

#### Methods

- **updateWorkflow(workflowData)**: Update the displayed workflow
- **fitToView()**: Fit the workflow to the container
- **zoomIn()**: Zoom in
- **zoomOut()**: Zoom out
- **reset()**: Reset zoom and pan
- **destroy()**: Clean up and remove the viewer

## Workflow Data Format

The workflow data should follow this structure:

```typescript
interface WorkflowData {
  name: string;
  version?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  openAPISchema?: any;
  metadata?: {
    nodeCount: number;
    edgeCount: number;
    hasOpenAPISchema: boolean;
  };
}

interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    name: string;
    description?: string;
    method?: string;                    // HTTP method (GET, POST, etc.)
    path?: string;                      // API endpoint path
    operationId?: string;               // OpenAPI operation ID
    tags?: string[];                    // API tags
    apiDocumentationLink?: string;      // Link to API documentation
    imageLink?: string;                 // Node icon URL
  };
}

interface WorkflowEdge {
  id: string;
  source: string;                       // Source node ID
  target: string;                       // Target node ID
  sourceHandle?: string;                // 'success' or 'failure'
  targetHandle?: string;
  animated?: boolean;
  label?: string;
}
```

## Styling

### CSS Classes

The viewer adds these CSS classes that you can style:

- `.workflow-viewer`: Main container
- `.workflow-node`: Individual workflow nodes

### Custom Themes

For the vanilla JavaScript version, you can create custom themes by setting CSS variables:

```css
.workflow-viewer {
  --bg-color: #ffffff;
  --node-bg: #f8f9fa;
  --node-border: #e2e8f0;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}

.workflow-viewer.dark-theme {
  --bg-color: #1a1a1a;
  --node-bg: #374151;
  --node-border: #4b5563;
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
}
```

## Examples

### Loading from Exported JSON

```javascript
// Load workflow from exported JSON file
fetch('/path/to/exported-workflow.json')
  .then(response => response.json())
  .then(workflowData => {
    const viewer = new WorkflowViewer.EmbeddableWorkflowViewer(workflowData, {
      container: '#workflow-container',
      fitView: true
    });
  });
```

### Dynamic Updates

```javascript
const viewer = new WorkflowViewer.EmbeddableWorkflowViewer(initialData, options);

// Update workflow data
viewer.updateWorkflow(newWorkflowData);

// Control zoom and pan
viewer.fitToView();
viewer.zoomIn();
viewer.reset();
```

### Responsive Design

```css
.workflow-container {
  width: 100%;
  height: 60vh;
  min-height: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .workflow-container {
    height: 50vh;
    min-height: 300px;
  }
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

This package is part of the OD2 Visual Workflow Builder project. For issues and contributions, please visit the [main repository](https://github.com/od2/workflow-builder).

## License

MIT License - see LICENSE file for details.
