import { DragEvent, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { FlowStore, useFlowStore } from "~/common/store";
import { NodeTypes } from "./Nodes/types";

export default function DemoControls() {
  const store = useFlowStore();
  const selector = (state: FlowStore) => ({
    addNode: state.addNode,
  });

  const { addNode } = useFlowStore(useShallow(selector));

  const [debug, setDebug] = useState(false);

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const node = {
    id: "input",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 0, y: 50 },
  };

  return (
    <div className="text-sm">
      <div className="text-xs">Demo Controls</div>
      <input
        onChange={() => setDebug(!debug)}
        className="mx-2"
        type="checkbox"
        name=""
        id=""
      />
      Mostrar state
      <div className="flex items-center gap-2">
        <div className="flex gap-5">
          Nodes types (arraste e solte):
          <div
            className="bg-sky-5 bg-slate-700 text-white p-1 cursor-move"
            onDragStart={(event) => onDragStart(event, NodeTypes.CUSTOM)}
            draggable
          >
            Custom node
          </div>
          <div
            className="bg-sky-5 bg-sky-700 text-white p-1 cursor-move"
            onDragStart={(event) => onDragStart(event, NodeTypes.DATABASE)}
            draggable
          >
            Database node
          </div>
        </div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => addNode(node)}
        >
          Add node (random)
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={store.removeAllNodes}
        >
          Remove all
        </button>
      </div>
      {debug && (
        <pre className="text-xxs">{JSON.stringify(store.nodes, null, 2)}</pre>
      )}
    </div>
  );
}
