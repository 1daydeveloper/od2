# Quick Start Guide - OD2 Workflow Viewer

## Step 1: Export Your Workflow

From the OD2 Workflow Builder:

1. Build your API workflow by dragging endpoints to the canvas
2. Click **"Export for Embed"** button (not "Export Workflow")
3. Save the `*_embed_flow.json` file

The embed export creates a lightweight file optimized for embedding, containing only the essential flow data without the full OpenAPI schema.

## Step 2: Choose Your Integration Method

### Option A: React Component (NPM)

```bash
npm install @od2/workflow-viewer
```

```jsx
import { WorkflowViewer } from '@od2/workflow-viewer';
import embedFlowData from './my-workflow_embed_flow.json';

function MyPage() {
  return (
    <WorkflowViewer 
      workflow={embedFlowData} 
      options={{
        width: '100%',
        height: '600px',
        theme: 'light',
        fitView: true
      }}
    />
  );
}
```

### Option B: Vanilla JavaScript (CDN)

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/@od2/workflow-viewer/dist/vanilla.min.js"></script>
</head>
<body>
    <div id="my-workflow" style="width: 100%; height: 600px;"></div>
    
    <script>
        fetch('./my-workflow_embed_flow.json')
            .then(r => r.json())
            .then(data => {
                new WorkflowViewer.EmbeddableWorkflowViewer(data, {
                    container: '#my-workflow',
                    theme: 'light',
                    fitView: true
                });
            });
    </script>
</body>
</html>
```

## Step 3: Customize (Optional)

```javascript
const options = {
    width: '100%',           // Container width
    height: '500px',         // Container height  
    theme: 'dark',          // 'light', 'dark', or 'auto'
    interactive: true,       // Enable pan/zoom
    showControls: true,      // Show navigation buttons
    showMinimap: false,      // Hide minimap for cleaner look
    fitView: true           // Auto-fit workflow to container
};
```

## That's It! 🎉

Your workflow is now embedded and ready to display. The viewer automatically:

- ✅ Renders all nodes with API method badges
- ✅ Shows success/failure connection flows  
- ✅ Displays descriptions and documentation links
- ✅ Supports responsive design
- ✅ Handles light/dark themes
- ✅ Provides interactive navigation

## Need Help?

- Check the full [README.md](./README.md) for detailed API reference
- Open [demo.html](./demo.html) to see a working example
- Visit the [OD2 Workflow Builder](/) to create and export workflows
