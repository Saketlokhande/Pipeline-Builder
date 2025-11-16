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
      // const response = await fetch('http://localhost:8000/pipelines/parse', {
      const response = await fetch(`${api}/pipelines/parse`, {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

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
      alert(
        `Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on port 8000.`
      );
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
