import { useCanvasStore } from '../store'

export const useNodesState = () => {
  const nodesState = useCanvasStore((state) => [state.nodes, state.setNodes])

  return nodesState
}
