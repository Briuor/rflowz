import { Node, NodeID } from './node';

export type Position = {
    x: number,
    y: number
}

export type canvasProperties = {
    tx: number,
    ty: number,
    scale: number
}

export type RFlowState = {
    nodes: Node[],
    hangingPos: Position | null,
    nodeMouseOffset: Position | null,
    canvasProperties: canvasProperties,
    currentDraggingNode: Node | null,
    updateNode: (nodeId: NodeID, data: any) => void,
    setNodes: (nodes: Node[]) => void,
    setCanvasProperties: (canvasProperties: canvasProperties) => void,
    setHangingPos: (hangingPos: Position | null) => void,
    setNodeMouseOffset: (offset: Position) => void,
    setCurrentDraggingNode: (item: Node | null) => void
}

export interface RFlowProps {
    nodes: Node[]
}