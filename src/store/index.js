import create from 'zustand'
import produce from 'immer'
import { devtools } from 'zustand/middleware'

const useCanvasStore = create(
  devtools((set, get) => ({
    hangingPos: null,
    canvasProperties: { tx: 0, ty: 0, scale: 1 },
    nodeMouseOffset: null,
    currentDraggingNode: null,
    selectedItem: null,
    nodes: [],
    addNode: (nodeId, newNodeData) => {
      const nodeIndex = get().nodes.findIndex((n) => n.id === nodeId)

      let newNode

      set(
        produce((state) => {
          const newId = Math.round(Math.random() * 9999)
          state.nodes[nodeIndex].nextNodeIds.push(newId)
          newNode = {
            id: newId,
            ...newNodeData
          }
          state.nodes.push(newNode)
        })
      )
    },
    updateNode: (nodeId, data) => {
      const nodeIndex = get().nodes.findIndex((n) => n.id === nodeId)

      if (nodeIndex !== -1) {
        set(
          produce((state) => {
            state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...data }
          })
        )
      }
    },
    deleteNode: (nodeId) => {
      const state = get()
      if (state.nodes.length > 1) {
        const nodeIndex = state.nodes.findIndex((n) => n.id === nodeId)
        set(
          produce((state) => {
            state.nodes.splice(nodeIndex, 1)
          })
        )
      }
    },
    setNodes: (nodes) => set({ nodes }),
    setCanvasProperties: (canvasProperties) => set({ canvasProperties }),
    setHangingPos: (hangingPos) => set({ hangingPos }),
    setNodeMouseOffset: (offset) => set({ nodeMouseOffset: offset }),
    setCurrentDraggingNode: (item) => set({ currentDraggingNode: item })
  }))
)

export { useCanvasStore }
