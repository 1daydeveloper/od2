export interface WorkflowNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    name: string;
    description?: string;
    method?: string;
    path?: string;
    operationId?: string;
    tags?: string[];
    apiDocumentationLink?: string;
    imageLink?: string;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  animated?: boolean;
  style?: Record<string, any>;
  label?: string;
}

export interface WorkflowData {
  name: string;
  version?: string;
  createdAt?: string;
  exportedAt?: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  openAPISchema?: any;
  metadata?: {
    nodeCount: number;
    edgeCount: number;
    hasOpenAPISchema: boolean;
    schemaInfo?: {
      title: string;
      version: string;
      endpointCount: number;
    };
  };
}

export interface ViewerOptions {
  width?: string | number;
  height?: string | number;
  theme?: 'light' | 'dark' | 'auto';
  interactive?: boolean;
  showMinimap?: boolean;
  showControls?: boolean;
  showBackground?: boolean;
  fitView?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface VanillaViewerOptions extends Omit<ViewerOptions, 'style' | 'className'> {
  container: string | HTMLElement;
  className?: string;
  style?: Record<string, string>;
}
