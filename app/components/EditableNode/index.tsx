import { LinksFunction } from "@remix-run/node";
import { memo, useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import customStyle from "./style.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: customStyle },
];
const handleStyle = { left: 10 };

const EditableNode = memo(({ data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id="left"
      />
      <div
        onDoubleClickCapture={handleDoubleClick}
        className="p-4 bg-white rounded-lg shadow-md"
      >
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
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
});

EditableNode.displayName = "EditableNode";

export default EditableNode;
