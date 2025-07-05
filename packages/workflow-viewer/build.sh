#!/bin/bash

# OD2 Workflow Viewer Build Script

echo "🔄 Building OD2 Workflow Viewer..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the package
echo "🔨 Building package..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📄 Generated files:"
    ls -la dist/
    echo ""
    echo "🚀 Package is ready for publishing!"
    echo "   - React components: dist/index.js, dist/index.esm.js"
    echo "   - Vanilla JS: dist/vanilla.js, dist/vanilla.min.js"
    echo "   - Type definitions: dist/index.d.ts"
    echo ""
    echo "📚 Test with:"
    echo "   - Open demo.html in a browser"
    echo "   - Or run: npm link && npm link @od2/workflow-viewer"
else
    echo "❌ Build failed!"
    exit 1
fi
