import create from 'zustand';
import produce from 'immer';
import { RFlowzState, Node } from '../types';

const useRFlowzStore = create<RFlowzState>((set, get) => ({
  nodes: [],
  hangingPos: null,
  nodeMouseOffset: { x: 0, y: 0 },
  canvasProperties: { tx: 0, ty: 0, scale: 1 },
  currentDraggingNode: null,
  updateNode: (nodeId, data) => {
    const nodeIndex = get().nodes.findIndex((n: Node) => n.id === nodeId);

    if (nodeIndex !== -1) {
      set(
        produce((state: RFlowzState) => {
          state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...data };
        })
      );
    }
  },
  setNodes: (nodesOrCallback) => {
    if (Array.isArray(nodesOrCallback)) {
      set({ nodes: nodesOrCallback });
    } else if (typeof nodesOrCallback === 'function') {
      set((state: RFlowzState) => ({ nodes: nodesOrCallback(state.nodes) }));
    } else {
      console.error('Wrong nodes type');
    }
  },
  setCanvasProperties: (canvasProperties) => set({ canvasProperties }),
  setHangingPos: (hangingPos) => set({ hangingPos }),
  setNodeMouseOffset: (offset) => set({ nodeMouseOffset: offset }),
  setCurrentDraggingNode: (item) => set({ currentDraggingNode: item })
}));

export { useRFlowzStore };
