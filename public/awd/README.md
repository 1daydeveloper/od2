# OD2 Workflow Viewer - Embeddable Component

A lightweight, standalone JavaScript component for embedding interactive workflow diagrams in any website.

## 🌐 Public CDN (Recommended)

Include the workflow viewer directly from OD2's CDN - no downloads needed:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Workflow App</title>
  <link rel="stylesheet" href="https://od2.in/awd/workflow-viewer.css">
</head>
<body>
  <div id="my-workflow" style="height: 500px;"></div>
  
  <script src="https://od2.in/awd/workflow-viewer.js"></script>
  <script>
    // Your workflow data
    const workflowData = {
      name: "Payment Processing",
      nodes: [/* your nodes */],
      edges: [/* your edges */]
    };
    
    // Simple API - just pass container ID and data
    od2ApiWorkflowRenderer('my-workflow', workflowData);
  </script>
</body>
</html>
```

## 🚀 Local Development

For local OD2 development, use relative paths:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/awd/workflow-viewer.css">
  <script src="/awd/workflow-viewer.js"></script>
</head>
<body>
  <div id="my-workflow" style="height: 500px;"></div>
  
  <script>
    fetch('my-workflow.json')
      .then(response => response.json())
      .then(workflowData => {
        od2ApiWorkflowRenderer('my-workflow', workflowData);
      });
  </script>
</body>
</html>
```

### With Options

```javascript
od2ApiWorkflowRenderer('my-workflow', workflowData, {
  theme: 'dark',
  height: '600px',
  interactive: true,
  showControls: true,
  onNodeClick: function(node) {
    console.log('Node clicked:', node);
  }
});
```

## 📖 API Reference

### `od2ApiWorkflowRenderer(containerId, jsonData, options)`

The global function for simple workflow embedding.

**Parameters:**
- `containerId` (string): ID of the container element (without #)
- `jsonData` (object): Workflow data from "Export for Embed"
- `options` (object, optional): Configuration options

**Options:**
- `theme`: 'light', 'dark', or 'auto' (default: 'light')
- `width`: Container width (default: '100%')
- `height`: Container height (default: '500px')
- `interactive`: Enable pan/zoom/drag (default: true)
- `showControls`: Show zoom controls (default: true)
- `fitView`: Auto-fit workflow to container (default: true)
- `onNodeClick`: Callback function for node clicks

### Advanced API

For more control, use the full `OD2WorkflowViewer` object:

```javascript
OD2WorkflowViewer.render({
  container: '#my-workflow',
  workflow: workflowData,
  // ... all the same options as above
});
```

## 🎨 Themes

The viewer supports three themes:
- **Light**: Clean, professional appearance
- **Dark**: Modern dark theme
- **Auto**: Matches user's system preference

## 📁 File Structure

```
/awd/
  ├── workflow-viewer.js     # Main viewer component
  ├── workflow-viewer.css    # Styles and themes
  └── demo.html             # Integration examples
```

## 🔧 Integration Steps

1. **Create Workflow**: Use the OD2 Workflow Builder to design your workflow
2. **Export for Embed**: Click "Export for Embed" to get optimized JSON
3. **Copy Files**: Add `workflow-viewer.js` and `workflow-viewer.css` to your website
4. **Embed**: Use the simple `od2ApiWorkflowRenderer()` function to display your workflow

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

## 📄 License

Part of the OD2 platform. See main project for licensing information.

## 🔗 Resources

- [Workflow Builder](../awd/) - Create and edit workflows
- [Documentation](../awd/docs/) - Complete integration guide
- [Demo](demo.html) - Live integration examples
