from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import traceback

app = FastAPI()

# Add CORS middleware to allow frontend to connect
# Explicitly allow the frontend origin and common development origins
# Note: To allow all origins, use allow_origins=["*"] but you cannot mix "*" with specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pipeline-builder-1.onrender.com",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=[
        "Accept",
        "Accept-Language",
        "Content-Language",
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Origin",
        "Referer",
        "User-Agent",
        "sec-ch-ua",
        "sec-ch-ua-mobile",
        "sec-ch-ua-platform",
    ],
    expose_headers=["*"],
    max_age=3600,  # Cache preflight requests for 1 hour
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using topological sort.
    Returns True if the graph is a DAG (no cycles), False otherwise.
    """
    # Build adjacency list
    node_ids = {node.id for node in nodes}
    graph = {node_id: [] for node_id in node_ids}
    in_degree = {node_id: 0 for node_id in node_ids}
    
    for edge in edges:
        source = edge.source
        target = edge.target
        if source in node_ids and target in node_ids:
            graph[source].append(target)
            in_degree[target] = in_degree.get(target, 0) + 1
    
    # Find all nodes with no incoming edges
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    processed = 0
    
    # Process nodes with no incoming edges
    while queue:
        node = queue.pop(0)
        processed += 1
        
        # Remove this node and decrease in-degree of its neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    # If not, there's a cycle
    return processed == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions and return JSON response"""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": str(exc),
            "message": "An internal server error occurred",
            "type": type(exc).__name__
        }
    )

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result
        }
    except Exception as e:
        # Log the error for debugging
        print(f"Error in parse_pipeline: {str(e)}")
        print(traceback.format_exc())
        raise
