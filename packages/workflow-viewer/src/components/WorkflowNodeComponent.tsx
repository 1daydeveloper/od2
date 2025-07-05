import React from 'react';
import { Handle, Position } from 'reactflow';

export interface WorkflowNodeComponentProps {
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
  isConnectable?: boolean;
}

export const WorkflowNodeComponent: React.FC<WorkflowNodeComponentProps> = ({ 
  data, 
  isConnectable = false 
}) => {
  const getMethodColor = (method?: string) => {
    switch (method?.toUpperCase()) {
      case 'GET': return '#28a745';
      case 'POST': return '#007bff';
      case 'PUT': return '#ffc107';
      case 'DELETE': return '#dc3545';
      case 'PATCH': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const methodColor = getMethodColor(data.method);

  return (
    <div className="workflow-node" style={{
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px',
      minWidth: '220px',
      maxWidth: '300px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        isConnectable={isConnectable}
        style={{
          background: '#6366f1',
          width: '12px',
          height: '12px',
          border: '2px solid #ffffff',
        }}
      />

      {/* Node Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        gap: '12px',
      }}>
        {data.imageLink && (
          <img
            src={data.imageLink}
            alt={data.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              objectFit: 'cover',
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '600',
            color: '#1f2937',
            lineHeight: '1.2',
          }}>
            {data.name}
          </h3>
          {data.method && data.path && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px',
            }}>
              <span style={{
                background: methodColor,
                color: '#ffffff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
                {data.method}
              </span>
              <span style={{
                fontSize: '11px',
                color: '#6b7280',
                fontFamily: 'monospace',
              }}>
                {data.path}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {data.description && (
        <p style={{
          margin: '0 0 12px 0',
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.4',
        }}>
          {data.description}
        </p>
      )}

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '8px',
        }}>
          {data.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                background: '#f3f4f6',
                color: '#374151',
                padding: '2px 6px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '500',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Documentation Link */}
      {data.apiDocumentationLink && (
        <a
          href={data.apiDocumentationLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontSize: '11px',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '500',
          }}
        >
          📖 View Docs
        </a>
      )}

      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="success"
        isConnectable={isConnectable}
        style={{
          background: '#10b981',
          width: '12px',
          height: '12px',
          border: '2px solid #ffffff',
          top: '35%',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="failure"
        isConnectable={isConnectable}
        style={{
          background: '#ef4444',
          width: '12px',
          height: '12px',
          border: '2px solid #ffffff',
          top: '65%',
        }}
      />
    </div>
  );
};
