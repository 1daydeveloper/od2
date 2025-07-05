import { WorkflowData, VanillaViewerOptions } from '../types';

export class EmbeddableWorkflowViewer {
  private container: HTMLElement;
  private workflow: WorkflowData;
  private options: VanillaViewerOptions;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scale: number = 1;
  private pan: { x: number; y: number } = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private lastPanPoint: { x: number; y: number } = { x: 0, y: 0 };

  constructor(workflow: WorkflowData, options: VanillaViewerOptions) {
    this.workflow = workflow;
    this.options = {
      width: '100%',
      height: '600px',
      theme: 'light',
      interactive: true,
      showMinimap: false,
      showControls: true,
      showBackground: true,
      fitView: true,
      ...options,
    };

    // Get container element
    if (typeof options.container === 'string') {
      const element = document.querySelector(options.container);
      if (!element) {
        throw new Error(`Container element not found: ${options.container}`);
      }
      this.container = element as HTMLElement;
    } else {
      this.container = options.container;
    }

    this.init();
  }

  private init(): void {
    this.createCanvas();
    this.setupEventListeners();
    this.render();
    
    if (this.options.fitView) {
      this.fitToView();
    }
  }

  private createCanvas(): void {
    // Clear container
    this.container.innerHTML = '';
    
    // Set container styles
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.border = '1px solid #e2e8f0';
    this.container.style.borderRadius = '8px';
    this.container.style.backgroundColor = this.options.theme === 'dark' ? '#1a1a1a' : '#ffffff';
    
    if (this.options.className) {
      this.container.classList.add(this.options.className);
    }
    
    if (this.options.style) {
      Object.assign(this.container.style, this.options.style);
    }

    // Set dimensions
    if (typeof this.options.width === 'number') {
      this.container.style.width = `${this.options.width}px`;
    } else {
      this.container.style.width = this.options.width as string;
    }
    
    if (typeof this.options.height === 'number') {
      this.container.style.height = `${this.options.height}px`;
    } else {
      this.container.style.height = this.options.height as string;
    }

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.display = 'block';
    this.canvas.style.cursor = this.options.interactive ? 'grab' : 'default';
    
    // Set canvas size
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    this.container.appendChild(this.canvas);

    // Create controls if enabled
    if (this.options.showControls) {
      this.createControls();
    }
  }

  private createControls(): void {
    const controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.bottom = '16px';
    controls.style.left = '16px';
    controls.style.display = 'flex';
    controls.style.flexDirection = 'column';
    controls.style.gap = '8px';
    controls.style.zIndex = '10';

    const createButton = (text: string, onClick: () => void) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.style.background = this.options.theme === 'dark' ? '#374151' : '#ffffff';
      button.style.border = '1px solid #d1d5db';
      button.style.borderRadius = '6px';
      button.style.padding = '8px 12px';
      button.style.fontSize = '12px';
      button.style.cursor = 'pointer';
      button.style.color = this.options.theme === 'dark' ? '#ffffff' : '#374151';
      button.addEventListener('click', onClick);
      return button;
    };

    controls.appendChild(createButton('Fit View', () => this.fitToView()));
    controls.appendChild(createButton('Zoom In', () => this.zoomIn()));
    controls.appendChild(createButton('Zoom Out', () => this.zoomOut()));
    controls.appendChild(createButton('Reset', () => this.reset()));

