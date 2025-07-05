import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { WorkflowData, ViewerOptions } from '../types';
import { WorkflowNodeComponent } from './WorkflowNodeComponent';

const nodeTypes = {
  customNode: WorkflowNodeComponent,
};

export interface WorkflowViewerProps {
  workflow: WorkflowData;
  options?: ViewerOptions;
}

const WorkflowViewerInner: React.FC<WorkflowViewerProps> = ({ 
  workflow, 
  options = {} 
}) => {
  const {
    width = '100%',
    height = '600px',
    theme = 'light',
    interactive = true,
    showMinimap = true,
    showControls = true,
    showBackground = true,
    fitView = true,
    className = '',
    style = {},
  } = options;

  const [nodes] = useNodesState(workflow.nodes || []);
  const [edges] = useEdgesState(workflow.edges || []);

  const containerStyle = useMemo(() => ({
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    ...style,
  }), [width, height, theme, style]);

  const proOptions = {
    hideAttribution: true,
  };

  return (
    <div 
      className={`workflow-viewer ${className}`} 
      style={containerStyle}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView={fitView}
        attributionPosition="bottom-left"
        proOptions={proOptions}
        nodesDraggable={interactive}
        nodesConnectable={false}
        elementsSelectable={interactive}
        panOnDrag={interactive}
        zoomOnScroll={interactive}
        zoomOnPinch={interactive}
        zoomOnDoubleClick={interactive}
      >
        {showBackground && (
          <Background 
            color={theme === 'dark' ? '#333' : '#aaa'} 
            gap={16} 
          />
        )}
        {showControls && <Controls />}
        {showMinimap && (
          <MiniMap 
            nodeColor={theme === 'dark' ? '#374151' : '#e5e7eb'}
            maskColor={theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.1)'}
          />
        )}
      </ReactFlow>
    </div>
  );
};

export const WorkflowViewer: React.FC<WorkflowViewerProps> = (props) => {
  return (
    <ReactFlowProvider>
      <WorkflowViewerInner {...props} />
    </ReactFlowProvider>
  );
};
