import { Link } from "@remix-run/react";
import { Icons } from "@vert-capital/design-system-ui";
import { memo, useState } from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "reactflow";

const DefaultNode = ({ selected, connectable, id, data }) => {
  const selectedStyles = selected
    ? "border-solid border-2 border-brand transition-all duration-100 ease-in-out"
    : "border-solid border-2 border-white-600";

  const [editInfo, setEditInfo] = useState(false);
  const [label, setLabel] = useState(data.label);
  const [icon, setIcon] = useState(() => "🚀");

  const { setNodes } = useReactFlow();

  const onSaveChanges = () => {
    performUpdate({ label: label, isEditing: false });
  };

  const onCancelChanges = () => {
    performUpdate({ isEditing: false });
  };

  const performUpdate = (data = {}) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      })
    );
  };

  const components = {
    Database: Icons.Database,
    App: Icons.AppWindow,
  };

  return (
    <div
      onMouseEnter={() => setEditInfo(true)}
      onMouseLeave={() => setEditInfo(false)}
      className={`"${selectedStyles} px-5 py-2  bg-white rounded-lg shadow-md"`}
    >
      {editInfo && !data.isEditing && (
        <span className="absolute right-0 top-0 text-[7px] text-gray-400 mx-2 italic">
          duplo clique para editar
        </span>
      )}

      {data.isEditing ? (
        <>
          <NodeToolbar isVisible>
            <button onClick={() => setIcon("Database")}>
              <Icons.DatabaseIcon />
            </button>
            <button onClick={() => setIcon("App")}>
              <Icons.AppWindow />
            </button>
            <button onClick={() => setIcon("✨")}>✨</button>
          </NodeToolbar>

          <div className="flex items-center gap-2">
            <input
              id="text"
              name="text"
              value={label}
              onChange={(e) => {
                setLabel(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSaveChanges({ isEditing: true });
                } else if (e.key === "Escape") {
                  onCancelChanges();
                }
              }}
              className="nodrag min-w-11 border-none bg-gray-200 outline-none p-2 h-7 rounded-md"
            />

            <div className="flex ">
              <Link
                to=""
                onClick={() => onCancelChanges()}
                className="rounded-full"
              >
                <Icons.X className=" hover:text-black hover:bg-gray-200 rounded-md cursor-pointer text-brand p-1" />
              </Link>

              <Link
                to=""
                onClick={() => onSaveChanges()}
                className="rounded-full"
              >
                <Icons.SaveIcon className=" hover:text-black hover:bg-gray-200 rounded-md cursor-pointer text-brand p-1" />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="min-w-11 flex">
          <Icons.DatabaseIcon></Icons.DatabaseIcon>
          <label htmlFor="">{data.label}</label>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={connectable}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        isConnectable={connectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        isConnectable={connectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="d"
        isConnectable={connectable}
      />
    </div>
  );
};

export default memo(DefaultNode);
