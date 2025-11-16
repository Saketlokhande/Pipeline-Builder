// textNode.js

import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

// Helper function to extract variables from text (e.g., "{{ variable }}")
const extractVariables = (text) => {
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;

  while ((match = variableRegex.exec(text)) !== null) {
    const varName = match[1];
    if (!variables.includes(varName)) {
      variables.push(varName);
    }
  }

  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data?.text !== undefined) {
      setCurrText(data.text);
    }
  }, [data]);

  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const minHeight = 40;
      textareaRef.current.style.height = `${Math.max(
        scrollHeight,
        minHeight
      )}px`;
    }
  }, [currText]);

  // Calculate node dimensions based on content
  const nodeWidth = Math.max(200, Math.min(400, currText.length * 6 + 40));
  const nodeHeight = Math.max(
    100,
    (textareaRef.current?.scrollHeight || 40) + 80
  );

  return (
    <div
      style={{
        minWidth: nodeWidth,
        minHeight: nodeHeight,
        border: "1px solid rgba(99, 102, 241, 0.5)",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #430c8a 0%, black 100%)",
        boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Input Handles for Variables */}
      {variables.map((varName, index) => (
        <Handle
          key={`${id}-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${20 + index * 30}px`,
            background: "#6366f1",
          }}
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
        Text
      </div>

      {/* Text Input - Lighter Purple Background */}
      <div
        style={{
          flex: 1,
          color: "#ffffff",
          padding: "14px",
          background: "rgba(139, 92, 246, 0.3)",
        }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            fontSize: "12px",
            color: "#ffffff",
          }}
        >
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => {
              const value = e.target.value;
              setCurrText(value);
              updateNodeField(id, "text", value);
            }}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(139, 92, 246, 0.4)",
              color: "#ffffff",
              resize: "vertical",
              minHeight: "40px",
              fontFamily: "inherit",
              fontSize: "12px",
              width: "100%",
              boxSizing: "border-box",
            }}
            placeholder="Enter text with {{ variables }}"
          />
        </label>

        {/* Show detected variables */}
        {variables.length > 0 && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Variables: {variables.join(", ")}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
