import { memo } from "react";
import { NodeResizer } from "reactflow";

const GroupNode = ({ selected, connectable, id, data }) => {
  return (
    <div className="px-4  w-full bg-brand-extra_light h-full py-2 shadow-md rounded-md  text-primary border-2 border-dashed">
      <NodeResizer isVisible={data.resizable} minWidth={180} minHeight={100} />
      <div className="flex text-xs">{data.label}</div>
    </div>
  );
};

export default memo(GroupNode);
