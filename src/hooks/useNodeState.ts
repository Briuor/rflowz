import { RFlowState } from './../types/rflow';
import { useEffect } from 'react';
import { useRFlowStore } from '../store';
import { Node } from '../types';

export const useNodeState = (initialNodes: Node[]) => {
  const [nodes, setNodes] = useRFlowStore((state: RFlowState) => [
    state.nodes,
    state.setNodes
  ]);

  useEffect(() => {
    setNodes(initialNodes);
  }, []);

  return [nodes, setNodes];
};
