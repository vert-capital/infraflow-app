import { Icons } from "@vert-capital/design-system-ui";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function DatabaseNode({ ...props }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <Icons.Database color="teal"></Icons.Database>
        {props.data.label}
      </div>
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={props.isConnectable}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        isConnectable={props.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        isConnectable={props.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="d"
        isConnectable={props.isConnectable}
      />
    </div>
  );
}

export default memo(DatabaseNode);
