import { Icons } from "@vert-capital/design-system-ui";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function DatabaseNode({ data, connectable }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <Icons.Database color="teal"></Icons.Database>
        {data.label}
      </div>
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
}

export default memo(DatabaseNode);
