import { Edge, Node } from "reactflow";
import { create } from "zustand";

interface FlowManagerState {
  nodes: Node[];
  edges: Edge[];
  currentNode: Node | null;
  addNode: (node: Node) => void;
  setCurrentNode: (node: Node | null) => void;
  removeAllNodes: () => void;
}

export const useFlowManager = create<FlowManagerState>((set) => ({
  nodes: [],
  edges: [],
  currentNode: null,
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  setCurrentNode: (node) => set({ currentNode: node }),
  removeAllNodes: () => set({ nodes: [] }),
}));
