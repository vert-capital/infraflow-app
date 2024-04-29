import { Edge, Node } from "reactflow";
import { create } from "zustand";

interface FlowManagerState {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  removeAllNodes: () => void;
}

export const useFlowManager = create<FlowManagerState>((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  removeAllNodes: () => set({ nodes: [] }),
}));
