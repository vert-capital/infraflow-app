import { ReactFlowProvider } from "reactflow";

import NodeFlowManager from "./NodeFlowManager";

export default function FlowManager() {
  return (
    <ReactFlowProvider>
      <NodeFlowManager />
    </ReactFlowProvider>
  );
}
