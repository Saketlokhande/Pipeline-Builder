// BaseNode.js
// Base abstraction for all node types

import { Handle, Position } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({
  id,
  data,
  title = "Node",
  children,
  inputHandles = [],
  outputHandles = [],
  minWidth = 200,
  minHeight = 80,
  className = "",
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  return (
    <div
      className={`base-node ${className}`}
      style={{
        minWidth: minWidth,
        minHeight: minHeight,
        border: "1px solid rgba(99, 102, 241, 0.5)",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #430c8a 0%, black 100%)",
        boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transition: "all 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id || `input-${index}`}
          style={handle.style || {}}
        />
      ))}

      {/* Node Header - Darker Purple Background */}
      <div
        style={{
          fontWeight: "600",
          fontSize: "14px",
          color: "#ffffff",
          padding: "12px 14px",
          margin: 0,
          letterSpacing: "0.3px",
          background: "#430c8a",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {title}
      </div>

      {/* Node Content - Lighter Purple Background */}
      <div
        style={{
          flex: 1,
          color: "#ffffff",
          padding: "14px",
          background: "rgba(139, 92, 246, 0.3)",
        }}
      >
        {typeof children === "function"
          ? children({ id, data, handleFieldChange, ...data })
          : children}
      </div>

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id || `output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id || `output-${index}`}
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};
