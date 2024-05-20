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

import { useShallow } from "zustand/react/shallow";
import FloatingEdge from "./Edges/FloatingEdge";
import { DatabaseNode, DefaultNode } from "./Nodes";
import { NodeTypes } from "./Nodes/types";

const connectionLineStyle = { stroke: "#000" };

const nodeTypes: any = {
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
    setNodes,
  } = useFlowStore(useShallow(selector));

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [formControl, setFormControl] = useState({
    label: "",
    type: NodeTypes.CUSTOM,
  });

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

  const onAddNewNode = (event) => {
    const position = (
      reactFlowInstance as unknown as ReactFlowInstance
    )?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: uuidv4(),
      type: formControl.type,
      position,
      data: { label: `${formControl.type} node` },
      style: {
        width: 150,
      },
    };

    addNewNode(newNode);
  };

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

  const onAddNewGroup = useCallback(() => {
    const groupNode = {
      id: uuidv4(),
      data: { label: "Group A" },
      position: { x: 100, y: 100 },
      className: "light",
      style: {
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        width: 200,
        height: 200,
      },
    };
    addNode(groupNode);
  }, [addNode]);

  return (
    <>
      {/* <DemoControls /> */}

      <div className="text-md flex fixed rounded-md bg-white z-40 py-3 px-10 gap-3">
        <label className="font-bold" htmlFor="label">
          Label:
        </label>
        <input
          className="bg-gray-200 rounded-md px-2"
          type="text"
          name="label"
          id="label"
          onChange={(e) =>
            setFormControl({ ...formControl, label: e.target.value })
          }
        />
        <label className="font-bold" htmlFor="type">
          Tipo:
        </label>
        <select
          className="bg-gray-200 rounded-md px-2"
          name="type"
          id="type"
          onChange={(e) =>
            setFormControl({ ...formControl, type: e.target.value })
          }
        >
          <option value="custom">Custom</option>
          <option value="database">Database</option>
        </select>
        <button
          onClick={onAddNewGroup}
          className="bg-foreground rounded-md px-3 text-white hover:opacity-75"
        >
          Adicionar grupo
        </button>
        <button
          onClick={onAddNewNode}
          className="bg-brand rounded-md px-3 text-white hover:opacity-75"
        >
          Adicionar
        </button>
      </div>

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
