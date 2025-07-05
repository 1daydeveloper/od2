/**
 * OD2 Workflow Viewer - Embeddable Script
 * Version: 1.0.0
 * 
 * Usage:
 * <script src="/api-wd/workflow-viewer.js"></script>
 * <link rel="stylesheet" href="/api-wd/workflow-viewer.css">
 * 
 * <div id="workflow-container"></div>
 * <script>
 *   // Simple API
 *   od2ApiWorkflowRenderer('workflow-container', workflowData);
 *   
 *   // Advanced API
 *   OD2WorkflowViewer.render({
 *     container: '#workflow-container',
 *     workflowUrl: '/path/to/workflow_embed_flow.json',
 *     theme: 'light',
 *     width: '100%',
 *     height: '500px'
 *   });
 * </script>
 */

(function(global) {
  'use strict';

  // Main Workflow Viewer Class
  class WorkflowRenderer {
    constructor(config) {
      this.config = {
        container: config.container,
        workflow: config.workflow || null,
        workflowUrl: config.workflowUrl || null,
        theme: config.theme || 'light',
        width: config.width || '100%',
        height: config.height || '500px',
        interactive: config.interactive !== false,
        showControls: config.showControls !== false,
        fitView: config.fitView !== false,
        onNodeClick: config.onNodeClick || null,
        ...config
      };

      this.container = null;
      this.workflowData = null;
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.isDragging = false;
      this.dragStart = { x: 0, y: 0 };

      this.init();
    }

    async init() {
      try {
        // Get container element
        this.container = typeof this.config.container === 'string' 
          ? document.querySelector(this.config.container)
          : this.config.container;

        if (!this.container) {
          throw new Error('Container element not found');
        }

        // Load workflow data
        if (this.config.workflow) {
          this.workflowData = this.config.workflow;
        } else if (this.config.workflowUrl) {
          await this.loadWorkflowFromUrl(this.config.workflowUrl);
        } else {
          throw new Error('No workflow data or URL provided');
        }

        // Setup container
        this.setupContainer();
        
        // Render workflow
        this.render();

        // Setup interactions
        if (this.config.interactive) {
          this.setupInteractions();
        }

        // Auto-fit view
        if (this.config.fitView) {
          setTimeout(() => this.fitToView(), 100);
        }

      } catch (error) {
        this.showError('Failed to initialize workflow viewer: ' + error.message);
      }
    }

    async loadWorkflowFromUrl(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        this.workflowData = await response.json();
      } catch (error) {
        throw new Error('Failed to load workflow from URL: ' + error.message);
      }
    }

    setupContainer() {
      this.container.className = `od2-workflow-viewer od2-theme-${this.config.theme}`;
      this.container.style.cssText = `
        width: ${this.config.width};
        height: ${this.config.height};
        position: relative;
        overflow: hidden;
        border: 1px solid var(--od2-border-color);
        border-radius: 8px;
        background: var(--od2-bg-color);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      `;
    }

    render() {
      if (!this.workflowData || !this.workflowData.nodes) {
        this.showError('Invalid workflow data');
        return;
      }

      // Create SVG container
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.style.cursor = this.config.interactive ? 'grab' : 'default';

      // Create main group for transformations
      const mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mainGroup.setAttribute('class', 'od2-main-group');
      svg.appendChild(mainGroup);

      // Render edges first (so they appear behind nodes)
      this.renderEdges(mainGroup);

      // Render nodes
      this.renderNodes(mainGroup);

      // Add controls if enabled
      if (this.config.showControls) {
        this.addControls();
      }

      // Clear container and add SVG
      this.container.innerHTML = '';
      this.container.appendChild(svg);

      // Store references
      this.svg = svg;
      this.mainGroup = mainGroup;
    }

    renderNodes(parent) {
      this.workflowData.nodes.forEach(node => {
        const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        nodeGroup.setAttribute('class', 'od2-node');
        nodeGroup.setAttribute('transform', `translate(${node.position.x}, ${node.position.y})`);

        // Node background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '200');
        rect.setAttribute('height', '80');
        rect.setAttribute('rx', '8');
        rect.setAttribute('fill', 'var(--od2-node-bg)');
        rect.setAttribute('stroke', 'var(--od2-node-border)');
        rect.setAttribute('stroke-width', '2');
        nodeGroup.appendChild(rect);

        // HTTP method badge
        if (node.data.method) {
          const methodBadge = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          methodBadge.setAttribute('x', '8');
          methodBadge.setAttribute('y', '8');
          methodBadge.setAttribute('width', '45');
          methodBadge.setAttribute('height', '20');
          methodBadge.setAttribute('rx', '4');
          methodBadge.setAttribute('fill', this.getMethodColor(node.data.method));
          nodeGroup.appendChild(methodBadge);

          const methodText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          methodText.setAttribute('x', '30.5');
          methodText.setAttribute('y', '22');
          methodText.setAttribute('text-anchor', 'middle');
          methodText.setAttribute('fill', 'white');
          methodText.setAttribute('font-size', '10');
          methodText.setAttribute('font-weight', 'bold');
          methodText.textContent = node.data.method.toUpperCase();
          nodeGroup.appendChild(methodText);
        }

        // Node title
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', '100');
        title.setAttribute('y', '25');
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('fill', 'var(--od2-text-color)');
        title.setAttribute('font-size', '14');
        title.setAttribute('font-weight', 'bold');
        title.textContent = this.truncateText(node.data.name || 'Unnamed Node', 20);
        nodeGroup.appendChild(title);

        // Node description
        if (node.data.description) {
          const desc = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          desc.setAttribute('x', '100');
          desc.setAttribute('y', '45');
          desc.setAttribute('text-anchor', 'middle');
          desc.setAttribute('fill', 'var(--od2-text-muted)');
          desc.setAttribute('font-size', '11');
          desc.textContent = this.truncateText(node.data.description, 25);
          nodeGroup.appendChild(desc);
        }

        // API path
        if (node.data.path) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          path.setAttribute('x', '100');
          path.setAttribute('y', '65');
          path.setAttribute('text-anchor', 'middle');
          path.setAttribute('fill', 'var(--od2-text-muted)');
          path.setAttribute('font-size', '10');
          path.setAttribute('font-family', 'monospace');
          path.textContent = this.truncateText(node.data.path, 30);
          nodeGroup.appendChild(path);
        }

        // Action buttons for image and document links
        this.addActionButtons(nodeGroup, node);

        // Connection handles
        this.addConnectionHandles(nodeGroup);

        // Click handler
        if (this.config.onNodeClick) {
          nodeGroup.style.cursor = 'pointer';
          nodeGroup.addEventListener('click', () => {
            this.config.onNodeClick(node);
          });
        }

        parent.appendChild(nodeGroup);
      });
    }

    renderEdges(parent) {
      if (!this.workflowData.edges) return;

      this.workflowData.edges.forEach(edge => {
        const sourceNode = this.workflowData.nodes.find(n => n.id === edge.source);
        const targetNode = this.workflowData.nodes.find(n => n.id === edge.target);

        if (!sourceNode || !targetNode) return;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Calculate connection points
        const sourceX = sourceNode.position.x + 200;
        const sourceY = sourceNode.position.y + 40;
        const targetX = targetNode.position.x;
        const targetY = targetNode.position.y + 40;

        // Create curved path
        const midX = (sourceX + targetX) / 2;
        const pathData = `M ${sourceX} ${sourceY} Q ${midX} ${sourceY} ${midX} ${(sourceY + targetY) / 2} Q ${midX} ${targetY} ${targetX} ${targetY}`;

        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', edge.sourceHandle === 'success' ? 'var(--od2-success-color)' : 'var(--od2-error-color)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('marker-end', 'url(#arrowhead)');

        parent.appendChild(path);
      });

      // Add arrow marker definition
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
      marker.setAttribute('id', 'arrowhead');
      marker.setAttribute('markerWidth', '10');
      marker.setAttribute('markerHeight', '7');
      marker.setAttribute('refX', '9');
      marker.setAttribute('refY', '3.5');
      marker.setAttribute('orient', 'auto');

      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
      polygon.setAttribute('fill', 'var(--od2-text-muted)');

      marker.appendChild(polygon);
      defs.appendChild(marker);
      parent.appendChild(defs);
    }

    addConnectionHandles(nodeGroup) {
      // Success handle (right side, green)
      const successHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      successHandle.setAttribute('cx', '190');
      successHandle.setAttribute('cy', '30');
      successHandle.setAttribute('r', '6');
      successHandle.setAttribute('fill', 'var(--od2-success-color)');
      successHandle.setAttribute('stroke', 'white');
      successHandle.setAttribute('stroke-width', '2');
      nodeGroup.appendChild(successHandle);

      // Error handle (right side, red)
      const errorHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      errorHandle.setAttribute('cx', '190');
      errorHandle.setAttribute('cy', '50');
      errorHandle.setAttribute('r', '6');
      errorHandle.setAttribute('fill', 'var(--od2-error-color)');
      errorHandle.setAttribute('stroke', 'white');
      errorHandle.setAttribute('stroke-width', '2');
      nodeGroup.appendChild(errorHandle);

      // Input handle (left side)
      const inputHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      inputHandle.setAttribute('cx', '10');
      inputHandle.setAttribute('cy', '40');
      inputHandle.setAttribute('r', '6');
      inputHandle.setAttribute('fill', 'var(--od2-input-color)');
      inputHandle.setAttribute('stroke', 'white');
      inputHandle.setAttribute('stroke-width', '2');
      nodeGroup.appendChild(inputHandle);
    }

    setupInteractions() {
      this.svg.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.svg.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.svg.addEventListener('mouseup', this.handleMouseUp.bind(this));
      this.svg.addEventListener('wheel', this.handleWheel.bind(this));
    }

    handleMouseDown(e) {
      if (e.target === this.svg || e.target === this.mainGroup) {
        this.isDragging = true;
        this.dragStart = { x: e.clientX - this.translateX, y: e.clientY - this.translateY };
        this.svg.style.cursor = 'grabbing';
      }
    }

    handleMouseMove(e) {
      if (this.isDragging) {
        this.translateX = e.clientX - this.dragStart.x;
        this.translateY = e.clientY - this.dragStart.y;
        this.updateTransform();
      }
    }

    handleMouseUp(e) {
      this.isDragging = false;
      this.svg.style.cursor = 'grab';
    }

    handleWheel(e) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      this.scale *= delta;
      this.scale = Math.max(0.1, Math.min(3, this.scale));
      this.updateTransform();
    }

    updateTransform() {
      this.mainGroup.setAttribute('transform', 
        `translate(${this.translateX}, ${this.translateY}) scale(${this.scale})`
      );
    }

    addControls() {
      const controls = document.createElement('div');
      controls.className = 'od2-controls';
      controls.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        gap: 5px;
        z-index: 10;
      `;

      // Zoom In
      const zoomIn = this.createControlButton('+', () => {
        this.scale *= 1.2;
        this.scale = Math.min(3, this.scale);
        this.updateTransform();
      });

      // Zoom Out
      const zoomOut = this.createControlButton('−', () => {
        this.scale *= 0.8;
        this.scale = Math.max(0.1, this.scale);
        this.updateTransform();
      });

      // Fit View
      const fitView = this.createControlButton('⤢', () => {
        this.fitToView();
      });

      controls.appendChild(zoomIn);
      controls.appendChild(zoomOut);
      controls.appendChild(fitView);

      this.container.appendChild(controls);
    }

    createControlButton(text, onClick) {
      const button = document.createElement('button');
      button.textContent = text;
      button.style.cssText = `
        width: 32px;
        height: 32px;
        border: 1px solid var(--od2-border-color);
        background: var(--od2-bg-color);
        color: var(--od2-text-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      button.addEventListener('click', onClick);
      return button;
    }

    fitToView() {
      if (!this.workflowData.nodes || this.workflowData.nodes.length === 0) return;

      const bounds = this.calculateBounds();
      const containerRect = this.container.getBoundingClientRect();
      
      const scaleX = (containerRect.width - 40) / bounds.width;
      const scaleY = (containerRect.height - 40) / bounds.height;
      
      this.scale = Math.min(scaleX, scaleY, 1);
      this.translateX = (containerRect.width - bounds.width * this.scale) / 2 - bounds.minX * this.scale;
      this.translateY = (containerRect.height - bounds.height * this.scale) / 2 - bounds.minY * this.scale;
      
      this.updateTransform();
    }

    calculateBounds() {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
      this.workflowData.nodes.forEach(node => {
        const x = node.position.x;
        const y = node.position.y;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + 200); // Node width
        maxY = Math.max(maxY, y + 80);  // Node height
      });

      return {
        minX,
        minY,
        width: maxX - minX,
        height: maxY - minY
      };
    }

    getMethodColor(method) {
      const colors = {
        'GET': '#10B981',
        'POST': '#3B82F6',
        'PUT': '#F59E0B',
        'DELETE': '#EF4444',
        'PATCH': '#8B5CF6'
      };
      return colors[method.toUpperCase()] || '#6B7280';
    }

    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength - 3) + '...';
    }

    showError(message) {
      this.container.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--od2-error-color);
          text-align: center;
          padding: 20px;
        ">
          <div>
            <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
            <div style="font-weight: bold; margin-bottom: 5px;">Workflow Load Error</div>
            <div style="font-size: 14px; opacity: 0.8;">${message}</div>
          </div>
        </div>
      `;
    }

    addActionButtons(nodeGroup, node) {
      const buttonsY = 68; // Position below the path text
      let buttonX = 15; // Starting position for buttons
      const buttonSpacing = 25; // Space between buttons

      // Image view button
      if (node.data.imageLink) {
        const imageButton = this.createActionButton(buttonX, buttonsY, 'image', node.data.imageLink, node.data.name);
        nodeGroup.appendChild(imageButton);
        buttonX += buttonSpacing;
      }

      // Document/API documentation button
      if (node.data.apiDocumentationLink) {
        const docButton = this.createActionButton(buttonX, buttonsY, 'document', node.data.apiDocumentationLink, node.data.name);
        nodeGroup.appendChild(docButton);
        buttonX += buttonSpacing;
      }

      // Generic link button (for any other links)
      if (node.data.link && !node.data.imageLink && !node.data.apiDocumentationLink) {
        const linkButton = this.createActionButton(buttonX, buttonsY, 'link', node.data.link, node.data.name);
        nodeGroup.appendChild(linkButton);
        buttonX += buttonSpacing;
      }
    }

    createActionButton(x, y, type, url, nodeName) {
      const buttonGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      buttonGroup.setAttribute('class', 'od2-action-button');
      buttonGroup.style.cursor = 'pointer';

      // Button background circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', this.getButtonColor(type));
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', '1');
      buttonGroup.appendChild(circle);

      // Button icon
      const icon = this.createButtonIcon(x, y, type);
      buttonGroup.appendChild(icon);

      // Add hover effects
      buttonGroup.addEventListener('mouseenter', () => {
        circle.setAttribute('r', '9');
        circle.setAttribute('stroke-width', '2');
      });

      buttonGroup.addEventListener('mouseleave', () => {
        circle.setAttribute('r', '8');
        circle.setAttribute('stroke-width', '1');
      });

      // Click handler to open link
      buttonGroup.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent node click event
        this.openLink(url, type, nodeName);
      });

      return buttonGroup;
    }

    createButtonIcon(x, y, type) {
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      icon.setAttribute('x', x);
      icon.setAttribute('y', y + 3);
      icon.setAttribute('text-anchor', 'middle');
      icon.setAttribute('fill', 'white');
      icon.setAttribute('font-size', '10');
      icon.setAttribute('font-weight', 'bold');
      icon.style.pointerEvents = 'none';

      switch (type) {
        case 'image':
          icon.textContent = '🖼️';
          break;
        case 'document':
          icon.textContent = '📄';
          break;
        case 'link':
          icon.textContent = '🔗';
          break;
        default:
          icon.textContent = '⭐';
      }

      return icon;
    }

    getButtonColor(type) {
      switch (type) {
        case 'image':
          return '#10B981'; // Green for images
        case 'document':
          return '#3B82F6'; // Blue for documents
        case 'link':
          return '#8B5CF6'; // Purple for generic links
        default:
          return '#6B7280'; // Gray as fallback
      }
    }

    openLink(url, type, nodeName) {
      if (!url) return;

      // Create a modal or new tab based on type
      if (type === 'image') {
        this.showImageModal(url, nodeName);
      } else {
        // Open documents and links in new tab
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }

    showImageModal(imageUrl, nodeName) {
      // Create modal overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
      `;

      // Create image container
      const imageContainer = document.createElement('div');
      imageContainer.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        cursor: auto;
      `;

      // Create image element
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = nodeName;
      img.style.cssText = `
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        display: block;
        margin: 0 auto;
      `;

      // Create title
      const title = document.createElement('h3');
      title.textContent = nodeName;
      title.style.cssText = `
        margin: 0 0 15px 0;
        text-align: center;
        color: #374151;
        font-size: 18px;
        font-weight: 600;
      `;

      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6B7280;
        line-height: 1;
      `;

      // Assemble modal
      imageContainer.appendChild(title);
      imageContainer.appendChild(img);
      imageContainer.style.position = 'relative';
      imageContainer.appendChild(closeBtn);
      overlay.appendChild(imageContainer);

      // Close handlers
      const closeModal = () => document.body.removeChild(overlay);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
      closeBtn.addEventListener('click', closeModal);

      // Handle escape key
      const handleKeydown = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleKeydown);
        }
      };
      document.addEventListener('keydown', handleKeydown);

      // Add to DOM
      document.body.appendChild(overlay);

      // Prevent event propagation on image container
      imageContainer.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  // Public API
  const OD2WorkflowViewer = {
    version: '1.0.0',
    
    render: function(config) {
      return new WorkflowRenderer(config);
    },

    // Helper method to load workflow from URL and render
    renderFromUrl: async function(container, workflowUrl, options = {}) {
      return new WorkflowRenderer({
        container,
        workflowUrl,
        ...options
      });
    }
  };

  // Expose to global scope
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OD2WorkflowViewer;
  } else {
    global.OD2WorkflowViewer = OD2WorkflowViewer;
  }

  // Simple global function for easy embedding
  global.od2ApiWorkflowRenderer = function(containerId, jsonData, options = {}) {
    const container = typeof containerId === 'string' ? `#${containerId}` : containerId;
    return OD2WorkflowViewer.render({
      container: container,
      workflow: jsonData,
      theme: options.theme || 'light',
      width: options.width || '100%',
      height: options.height || '500px',
      interactive: options.interactive !== false,
      showControls: options.showControls !== false,
      fitView: options.fitView !== false,
      onNodeClick: options.onNodeClick || null,
      ...options
    });
  };

})(typeof window !== 'undefined' ? window : this);
