# Pipeline Builder

A modern, interactive pipeline builder application that allows users to create and validate data processing pipelines using a visual node-based interface. Build complex workflows by connecting different node types and validate that your pipeline forms a valid Directed Acyclic Graph (DAG).

## 🎯 Features

- **Visual Pipeline Builder**: Drag-and-drop interface for creating data processing pipelines
- **Multiple Node Types**:

  - **Input**: Data input nodes with file/text support
  - **LLM**: Large Language Model integration nodes
  - **Output**: Data output nodes
  - **Text**: Text processing nodes with dynamic variable parsing
  - **Number**: Mathematical operation nodes
  - **Condition**: Conditional logic nodes
  - **Transform**: Data transformation nodes
  - **Merge**: Data merging nodes
  - **Filter**: Data filtering nodes

- **Dynamic Text Variables**: Text nodes automatically detect variables in `{{ variable }}` format and create input handles dynamically
- **DAG Validation**: Backend validates that pipelines form a valid Directed Acyclic Graph (no cycles)
- **Modern UI**: Dark theme with purple/indigo gradient styling and glassmorphism effects
- **Real-time Preview**: MiniMap provides an overview of your pipeline structure

## 🛠️ Tech Stack

### Frontend

- **React**: UI framework
- **ReactFlow**: Node-based graph visualization
- **Zustand**: State management
- **JavaScript/ES6+**: Programming language

### Backend

- **FastAPI**: Python web framework
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

## 📁 Project Structure

```
frontend_technical_assessment/
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main application component
│   │   ├── ui.js               # ReactFlow canvas component
│   │   ├── toolbar.js          # Node palette sidebar
│   │   ├── submit.js           # Pipeline submission logic
│   │   ├── store.js            # Zustand state management
│   │   ├── draggableNode.js    # Draggable node component
│   │   └── nodes/
│   │       ├── BaseNode.js     # Base node abstraction
│   │       ├── inputNode.js    # Input node
│   │       ├── outputNode.js   # Output node
│   │       ├── llmNode.js      # LLM node
│   │       ├── textNode.js     # Text node with variable parsing
│   │       ├── numberNode.js   # Number node
│   │       ├── conditionNode.js # Condition node
│   │       ├── transformNode.js # Transform node
│   │       ├── mergeNode.js    # Merge node
│   │       └── filterNode.js   # Filter node
│   └── package.json
└── backend/
    ├── main.py                 # FastAPI backend application
    └── venv/                   # Python virtual environment
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip**

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Activate the virtual environment:

```bash
# On Linux/Mac
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

3. Install dependencies (if not already installed):

```bash
pip install fastapi uvicorn pydantic
```

4. Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

## 📖 Usage

### Creating a Pipeline

1. **Add Nodes**: Drag nodes from the "NODES" sidebar onto the canvas
2. **Connect Nodes**: Click and drag from a node's output handle to another node's input handle
3. **Configure Nodes**: Click on nodes to edit their properties
4. **Text Variables**: In Text nodes, use `{{ variableName }}` syntax to create dynamic input handles
5. **Validate Pipeline**: Click the "Submit Pipeline" button to validate your pipeline

### Node Types

- **Input Node**: Start of data flow, provides data to the pipeline
- **LLM Node**: Processes data using Large Language Models
- **Output Node**: End of data flow, receives processed data
- **Text Node**: Processes text with support for variable interpolation
- **Number Node**: Performs mathematical operations (add, subtract, multiply, divide)
- **Condition Node**: Implements conditional logic
- **Transform Node**: Transforms data structure
- **Merge Node**: Combines data from multiple sources
- **Filter Node**: Filters data based on conditions

### Pipeline Validation

When you submit a pipeline, the backend will:

- Count the number of nodes and edges
- Validate that the pipeline forms a DAG (no cycles)
- Return validation results in an alert

A valid DAG ensures that:

- Data flows in one direction (no circular dependencies)
- The pipeline can be executed in a deterministic order
- There are no infinite loops in the data flow

## 🔌 API Endpoints

### `GET /`

Health check endpoint

- **Response**: `{'Ping': 'Pong'}`

### `POST /pipelines/parse`

Validates a pipeline structure

- **Request Body**:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "position": { "x": 0, "y": 0 },
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "sourceHandle": null,
      "targetHandle": null
    }
  ]
}
```

- **Response**:

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## 🎨 Design Features

- **Dark Theme**: Modern dark purple/indigo color scheme
- **Glassmorphism**: Frosted glass effects on popovers
- **Gradient Backgrounds**: Dynamic gradient lighting effects
- **Dot Pattern Canvas**: Visual grid with dot pattern
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Animated edges and transitions

## 🔧 Development

### Node Abstraction

The project uses a `BaseNode` abstraction that provides:

- Consistent styling across all nodes
- Standardized input/output handle management
- Shared field update logic
- Reusable component structure

This makes it easy to create new node types by extending the base functionality.

### State Management

Zustand is used for state management, storing:

- All nodes in the pipeline
- All edges (connections) in the pipeline
- Node field values and configurations

## 📝 Notes

- The backend must be running on port 8000 for pipeline validation to work
- Text nodes automatically resize based on content
- Variables in text nodes are detected using the pattern `{{ variableName }}`
- All nodes support drag-and-drop positioning on the canvas
