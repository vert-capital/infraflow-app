import { Icons } from "@vert-capital/design-system-ui";
import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const DefaultNode = ({ selected, isConnectable, id, data }) => {
  const selectedStyles = selected
    ? "border-solid border-2 border-indigo-600 transition-all duration-100 ease-in-out"
    : "border-solid border-2 border-white-600";

  const [editInfo, setEditInfo] = useState(false);
  const [label, setLabel] = useState(data.label);

  const { setNodes } = useReactFlow();

  const onSaveChanges = () => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: label,
              isEditing: false,
            },
          };
        }
        return node;
      })
    );
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
        <div className="flex items-center gap-2">
          <input
            id="text"
            name="text"
            value={label}
            onChange={(e) => {
              setLabel(e.currentTarget.value);
            }}
            className="nodrag min-w-11 border-2 border-gray-300 p-2 rounded-md"
          />

          <Icons.SaveAll
            className="hover:text-indigo-500 cursor-pointer text-indigo-600 h-4"
            onClick={() => onSaveChanges()}
          />
        </div>
      ) : (
        <div className="min-w-11 flex">
          <label htmlFor="">{data.label}</label>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="d"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(DefaultNode);
