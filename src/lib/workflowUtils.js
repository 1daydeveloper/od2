/**
 * Utility functions for workflow management
 */

export const exportWorkflow = (workflowData) => {
  // Enhanced workflow data with version and metadata
  const enhancedData = {
    ...workflowData,
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    metadata: {
      nodeCount: workflowData.nodes?.length || 0,
      edgeCount: workflowData.edges?.length || 0,
      hasOpenAPISchema: !!workflowData.openAPISchema,
      schemaInfo: workflowData.openAPISchema ? {
        title: workflowData.openAPISchema.info?.title,
        version: workflowData.openAPISchema.info?.version,
        endpointCount: Object.keys(workflowData.openAPISchema.paths || {}).length
      } : null
    }
  };

  const dataStr = JSON.stringify(enhancedData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${workflowData.name.replace(/\s+/g, '_').toLowerCase()}_workflow.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportEmbedFlow = (workflowData) => {
  // Clean workflow data for embedding - only essential flow information
  const embedData = {
    name: workflowData.name || "Embedded Workflow",
    version: "1.0.0",
    exportType: "embed",
    exportedAt: new Date().toISOString(),
    nodes: workflowData.nodes?.map(node => ({
      id: node.id,
      type: node.type || "customNode",
      position: node.position,
      data: {
        name: node.data.name,
        description: node.data.description || "",
        method: node.data.method || "",
        path: node.data.path || "",
        operationId: node.data.operationId || "",
        tags: node.data.tags || [],
        apiDocumentationLink: node.data.apiDocumentationLink || "",
        imageLink: node.data.imageLink || ""
      }
    })) || [],
    edges: workflowData.edges?.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || "success",
      targetHandle: edge.targetHandle || "input",
      animated: edge.animated || false,
      label: edge.label || ""
    })) || [],
    metadata: {
      nodeCount: workflowData.nodes?.length || 0,
      edgeCount: workflowData.edges?.length || 0,
      isEmbedExport: true
    }
  };

  const dataStr = JSON.stringify(embedData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${embedData.name.replace(/\s+/g, '_').toLowerCase()}_embed_flow.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importWorkflowFromURL = async (url) => {
  try {
    if (!url || typeof url !== 'string') {
      throw new Error("Invalid URL provided");
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      throw new Error("Invalid URL format");
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch workflow: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error("URL does not return JSON content");
    }

    const workflowData = await response.json();
    
    // Use the same validation logic as file import
    return validateAndProcessWorkflowData(workflowData);
    
  } catch (error) {
    throw new Error(`Failed to import workflow from URL: ${error.message}`);
  }
};

const validateAndProcessWorkflowData = (workflowData) => {
  // Validate workflow structure
  if (!workflowData || typeof workflowData !== "object") {
    throw new Error("Invalid workflow format");
  }

  // Ensure required properties exist
  const validatedData = {
    name: workflowData.name || "Imported Workflow",
    nodes: Array.isArray(workflowData.nodes) ? workflowData.nodes : [],
    edges: Array.isArray(workflowData.edges) ? workflowData.edges : [],
    openAPISchema: workflowData.openAPISchema || null,
    createdAt: workflowData.createdAt || new Date().toISOString(),
    importedAt: new Date().toISOString(),
    version: workflowData.version || "1.0.0",
    metadata: workflowData.metadata || {
      nodeCount: workflowData.nodes?.length || 0,
      edgeCount: workflowData.edges?.length || 0,
      hasOpenAPISchema: !!workflowData.openAPISchema
    }
  };

  // Log import information for user feedback
  console.log("Workflow imported successfully:", {
    name: validatedData.name,
    nodes: validatedData.nodes.length,
    edges: validatedData.edges.length,
    hasSchema: !!validatedData.openAPISchema,
    schemaEndpoints: validatedData.openAPISchema ? 
      Object.keys(validatedData.openAPISchema.paths || {}).length : 0
  });

  return validatedData;
};

export const importWorkflow = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    if (file.type !== "application/json") {
      reject(new Error("Invalid file type. Please select a JSON file."));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const workflowData = JSON.parse(event.target.result);
        resolve(validateAndProcessWorkflowData(workflowData));
      } catch (error) {
        reject(new Error(`Failed to parse workflow file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

export const validateWorkflow = (workflowData) => {
  const errors = [];
  
  if (!workflowData.name || workflowData.name.trim() === "") {
    errors.push("Workflow name is required");
  }

  if (!Array.isArray(workflowData.nodes)) {
    errors.push("Nodes must be an array");
  }

  if (!Array.isArray(workflowData.edges)) {
    errors.push("Edges must be an array");
  }

  // Validate nodes
  workflowData.nodes?.forEach((node, index) => {
    if (!node.id) {
      errors.push(`Node at index ${index} is missing an ID`);
    }
    if (!node.data || !node.data.name) {
      errors.push(`Node at index ${index} is missing a name`);
    }
    if (!node.position || typeof node.position.x !== "number" || typeof node.position.y !== "number") {
      errors.push(`Node at index ${index} has invalid position`);
    }
  });

  // Validate edges
  workflowData.edges?.forEach((edge, index) => {
    if (!edge.id) {
      errors.push(`Edge at index ${index} is missing an ID`);
    }
    if (!edge.source || !edge.target) {
      errors.push(`Edge at index ${index} is missing source or target`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateShareableURL = (workflowData) => {
  const encodedData = btoa(JSON.stringify(workflowData));
  const baseURL = window.location.origin + window.location.pathname;
  return `${baseURL}?workflow=${encodedData}`;
};

export const loadWorkflowFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const workflowParam = urlParams.get("workflow");
  
  if (workflowParam) {
    try {
      const workflowData = JSON.parse(atob(workflowParam));
      return workflowData;
    } catch (error) {
      console.error("Failed to load workflow from URL:", error);
      return null;
    }
  }
  
  return null;
};

export const generateWorkflowDocumentation = (workflowData) => {
  let doc = `# ${workflowData.name}\n\n`;
  
  if (workflowData.description) {
    doc += `${workflowData.description}\n\n`;
  }
  
  doc += `## Workflow Overview\n\n`;
  doc += `- **Created:** ${new Date(workflowData.createdAt).toLocaleDateString()}\n`;
  doc += `- **Nodes:** ${workflowData.nodes.length}\n`;
  doc += `- **Connections:** ${workflowData.edges.length}\n\n`;
  
  if (workflowData.openAPISchema) {
    doc += `## API Schema\n\n`;
    doc += `- **Title:** ${workflowData.openAPISchema.info?.title || "Unknown"}\n`;
    doc += `- **Version:** ${workflowData.openAPISchema.info?.version || "Unknown"}\n\n`;
  }
  
  doc += `## Workflow Steps\n\n`;
  
  workflowData.nodes.forEach((node, index) => {
    doc += `### ${index + 1}. ${node.data.name}\n\n`;
    
    if (node.data.description) {
      doc += `${node.data.description}\n\n`;
    }
    
    if (node.data.method && node.data.path) {
      doc += `**API Endpoint:** \`${node.data.method} ${node.data.path}\`\n\n`;
    }
    
    if (node.data.apiDocumentationLink) {
      doc += `**Documentation:** [View API Docs](${node.data.apiDocumentationLink})\n\n`;
    }
    
    const connectedEdges = workflowData.edges.filter(edge => edge.source === node.id);
    if (connectedEdges.length > 0) {
      doc += `**Next Steps:**\n`;
      connectedEdges.forEach(edge => {
        const targetNode = workflowData.nodes.find(n => n.id === edge.target);
        if (targetNode) {
          const condition = edge.sourceHandle === "success" ? "✅ On Success" : "❌ On Failure";
          doc += `- ${condition}: ${targetNode.data.name}\n`;
        }
      });
      doc += `\n`;
    }
  });
  
  return doc;
};
