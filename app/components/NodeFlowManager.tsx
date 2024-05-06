import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  ConnectionMode,
  Edge,
  MarkerType,
  Node,
  ReactFlowInstance,
} from "reactflow";

import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { FlowStore, useFlowStore } from "~/common/store";
import DemoControls from "./DemoControls";

import { useShallow } from "zustand/react/shallow";
import FloatingEdge from "./Edges/FloatingEdge";
import { DatabaseNode, DefaultNode } from "./Nodes";
import { NodeTypes } from "./Nodes/types";

const connectionLineStyle = { stroke: "#000" };

const nodeTypes = {
  [NodeTypes.CUSTOM]: DefaultNode,
  [NodeTypes.DATABASE]: DatabaseNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const NodeFlowManager = () => {
  const selector = (state: FlowStore) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setNodes: state.setNodes,
    addNode: state.addNode,
    addEdge: state.addEdge,
    setEdges: state.setEdges,
  });

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setEdges,
    addNode,
    addEdge,
    setNodes,
  } = useFlowStore(useShallow(selector));

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const handleConnection = useCallback(
    (edge: Edge) =>
      setEdges(
        edges.concat({
          ...edge,
          type: "floating",
          markerEnd: { type: MarkerType.Arrow },
        })
      ),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const addNewNode = useCallback(
    (newNode: Node) => {
      addNode(newNode);
    },
    [addNode]
  );

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
        style: {
          width: 150,
        },
      };

      addNewNode(newNode);
    },
    [reactFlowInstance]
  );

  const setEditingNode = ({
    node = null,
    data = {},
  }: {
    node: Node | null;
    data: any;
  }) => {
    setNodes(
      nodes.map((n) => {
        if (n.id === node?.id) {
          n.data = data;
        }
        return n;
      })
    );
  };

  const resetState = () => {
    nodes.map((n) => {
      if (n.data.isEditing) {
        n.data.isEditing = false;
      }
      return n;
    });
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
          onPaneClick={() => resetState()}
          onConnect={handleConnection}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionLineStyle={connectionLineStyle}
          connectionMode={ConnectionMode.Loose}
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