    this.container.appendChild(controls);
  }

  private setupEventListeners(): void {
    if (!this.options.interactive) return;

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('wheel', this.onWheel.bind(this));
    
    // Handle window resize
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.lastPanPoint = { x: event.clientX, y: event.clientY };
    this.canvas.style.cursor = 'grabbing';
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.lastPanPoint.x;
    const deltaY = event.clientY - this.lastPanPoint.y;

    this.pan.x += deltaX;
    this.pan.y += deltaY;

    this.lastPanPoint = { x: event.clientX, y: event.clientY };
    this.render();
  }

  private onMouseUp(): void {
    this.isDragging = false;
    this.canvas.style.cursor = 'grab';
  }

  private onWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(3, this.scale * zoomFactor));

    // Zoom towards mouse position
    this.pan.x = mouseX - (mouseX - this.pan.x) * (newScale / this.scale);
    this.pan.y = mouseY - (mouseY - this.pan.y) * (newScale / this.scale);
    
    this.scale = newScale;
    this.render();
  }

  private onResize(): void {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.render();
  }

  private render(): void {
    const rect = this.canvas.getBoundingClientRect();
    
    // Clear canvas
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Save context
    this.ctx.save();
    
    // Apply transformations
    this.ctx.translate(this.pan.x, this.pan.y);
    this.ctx.scale(this.scale, this.scale);
    
    // Draw background if enabled
    if (this.options.showBackground) {
      this.drawBackground();
    }
    
    // Draw edges first
    this.workflow.edges.forEach(edge => this.drawEdge(edge));
    
    // Draw nodes
    this.workflow.nodes.forEach(node => this.drawNode(node));
    
    // Restore context
    this.ctx.restore();
  }

  private drawBackground(): void {
    const rect = this.canvas.getBoundingClientRect();
    const gridSize = 20;
    const color = this.options.theme === 'dark' ? '#333333' : '#e5e7eb';
    
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    
    const startX = -this.pan.x / this.scale;
    const startY = -this.pan.y / this.scale;
    const endX = startX + rect.width / this.scale;
    const endY = startY + rect.height / this.scale;
    
    for (let x = Math.floor(startX / gridSize) * gridSize; x <= endX; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, endY);
      this.ctx.stroke();
    }
    
    for (let y = Math.floor(startY / gridSize) * gridSize; y <= endY; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(endX, y);
      this.ctx.stroke();
    }
  }

  private drawNode(node: any): void {
    const x = node.position.x;
    const y = node.position.y;
    const width = 220;
    const height = 120;
    
    // Draw node background
    this.ctx.fillStyle = this.options.theme === 'dark' ? '#374151' : '#ffffff';
    this.ctx.strokeStyle = '#e2e8f0';
    this.ctx.lineWidth = 2;
    
    this.roundRect(x, y, width, height, 12);
    this.ctx.fill();
    this.ctx.stroke();
    
    // Draw node content
    this.ctx.fillStyle = this.options.theme === 'dark' ? '#ffffff' : '#1f2937';
    this.ctx.font = '600 14px system-ui, -apple-system, sans-serif';
    this.ctx.fillText(node.data.name, x + 16, y + 24);
    
    // Draw method badge if available
    if (node.data.method && node.data.path) {
      const methodColor = this.getMethodColor(node.data.method);
      this.ctx.fillStyle = methodColor;
      this.roundRect(x + 16, y + 32, 40, 16, 4);
      this.ctx.fill();
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '600 10px system-ui, -apple-system, sans-serif';
      this.ctx.fillText(node.data.method.toUpperCase(), x + 20, y + 42);
      
      // Draw path
      this.ctx.fillStyle = this.options.theme === 'dark' ? '#9ca3af' : '#6b7280';
      this.ctx.font = '11px ui-monospace, monospace';
      this.ctx.fillText(node.data.path, x + 62, y + 42);
    }
    
    // Draw description
    if (node.data.description) {
      this.ctx.fillStyle = this.options.theme === 'dark' ? '#9ca3af' : '#6b7280';
      this.ctx.font = '12px system-ui, -apple-system, sans-serif';
      this.wrapText(node.data.description, x + 16, y + 60, width - 32, 14);
    }
    
    // Draw connection points
    this.drawConnectionPoint(x - 6, y + height / 2, '#6366f1'); // Input
    this.drawConnectionPoint(x + width + 6, y + height * 0.35, '#10b981'); // Success
    this.drawConnectionPoint(x + width + 6, y + height * 0.65, '#ef4444'); // Failure
  }

  private drawEdge(edge: any): void {
    const sourceNode = this.workflow.nodes.find(n => n.id === edge.source);
    const targetNode = this.workflow.nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return;
    
    const sourceX = sourceNode.position.x + 220;
    const sourceY = sourceNode.position.y + (edge.sourceHandle === 'success' ? 42 : 78);
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y + 60;
    
    // Draw curved line
    this.ctx.strokeStyle = edge.sourceHandle === 'success' ? '#10b981' : '#ef4444';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    
    const controlX1 = sourceX + 50;
    const controlY1 = sourceY;
    const controlX2 = targetX - 50;
    const controlY2 = targetY;
    
    this.ctx.moveTo(sourceX, sourceY);
    this.ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, targetX, targetY);
    this.ctx.stroke();
    
    // Draw arrow
    this.drawArrow(targetX - 10, targetY, edge.sourceHandle === 'success' ? '#10b981' : '#ef4444');
  }

  private drawConnectionPoint(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 6, 0, 2 * Math.PI);
    this.ctx.fill();
    
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private drawArrow(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - 8, y - 4);
    this.ctx.lineTo(x - 8, y + 4);
    this.ctx.closePath();
    this.ctx.fill();
  }

  private roundRect(x: number, y: number, width: number, height: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }

  private wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        this.ctx.fillText(line, x, currentY);
        line = words[i] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, x, currentY);
  }

  private getMethodColor(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET': return '#28a745';
      case 'POST': return '#007bff';
      case 'PUT': return '#ffc107';
      case 'DELETE': return '#dc3545';
      case 'PATCH': return '#6f42c1';
      default: return '#6c757d';
    }
  }

  public fitToView(): void {
    if (this.workflow.nodes.length === 0) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const padding = 50;
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    this.workflow.nodes.forEach(node => {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + 220);
      maxY = Math.max(maxY, node.position.y + 120);
    });
    
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    
    const scaleX = (rect.width - padding * 2) / contentWidth;
    const scaleY = (rect.height - padding * 2) / contentHeight;
    
    this.scale = Math.min(scaleX, scaleY, 1);
    
    this.pan.x = (rect.width - contentWidth * this.scale) / 2 - minX * this.scale;
    this.pan.y = (rect.height - contentHeight * this.scale) / 2 - minY * this.scale;
    
    this.render();
  }

  public zoomIn(): void {
    this.scale = Math.min(this.scale * 1.2, 3);
    this.render();
  }

  public zoomOut(): void {
    this.scale = Math.max(this.scale * 0.8, 0.1);
    this.render();
  }

  public reset(): void {
    this.scale = 1;
    this.pan = { x: 0, y: 0 };
    this.render();
  }

  public updateWorkflow(workflow: WorkflowData): void {
    this.workflow = workflow;
    this.render();
    if (this.options.fitView) {
      this.fitToView();
    }
  }

  public destroy(): void {
    this.container.innerHTML = '';
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}
