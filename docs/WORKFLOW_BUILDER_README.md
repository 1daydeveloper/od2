# Automated Workflow Designer (AWD)

A powerful JSON-Based Visual Workflow Builder with OpenAPI Integration that can be embedded via iframe for documentation systems.

## Features

### 🔗 Left Sidebar - OpenAPI Schema & Search
- Upload valid OpenAPI schema files (YAML or JSON)
- Parse and list available API endpoints from uploaded schema
- Search bar to filter/search API endpoints by path or operationId
- Drag endpoints from sidebar to create workflow nodes

### 🔧 Right Section - Workflow Builder Canvas
- Drag-and-drop visual workflow canvas powered by ReactFlow
- Create nodes by dragging APIs from the left sidebar
- Connect nodes with two types of connectors:
  - ✅ Success (green)
  - ❌ Failure (red)
- Node configuration popup with the following fields:
  - **name** (string) - Descriptive name for the node
  - **apiDocumentationLink** (URL) - Link to API documentation
  - **description** (text) - Detailed description of the node
  - **imageUpload** - Upload image from local device
  - **imageLink** (optional) - External image URL

### 💾 Workflow Management
- **Save**: Export complete flow as JSON file (no backend required)
- **Import**: Load workflows from JSON files
- **Re-upload**: Load and visually edit existing workflows
- **Clear**: Reset the entire workflow canvas

### 🧩 Embedding and Use
- **iframe embeddable** - Works in static or no-backend setups
- **Theme support** - Automatically adapts to dark/light themes
- **Responsive design** - Works on different screen sizes
- **Export/Import** - Easy workflow sharing via JSON files

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd od2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000/awd](http://localhost:3000/awd) in your browser

## Usage

### 1. Upload OpenAPI Schema
- Click the upload area in the left sidebar
- Select a valid OpenAPI schema file (JSON or YAML)
- The endpoints will be automatically parsed and displayed

### 2. Create Workflow Nodes
- Drag any endpoint from the left sidebar to the canvas
- A node configuration modal will open
- Fill in the required information and save

### 3. Connect Nodes
- Drag from the green handle (✅) for success connections
- Drag from the red handle (❌) for failure connections
- Connect to any other node's input (left side)

### 4. Save and Export
- Use the toolbar to save your workflow as JSON
- Import previously saved workflows
- Clear the canvas to start fresh

### 5. Embed in Documentation
- Use the "Embed Preview" button to see fullscreen mode
- Copy the URL to embed as an iframe in your documentation:

```html
<iframe 
  src="http://localhost:3000/awd" 
  width="100%" 
  height="600px" 
  frameborder="0">
</iframe>
```

## Workflow JSON Structure

Exported workflows follow this structure:

```json
{
  "name": "My API Workflow",
  "nodes": [
    {
      "id": "node-1",
      "type": "customNode",
      "position": { "x": 100, "y": 100 },
      "data": {
        "name": "Create User",
        "method": "POST",
        "path": "/api/users",
        "description": "Creates a new user account",
        "apiDocumentationLink": "https://api-docs.example.com/users",
        "imageLink": "https://example.com/user-icon.png"
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "sourceHandle": "success",
      "label": "✅ Success"
    }
  ],
  "openAPISchema": { /* Original OpenAPI schema */ },
  "createdAt": "2025-01-03T..."
}
```

## API Integration

### Supported OpenAPI Features
- Path parameters
- Query parameters  
- Request/response schemas
- Operation IDs
- Tags and descriptions
- HTTP methods (GET, POST, PUT, DELETE, etc.)

### Example OpenAPI Schema
```yaml
openapi: 3.0.0
info:
  title: Example API
  version: 1.0.0
paths:
  /users:
    post:
      operationId: createUser
      summary: Create a new user
      tags: [users]
      responses:
        '200':
          description: User created successfully
        '400':
          description: Invalid input
```

## Advanced Features

### Theme Support
The workflow builder automatically adapts to your site's theme:
- Light mode: Clean, professional appearance
- Dark mode: Easy on the eyes for extended use

### Keyboard Shortcuts
- `Delete` - Remove selected nodes/edges
- `Ctrl+A` - Select all
- `Ctrl+C` - Copy selection
- `Ctrl+V` - Paste

### Node Customization
- Upload custom icons for each node
- Add detailed descriptions
- Link to external API documentation
- Color-coded HTTP methods

## Technical Architecture

### Built With
- **Next.js 14** - React framework
- **ReactFlow** - Interactive node-based UI
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **YAML Parser** - OpenAPI schema parsing

### File Structure
```
src/
├── components/
│   └── workflow/
│       ├── WorkflowBuilder.js      # Main component
│       ├── OpenAPISidebar.js       # Schema upload & endpoint list
│       ├── CustomNode.js           # Individual workflow nodes
│       ├── NodeFormModal.js        # Node configuration modal
│       └── WorkflowToolbar.js      # Top toolbar
├── lib/
│   └── workflowUtils.js            # Import/export utilities
└── app/
    └── awd/
        ├── page.js                 # Main page
        └── layout.js               # Metadata & layout
```

## Deployment

### Static Deployment
The workflow builder works entirely client-side and can be deployed to any static hosting service:

- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront

### Environment Variables
No environment variables required for basic functionality.

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review example workflows

## Roadmap

### Planned Features
- [ ] Step-by-step workflow viewer
- [ ] Shareable links with preloaded JSON via URL params
- [ ] Workflow templates library
- [ ] Real-time collaboration
- [ ] API testing integration
- [ ] Custom node types
- [ ] Workflow versioning
- [ ] Export to other formats (PNG, SVG, PDF)

### Current Limitations
- No backend persistence (by design)
- No real-time collaboration yet
- Limited to OpenAPI 3.0+ schemas

---

Built with ❤️ for better API documentation and workflow visualization.
