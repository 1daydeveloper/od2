# OD2 API Workflow Renderer - Final Usage

## 🎯 Simple Embedding

Users can now embed workflows with the global function `od2ApiWorkflowRenderer`:

```html
<script src="https://od2.in/awd/workflow-viewer.js"></script>
<link rel="stylesheet" href="https://od2.in/awd/workflow-viewer.css">

<div id="workflow"></div>
<script>
  od2ApiWorkflowRenderer('workflow', jsonData);
</script>
```

## 📝 Function Signature

```javascript
od2ApiWorkflowRenderer(containerId, jsonData, options)
```

**Parameters:**
- `containerId` (string): Container element ID (without #)
- `jsonData` (object): Workflow JSON from "Export for Embed"
- `options` (object, optional): Configuration options

## 🎨 Examples

### Basic Usage
```javascript
od2ApiWorkflowRenderer('my-workflow', workflowData);
```

### With Options
```javascript
od2ApiWorkflowRenderer('my-workflow', workflowData, {
  theme: 'dark',
  height: '600px',
  interactive: true,
  showControls: true,
  onNodeClick: (node) => console.log('Clicked:', node.data.name)
});
```

### Loading from URL
```javascript
fetch('/api/workflow.json')
  .then(response => response.json())
  .then(workflowData => {
    od2ApiWorkflowRenderer('workflow', workflowData, {
      theme: 'auto',
      fitView: true
    });
  });
```

## ✅ Updated Files

- ✅ `public/awd/workflow-viewer.js` - Added `od2ApiWorkflowRenderer` global function
- ✅ `public/awd/demo.html` - Updated examples to use new function name
- ✅ `src/app/awd/docs/page.js` - Updated documentation
- ✅ `public/awd/README.md` - Updated API documentation

## 🚀 Ready for Production

The workflow viewer is now ready with the `od2ApiWorkflowRenderer` function name following proper JavaScript naming conventions!
