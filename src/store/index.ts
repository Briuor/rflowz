import create from 'zustand'
import produce from 'immer'
import { RFlowState, Node } from '../types'

const useCanvasStore = create<RFlowState>(
  (set, get) => ({
    nodes: [],
    hangingPos: null,
    nodeMouseOffset: { x:0, y: 0 },
    canvasProperties: { tx: 0, ty: 0, scale: 1 },
    currentDraggingNode: null,
    // addNode: (nodeId: any, newNodeData: any) => {
    //   const nodeIndex = get().nodes.findIndex((n: any) => n.id === nodeId)

    //   let newNode

    //   set(
    //     produce((state: any) => {
    //       const newId = Math.round(Math.random() * 9999)
    //       state.nodes[nodeIndex].nextNodeIds.push(newId)
    //       newNode = {
    //         id: newId,
    //         ...newNodeData
    //       }
    //       state.nodes.push(newNode)
    //     })
    //   )
    // },
    updateNode: (nodeId, data) => {
      const nodeIndex = get().nodes.findIndex((n: Node) => n.id === nodeId)

      if (nodeIndex !== -1) {
        set(
          produce((state: RFlowState) => {
            state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...data }
          })
        )
      }
    },
    // deleteNode: (nodeId: any) => {
    //   const state = get()
    //   if (state.nodes.length > 1) {
    //     const nodeIndex = state.nodes.findIndex((n: any) => n.id === nodeId)
    //     set(
    //       produce((state: any) => {
    //         state.nodes.splice(nodeIndex, 1)
    //       })
    //     )
    //   }
    // },
    setNodes: (nodes) => set({ nodes }),
    setCanvasProperties: (canvasProperties) => set({ canvasProperties }),
    setHangingPos: (hangingPos) => set({ hangingPos }),
    setNodeMouseOffset: (offset) => set({ nodeMouseOffset: offset }),
    setCurrentDraggingNode: (item) => set({ currentDraggingNode: item })
  })
)

export { useCanvasStore }
