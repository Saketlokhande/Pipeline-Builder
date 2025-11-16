// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { NumberNode } from "./nodes/numberNode";
import { ConditionNode } from "./nodes/conditionNode";
import { TransformNode } from "./nodes/transformNode";
import { MergeNode } from "./nodes/mergeNode";
import { FilterNode } from "./nodes/filterNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  number: NumberNode,
  condition: ConditionNode,
  transform: TransformNode,
  merge: MergeNode,
  filter: FilterNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      {/* Modal/Popover Container for Canvas */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(26, 26, 38, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1)",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Modal Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
              background: "rgba(139, 92, 246, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              Build Pipeline
            </h3>
          </div>

          {/* Canvas Area */}
          <div
            ref={reactFlowWrapper}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              background: "#1a1a26",
              overflow: "hidden",
              position: "relative",
              minHeight: 0,
            }}
          >
            {/* Star field effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                radial-gradient(2px 2px at 20% 30%, white, transparent),
                radial-gradient(2px 2px at 60% 70%, white, transparent),
                radial-gradient(1px 1px at 50% 50%, white, transparent),
                radial-gradient(1px 1px at 80% 10%, white, transparent),
                radial-gradient(2px 2px at 90% 40%, white, transparent),
                radial-gradient(1px 1px at 33% 60%, white, transparent),
                radial-gradient(2px 2px at 55% 80%, white, transparent)
              `,
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 0%",
                opacity: 0.3,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              proOptions={proOptions}
              snapGrid={[gridSize, gridSize]}
              connectionLineType="smoothstep"
              defaultEdgeOptions={{
                animated: true,
                style: { strokeWidth: 2, stroke: "#6366f1" },
                markerEnd: { type: "arrowclosed", color: "#6366f1" },
              }}
            >
              <Background
                variant="dots"
                gap={gridSize}
                size={1}
                color="#6366f1"
                style={{ opacity: 0.3 }}
              />
              <Controls />
              <MiniMap
                nodeColor={(node) => {
                  return "#6366f1";
                }}
                maskColor="rgba(99, 102, 241, 0.1)"
                style={{
                  backgroundColor: "rgba(26, 26, 38, 0.95)",
                }}
              />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
};
