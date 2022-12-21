import { RFlowState } from './../types/rflow';
import { useEffect } from 'react';
import { useCanvasStore } from "../store"
import { Node } from '../types';

export const useNodeState = (initialNodes: Node[]) => {
    const [nodes, setNodes] = useCanvasStore((state: RFlowState) => [state.nodes, state.setNodes]);
    
    useEffect(() => {
        setNodes(initialNodes)
    }, [])

    return [nodes, setNodes]
}