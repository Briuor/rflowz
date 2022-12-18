import { useCanvasStore } from '../store'

export const useNodesState = () => {
  const nodesState = useCanvasStore((state: any) => [
    state.nodes,
    state.setNodes
  ])

  return nodesState
}
