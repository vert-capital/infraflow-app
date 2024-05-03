import { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const DefaultNode = ({ selected, isConnectable, data }) => {
  const selectedStyles = selected
    ? "border-solid border-2 border-indigo-600 transition-all duration-100 ease-in-out"
    : "border-solid border-2 border-white-600";

  const [editInfo, setEditInfo] = useState(false);

  const onChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div
      onMouseEnter={() => setEditInfo(true)}
      onMouseLeave={() => setEditInfo(false)}
      className={`"${selectedStyles} p-6  bg-white rounded-lg shadow-md"`}
    >
      {editInfo && (
        <span className="absolute right-0 top-0 text-xxs text-gray-300 italic">
          duplo clique para editar
        </span>
      )}

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="left"
      />

      <div>
        {data.isEditing ? (
          <input id="text" name="text" onChange={onChange} className="nodrag" />
        ) : (
          <label htmlFor="">{data.isEditing}</label>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(DefaultNode);
