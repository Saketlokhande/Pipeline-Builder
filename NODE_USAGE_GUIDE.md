# Node Usage Guide - Frontend Technical Assessment

## Prerequisites

1. **Start the Backend** (Terminal 1):
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   uvicorn main:app --reload
   ```
   Backend should be running on `http://localhost:8000`

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm install  # Only needed first time
   npm start
   ```
   Frontend should open at `http://localhost:3000`

---

## Step-by-Step: Creating and Using Nodes

### Step 1: Access the Node Palette
- At the top of the page, you'll see the **"Node Palette"** section
- This contains all available nodes you can drag and drop

### Step 2: Create Your First Node
1. **Click and hold** on any node in the palette (e.g., "Input")
2. **Drag** it onto the canvas area (the white workspace below)
3. **Release** to drop the node
4. The node will appear on the canvas at the drop location

### Step 3: Create Multiple Nodes
Repeat Step 2 for each node you want to use:
- Drag "Input" node
- Drag "Text" node
- Drag "Number" node
- Drag "Transform" node
- Drag "Condition" node
- Drag "Merge" node
- Drag "Filter" node
- Drag "Output" node

### Step 4: Configure Node Properties
1. **Click on a node** to select it
2. **Edit the fields** directly in the node:
   - **Input Node**: Set name and type (Text/File)
   - **Text Node**: Enter text, use `{{ variable }}` for variables
   - **Number Node**: Choose operation (add/subtract/multiply/divide) and value
   - **Condition Node**: Set condition type and threshold
   - **Transform Node**: Select transformation type
   - **Merge Node**: Choose merge type and separator
   - **Filter Node**: Set filter type and value
   - **Output Node**: Set name and type

### Step 5: Connect Nodes Together
1. **Hover** over a node to see connection points (handles)
   - **Left side** = Input handles (target)
   - **Right side** = Output handles (source)
2. **Click and drag** from an output handle (right side) of one node
3. **Drag to** an input handle (left side) of another node
4. **Release** to create a connection (edge)
5. The connection will appear as an animated line

### Step 6: Move Nodes Around
- **Click and drag** a node to reposition it on the canvas
- Nodes snap to a grid for alignment

---

## Practical Examples Using the 5 New Nodes

### Example 1: Number Operations Pipeline
**Purpose**: Perform mathematical operations on input data

1. Create nodes:
   - 1x Input node
   - 1x Number node
   - 1x Output node

2. Configure:
   - **Input Node**: Name = "data", Type = "Text"
   - **Number Node**: Operation = "multiply", Value = "2"
   - **Output Node**: Name = "result", Type = "Text"

3. Connect:
   - Input → Number → Output

### Example 2: Text Transformation Pipeline
**Purpose**: Transform text input through multiple steps

1. Create nodes:
   - 1x Input node
   - 1x Transform node
   - 1x Output node

2. Configure:
   - **Input Node**: Name = "text_input", Type = "Text"
   - **Transform Node**: Transform Type = "uppercase"
   - **Output Node**: Name = "transformed", Type = "Text"

3. Connect:
   - Input → Transform → Output

### Example 3: Conditional Routing Pipeline
**Purpose**: Route data based on conditions

1. Create nodes:
   - 1x Input node
   - 1x Condition node
   - 2x Output nodes (for true/false paths)

2. Configure:
   - **Input Node**: Name = "value", Type = "Text"
   - **Condition Node**: Condition = "greater", Threshold = "10"
   - **Output Node 1**: Name = "high_value", Type = "Text"
   - **Output Node 2**: Name = "low_value", Type = "Text"

3. Connect:
   - Input → Condition
   - Condition (true output) → Output 1
   - Condition (false output) → Output 2

### Example 4: Data Merging Pipeline
**Purpose**: Combine multiple data sources

1. Create nodes:
   - 3x Input nodes
   - 1x Merge node
   - 1x Output node

2. Configure:
   - **Input Node 1**: Name = "data1", Type = "Text"
   - **Input Node 2**: Name = "data2", Type = "Text"
   - **Input Node 3**: Name = "data3", Type = "Text"
   - **Merge Node**: Merge Type = "concat", Separator = ", "
   - **Output Node**: Name = "merged", Type = "Text"

3. Connect:
   - Input 1 → Merge (input1)
   - Input 2 → Merge (input2)
   - Input 3 → Merge (input3)
   - Merge → Output

### Example 5: Filtering Pipeline
**Purpose**: Filter data based on criteria

