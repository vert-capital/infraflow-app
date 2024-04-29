import { useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Node,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { useFlowManager } from "~/common/useFlowManager";
import EditableNode from "./EditableNode";

const NodeAddManager = () => {
  const nodeTypes = {
    editableNode: EditableNode,
  };
  const store = useFlowManager();
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(store.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = uuidv4();
        const newNode = {
          id,
          type: "editableNode",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const resetAll = () => {
    setNodes([]);
    setEdges([]);
  };

  const addNewNode = () => {
    const node: Node = {
      id: uuidv4(),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      position: { x: 0, y: 0 },
      data: { label: "Node" },
      type: "editableNode",
    };
    setNodes([...nodes, node]);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-4">
        <button
          onClick={addNewNode}
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        >
          Add new node
        </button>

        <button
          onClick={resetAll}
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        >
          Reset all
        </button>
      </div>

      <div className="flex">
        <pre className="text-xs">{JSON.stringify(nodes, null, 2)}</pre>
        <div className="z-10">
          <div className="wrapper">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              fitView
              fitViewOptions={{ padding: 2 }}
              nodeOrigin={[0.5, 0]}
            >
              <MiniMap nodeStrokeWidth={3} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeAddManager;
