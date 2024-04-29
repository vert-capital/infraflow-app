import { ReactFlowProvider } from "reactflow";

import NodeAddManager from "./NodeAddManager";

export default function FlowManager() {
  return (
    <ReactFlowProvider>
      <NodeAddManager />
    </ReactFlowProvider>
  );
}
