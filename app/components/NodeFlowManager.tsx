import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlowInstance,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { useFlowManager } from "~/common/useFlowManager";
import DemoControls from "./DemoControls";

import { DatabaseNode, DefaultNode } from "./Nodes";
import { NodeTypes } from "./Nodes/types";

const connectionLineStyle = { stroke: "#000" };

const nodeTypes = {
  [NodeTypes.CUSTOM]: DefaultNode,
  [NodeTypes.DATABASE]: DatabaseNode,
};

const NodeFlowManager = () => {
  const store = useFlowManager();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes] = useNodesState(store.nodes);
  const [edges, setEdges] = useEdgesState(store.edges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = (
        reactFlowInstance as unknown as ReactFlowInstance
      )?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // useEffect(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       if (node.id === "1") {
  //         node.data = {
  //           ...node.data,
  //           label: nodeName,
  //         };
  //       }

  //       return node;
  //     })
  //   );
  // }, [nodeName, setNodes]);

  // const addNewNode = () => {
  //   const newNode: Node = {
  //     id: uuidv4(),
  //     type: "input",
  //     data: { label: `Node ${store.nodes.length + 1}` },
  //     position: { x: 250, y: 5 },
  //   };
  //   store.addNode(newNode);
  // };

  const setEditingNode = ({
    node = null,
    data = {},
  }: {
    node: Node | null;
    data: any;
  }) => {
    store.setCurrentNode(node);
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node?.id) {
          n.data = data;
        }
        return n;
      })
    );
  };

  return (
    <>
      <DemoControls />

      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDoubleClick={(_, node) =>
            setEditingNode({ node, data: { ...node.data, isEditing: true } })
          }
          onPaneClick={(_, node) => setEditingNode({ node: null, data: {} })}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};

export default NodeFlowManager;
