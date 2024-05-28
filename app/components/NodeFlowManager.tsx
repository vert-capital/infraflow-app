import { useCallback, useEffect, useRef, useState } from "react";
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
import { DefaultNode, GroupNode } from "./Nodes";
import { NodeTypes } from "./Nodes/types";

const connectionLineStyle = { stroke: "#000" };

const nodeTypes: any = {
  [NodeTypes.DEFAULT]: DefaultNode,
  [NodeTypes.GROUP]: GroupNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const NodeFlowManager = () => {
  const selector = (state: FlowStore) => ({
    nodes: state.nodes.sort((a, b) =>
      !!a.parentNode && !b.parentNode ? 1 : -1
    ),
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
  const dragRef = useRef(null);
  const [target, setTarget] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [formControl, setFormControl] = useState({
    label: "",
    type: NodeTypes.DEFAULT,
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

    const styles = {
      width: formControl.type === NodeTypes.DEFAULT ? 250 : 300,
      height: formControl.type === NodeTypes.GROUP ? 250 : null,
    };

    const newNode: Node = {
      id: uuidv4(),
      type: formControl.type,
      position,
      data: {
        label: `${formControl.type} node`,
        resizable: formControl.type === NodeTypes.GROUP ? true : false,
      },
      style: styles,
    };

    addNewNode(newNode);
  };

  const addNewNode = useCallback(
    (newNode: Node) => {
      addNode(newNode);
    },
    [addNode]
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

  const onNodeDragStart = (evt, node) => {
    dragRef.current = node;
  };

  const onNodeDrag = (evt, node) => {
    // calculate the center point of the node from position and dimensions
    const centerX = node.position.x + node.width / 2;
    const centerY = node.position.y + node.height / 2;

    // find a node where the center point is inside
    const targetNode = nodes.find(
      (n) =>
        centerX > n.position.x &&
        centerX < n.position.x + n.width &&
        centerY > n.position.y &&
        centerY < n.position.y + n.height &&
        n.id !== node.id // this is needed, otherwise we would always find the dragged node
    );

    const targetStyled = {
      ...targetNode,
      style: {
        ...targetNode?.style,
        backgroundColor: "black",
        borderStyle: "dotted",
      },
    };

    setTarget(targetStyled);
  };

  const onNodeDragStop = (evt, node: Node) => {
    setNodes(
      nodes.map((n) => {
        if (n.id === node.id && target?.type === NodeTypes.GROUP) {
          n.parentNode = target.id;
        }
        return n;
      })
    );

    setTarget(null);
    dragRef.current = null;
  };

  useEffect(() => {
    console.log(nodes);
    // setNodes(
    //   nodes.map((n) => {
    //     if (n.id === node.id && target?.type === NodeTypes.GROUP) {
    //       n.parentNode = target.id;
    //     }
    //     return n;
    //   })
    // );
    // setNodes(
    //   (nodes) => console.log("changed")
    //   // nodes.map((node) => {
    //   //   if (node.id === target?.id) {
    //   //     node.style = {
    //   //       ...node.style,
    //   //       backgroundColor: dragRef.current?.data.color,
    //   //     };
    //   //     node.data = { ...node.data, label: dragRef.current?.data.color };
    //   //   } else if (node.id === dragRef.current?.id && target) {
    //   //     node.style = { ...node.style, backgroundColor: target.data.color };
    //   //     node.data = { ...node.data, label: target.data.color };
    //   //   } else {
    //   //     node.style = { ...node.style, backgroundColor: node.data.color };
    //   //     node.data = { ...node.data, label: node.data.color };
    //   //   }
    //   //   return node;
    //   // })
    // );
  }, [nodes]);

  return (
    <>
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
          <option value="default">Default</option>
          <option value="group">Grupo</option>
        </select>
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
          onNodeDragStart={onNodeDragStart}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};

export default NodeFlowManager;
