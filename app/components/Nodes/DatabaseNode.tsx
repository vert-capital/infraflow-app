import { Icons } from "@vert-capital/design-system-ui";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function DatabaseNode({ ...props }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <Icons.Database color="teal"></Icons.Database>
        {JSON.stringify(props)}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}

export default memo(DatabaseNode);
