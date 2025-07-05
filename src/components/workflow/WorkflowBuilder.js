"use client";
import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import OpenAPISidebar from "./OpenAPISidebar";
import NodeFormModal from "./NodeFormModal";
import WorkflowToolbar from "./WorkflowToolbar";
import CustomNode from "./CustomNode";
import { exportWorkflow, exportEmbedFlow, importWorkflow } from "@/lib/workflowUtils";

const nodeTypes = {
  customNode: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: { strokeWidth: 2 },
};

export default function WorkflowBuilder() {
  const { theme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [openAPISchema, setOpenAPISchema] = useState(null);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Define node handlers first
  const handleNodeEdit = useCallback((node) => {
    setEditingNode(node);
    setShowNodeModal(true);
  }, []);

  const handleNodeDelete = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => {
      const edgeId = uuidv4();
      const newEdge = {
        ...params,
        id: edgeId,
        type: "default",
        label: params.sourceHandle === "success" ? "✅ Success" : "❌ Failure",
        style: {
          stroke: params.sourceHandle === "success" ? "#10b981" : "#ef4444",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const apiEndpoint = event.dataTransfer.getData("application/reactflow");

      if (typeof apiEndpoint === "undefined" || !apiEndpoint) {
        return;
      }

      const parsedEndpoint = JSON.parse(apiEndpoint);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeId = uuidv4();
      const newNode = {
        id: nodeId,
        type: "customNode",
        position,
        data: {
          ...parsedEndpoint,
          name: parsedEndpoint.operationId || parsedEndpoint.path,
          description: parsedEndpoint.summary || "",
          apiDocumentationLink: "",
          imageLink: "",
          imageUpload: null,
          onEdit: handleNodeEdit,
          onDelete: handleNodeDelete,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setEditingNode(newNode);
      setShowNodeModal(true);
    },
    [reactFlowInstance, setNodes, handleNodeEdit, handleNodeDelete]
  );

  const handleNodeSave = (nodeData) => {
    if (editingNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === editingNode.id
            ? { ...node, data: { ...node.data, ...nodeData } }
            : node
        )
      );
    }
    setShowNodeModal(false);
    setEditingNode(null);
  };

  const handleExport = () => {
    const workflowData = {
      name: workflowName,
      nodes,
      edges,
      openAPISchema,
      createdAt: new Date().toISOString(),
    };
    
    try {
      exportWorkflow(workflowData);
      toast.success(`Workflow "${workflowName}" exported successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error exporting workflow:", error);
      toast.error("Failed to export workflow. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleEmbedExport = () => {
    const workflowData = {
      name: workflowName,
      nodes,
      edges,
      openAPISchema,
      createdAt: new Date().toISOString(),
    };
    
    try {
      exportEmbedFlow(workflowData);
      toast.success(`Embed flow "${workflowName}" exported successfully!\nThis lightweight export is perfect for embedding in external sites.`, {
        position: "top-right",
        autoClose: 4000,
      });
    } catch (error) {
      console.error("Error exporting embed flow:", error);
      toast.error("Failed to export embed flow. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleImport = async (file) => {
    try {
      const workflowData = await importWorkflow(file);
      setWorkflowName(workflowData.name || "Imported Workflow");
      
      // Add event handlers to imported nodes
      const nodesWithHandlers = workflowData.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onEdit: handleNodeEdit,
          onDelete: handleNodeDelete,
        }
      }));
      
      setNodes(nodesWithHandlers || []);
      setEdges(workflowData.edges || []);
      setOpenAPISchema(workflowData.openAPISchema || null);
      
      // Show success toast with import details
      const schemaInfo = workflowData.openAPISchema ? 
        ` • OpenAPI schema with ${Object.keys(workflowData.openAPISchema.paths || {}).length} endpoints` : 
        " • No OpenAPI schema";
      
      toast.success(
        `Workflow imported successfully!\n• ${workflowData.nodes.length} nodes\n• ${workflowData.edges.length} connections${schemaInfo}`,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      
    } catch (error) {
      console.error("Error importing workflow:", error);
      toast.error(`Failed to import workflow: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleCDNImport = async (url) => {
    try {
      const workflowData = await importWorkflowFromURL(url);
      setWorkflowName(workflowData.name || "Imported Workflow");
      
      // Add event handlers to imported nodes
      const nodesWithHandlers = workflowData.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onEdit: handleNodeEdit,
          onDelete: handleNodeDelete,
        }
      }));
      
      setNodes(nodesWithHandlers || []);
      setEdges(workflowData.edges || []);
      setOpenAPISchema(workflowData.openAPISchema || null);
      
      // Show success toast with import details
      const schemaInfo = workflowData.openAPISchema ? 
        ` • OpenAPI schema with ${Object.keys(workflowData.openAPISchema.paths || {}).length} endpoints` : 
        " • No OpenAPI schema";
      
      const importSource = url.includes('github.com') ? 'GitHub' : 
                          url.includes('gitlab.com') ? 'GitLab' : 'CDN';
      
      toast.success(
        `Workflow imported from ${importSource}!\n• ${workflowData.nodes.length} nodes\n• ${workflowData.edges.length} connections${schemaInfo}`,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      
    } catch (error) {
      console.error("Error importing workflow from URL:", error);
      toast.error(`Failed to import workflow from URL: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
      // Re-throw to let the modal handle it
      throw error;
    }
  };

  const clearWorkflow = () => {
    if (confirm("Are you sure you want to clear the entire workflow?")) {
      setNodes([]);
      setEdges([]);
      setWorkflowName("Untitled Workflow");
      setOpenAPISchema(null);
      
      toast.info("Workflow cleared successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - OpenAPI Schema & Search */}
      <div className="w-80 border-r border-border bg-card">
        <OpenAPISidebar
          openAPISchema={openAPISchema}
          onSchemaUpload={setOpenAPISchema}
        />
      </div>

      {/* Main Workflow Canvas */}
      <div className="flex-1 relative flex flex-col min-w-0 overflow-hidden">
        <WorkflowToolbar
          workflowName={workflowName}
          onNameChange={setWorkflowName}
          onExport={handleExport}
          onEmbedExport={handleEmbedExport}
          onImport={handleImport}
          onClear={clearWorkflow}
        />

        <div className="flex-1 min-h-0" ref={reactFlowWrapper} style={{ minHeight: 0 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            colorMode={theme === "dark" ? "dark" : "light"}
            fitView
            snapToGrid
            snapGrid={[20, 20]}
            className="h-full"
            style={{ height: "100%" }}
          >
            <Background />
            <Controls />
            <MiniMap />
            <Panel position="bottom-center" className="text-xs text-muted-foreground">
              Drag API endpoints from the left sidebar to create workflow nodes
            </Panel>
          </ReactFlow>
        </div>
      </div>
      {showNodeModal && (
        <NodeFormModal
          node={editingNode}
          onSave={handleNodeSave}
          onClose={() => {
            setShowNodeModal(false);
            setEditingNode(null);
          }}
          onDelete={() => {
            if (editingNode) {
              handleNodeDelete(editingNode.id);
              setShowNodeModal(false);
              setEditingNode(null);
            }
          }}
        />
      )}
    </div>
  );
}