1. Create nodes:
   - 1x Input node
   - 1x Filter node
   - 2x Output nodes (matched/unmatched)

2. Configure:
   - **Input Node**: Name = "items", Type = "Text"
   - **Filter Node**: Filter Type = "contains", Filter Value = "important"
   - **Output Node 1**: Name = "filtered", Type = "Text"
   - **Output Node 2**: Name = "rejected", Type = "Text"

3. Connect:
   - Input → Filter
   - Filter (matched) → Output 1
   - Filter (unmatched) → Output 2

### Example 6: Complex Pipeline with Text Variables
**Purpose**: Use Text node with dynamic variables

1. Create nodes:
   - 1x Input node
   - 1x Text node
   - 1x Output node

2. Configure:
   - **Input Node**: Name = "name", Type = "Text"
   - **Text Node**: Enter text like `"Hello {{ name }}, welcome!"`
     - This automatically creates an input handle for "name"
   - **Output Node**: Name = "greeting", Type = "Text"

3. Connect:
   - Input → Text (connect to the "name" handle that appeared)
   - Text → Output

4. **Note**: The Text node will automatically:
   - Resize as you type more text
   - Create input handles for each `{{ variable }}` found
   - Show detected variables below the textarea

---

## Advanced Tips

### Using Multiple Handles
- Some nodes have multiple input/output handles:
  - **LLM Node**: 2 inputs (system, prompt), 1 output
  - **Condition Node**: 1 input, 2 outputs (true, false)
  - **Merge Node**: 3 inputs, 1 output
  - **Filter Node**: 1 input, 2 outputs (matched, unmatched)

### Text Node Variable Syntax
- Use `{{ variableName }}` in Text nodes
- Variable names must be valid JavaScript identifiers:
  - ✅ Valid: `{{ input }}`, `{{ data }}`, `{{ value1 }}`
  - ❌ Invalid: `{{ 123 }}`, `{{ input-data }}`, `{{ input data }}`
- Each unique variable creates a separate input handle

### Canvas Controls
- **Zoom**: Use mouse wheel or zoom controls (top-right)
- **Pan**: Click and drag empty canvas area
- **Minimap**: Bottom-right shows overview of your pipeline
- **Grid**: Nodes snap to grid for alignment

---

## Testing Your Pipeline

### Step 1: Build Your Pipeline
- Create and connect nodes as described above

### Step 2: Submit for Analysis
1. Click the **"Submit Pipeline"** button at the bottom
2. The frontend sends your pipeline to the backend
3. An alert will appear showing:
   - Number of nodes
   - Number of edges
   - Whether it's a valid DAG (Directed Acyclic Graph)

### Step 3: Verify DAG Status
- **Valid DAG**: No cycles in your pipeline (good!)
- **Not a DAG**: Contains cycles (may need to restructure)

---

## Troubleshooting

### Node Not Appearing
- Make sure you're dragging onto the white canvas area
- Check that you're releasing the mouse button

### Can't Connect Nodes
- Ensure you're connecting output (right) to input (left)
- Some nodes have specific handle requirements
- Check that handles are visible (hover over node)

### Text Node Variables Not Working
- Ensure syntax is exactly `{{ variableName }}`
- Variable name must be valid JavaScript identifier
- Check that variable name appears below textarea

### Backend Connection Error
- Verify backend is running on port 8000
- Check browser console for error messages
- Ensure CORS is properly configured

### Submit Button Not Working
- Check that backend is running
- Verify nodes and edges exist in your pipeline
- Check browser console for errors

---

## Quick Reference: Node Types

| Node | Inputs | Outputs | Purpose |
|------|--------|---------|---------|
| Input | 0 | 1 | Entry point for data |
| Output | 1 | 0 | Exit point for data |
| Text | Variable* | 1 | Text processing with variables |
| Number | 1 | 1 | Mathematical operations |
| Condition | 1 | 2 | Conditional routing |
| Transform | 1 | 1 | Text transformations |
| Merge | 3 | 1 | Combine multiple inputs |
| Filter | 1 | 2 | Filter data by criteria |
| LLM | 2 | 1 | LLM processing |

*Text node creates inputs dynamically based on `{{ variables }}` found

---

## Next Steps

1. Experiment with different node combinations
2. Create complex pipelines with multiple branches
3. Test DAG validation with various graph structures
4. Try creating cycles intentionally to see DAG detection
5. Explore all node configuration options

Happy pipeline building! 🚀

