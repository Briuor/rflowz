import { RFlowzState } from '../types/rflowz';
import { useEffect } from 'react';
import { useRFlowzStore } from '../store';
import { Node } from '../types';

export const useNodeState = (initialNodes: Node[]) => {
  const [nodes, setNodes] = useRFlowzStore((state: RFlowzState) => [
    state.nodes,
    state.setNodes
  ]);

  useEffect(() => {
    setNodes(initialNodes);
  }, []);

  return [nodes, setNodes];
};
