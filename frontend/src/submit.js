// submit.js

import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const api = process.env.REACT_APP_API_URL; // value: https://pipeline-builder.onrender.com/

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      // Check if API URL is configured
      if (!api) {
        throw new Error(
          "API URL is not configured. Please set REACT_APP_API_URL environment variable."
        );
      }

      // const response = await fetch('http://localhost:8000/pipelines/parse', {
      const apiUrl = api.endsWith("/") ? api.slice(0, -1) : api;
      const fullUrl = `${apiUrl}/pipelines/parse`;

      console.log("Making request to:", fullUrl);

      const response = await fetch(fullUrl, {
        // Done this to deploy on render, this env is only present in the production build
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges,
        }),
      });

      // Get response text first (can only read body once)
      const text = await response.text();

      if (!response.ok) {
        // Try to get error message from response
        const contentType = response.headers.get("content-type");
        let errorMessage = `HTTP error! status: ${response.status}`;

        if (text && text.trim().length > 0) {
          if (contentType && contentType.includes("application/json")) {
            try {
              const errorData = JSON.parse(text);
              errorMessage =
                errorData.detail || errorData.message || errorMessage;
            } catch (e) {
              // If JSON parsing fails, use text as is
              errorMessage = text.substring(0, 200);
            }
          } else {
            errorMessage = text.substring(0, 200);
          }
        } else {
          errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      // Check if response has content
      if (!text || text.trim().length === 0) {
        throw new Error("Empty response from server");
      }

      // Check content type
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          `Expected JSON response but got: ${
            contentType || "unknown"
          }. Response: ${text.substring(0, 200)}`
        );
      }

      // Parse JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
      }

      // Display alert with results
      const message = `
Pipeline Analysis Results:

• Number of Nodes: ${data.num_nodes}
• Number of Edges: ${data.num_edges}
• Is DAG: ${data.is_dag ? "Yes ✓" : "No ✗"}

${
  data.is_dag
    ? "Your pipeline is a valid Directed Acyclic Graph!"
    : "Warning: Your pipeline contains cycles and is not a valid DAG."
}
      `.trim();

      alert(message);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      console.error("API URL:", api);
      console.error("Full error:", error);

      let errorMsg = `Error submitting pipeline: ${error.message}`;

      // Add helpful hints based on error type
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        errorMsg += "\n\n• Check if the backend is running and accessible";
        errorMsg += `\n• Backend URL: ${api || "not configured"}`;
        errorMsg += "\n• Check CORS settings on the backend";
      } else if (
        error.message.includes("Empty response") ||
        error.message.includes("JSON")
      ) {
        errorMsg +=
          "\n\n• The backend may have returned an empty or invalid response";
        errorMsg += "\n• Check backend logs for errors";
        errorMsg += `\n• Backend URL: ${api || "not configured"}`;
      }

      alert(errorMsg);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          padding: "10px 24px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#ffffff",
          background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
          transition: "all 0.2s ease",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow =
            "0 6px 16px rgba(139, 92, 246, 0.5)";
          e.currentTarget.style.background =
            "linear-gradient(90deg, #9d6ff7 0%, #4a90e2 100%)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(139, 92, 246, 0.4)";
          e.currentTarget.style.background =
            "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)";
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
