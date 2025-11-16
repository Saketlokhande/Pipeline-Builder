import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: "0",
        margin: "0",
        background: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Modern gradient background effects */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-40%",
          left: "-15%",
          width: "50%",
          height: "80%",
          background:
            "radial-gradient(ellipse, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-15%",
          width: "50%",
          height: "80%",
          background:
            "radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "20%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(168, 85, 247, 0.3) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(50px)",
        }}
      />

      {/* Compact Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1
            style={{
              margin: "0",
              fontSize: "28px",
              fontWeight: "600",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              color: "#60a5fa",
              textShadow: "0 0 10px rgba(96, 165, 250, 0.5)",
            }}
          >
            Pipeline Builder
          </h1>
        </div>
        <SubmitButton />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* Left Side - Node Palette in Popover */}
        <PipelineToolbar />

        {/* Right Side - Canvas in Popover */}
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
