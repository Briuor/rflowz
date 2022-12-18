import create from 'zustand'
import produce from 'immer'
import { devtools } from 'zustand/middleware'

const useCanvasStore = create(
  devtools((set, get: any) => ({
    hangingPos: null,
    canvasProperties: { tx: 0, ty: 0, scale: 1 },
    nodeMouseOffset: null,
    currentDraggingNode: null,
    selectedItem: null,
    nodes: [],
    addNode: (nodeId: any, newNodeData: any) => {
      const nodeIndex = get().nodes.findIndex((n: any) => n.id === nodeId)

      let newNode

      set(
        produce((state: any) => {
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
    updateNode: (nodeId: any, data: any) => {
      const nodeIndex = get().nodes.findIndex((n: any) => n.id === nodeId)

      if (nodeIndex !== -1) {
        set(
          produce((state: any) => {
            state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...data }
          })
        )
      }
    },
    deleteNode: (nodeId: any) => {
      const state = get()
      if (state.nodes.length > 1) {
        const nodeIndex = state.nodes.findIndex((n: any) => n.id === nodeId)
        set(
          produce((state: any) => {
            state.nodes.splice(nodeIndex, 1)
          })
        )
      }
    },
    setNodes: (nodes: any) => set({ nodes }),
    setCanvasProperties: (canvasProperties: any) => set({ canvasProperties }),
    setHangingPos: (hangingPos: any) => set({ hangingPos }),
    setNodeMouseOffset: (offset: any) => set({ nodeMouseOffset: offset }),
    setCurrentDraggingNode: (item: any) => set({ currentDraggingNode: item })
  }))
)

export { useCanvasStore }
