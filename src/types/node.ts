import { RefObject } from "react";

export type NodeID = string

export interface Node {
    id: NodeID,
    x: number,
    y: number,
    w?: number,
    h?: number,
    component: new() => React.Component<any, any>,
    nextNodeIds: NodeID[]
}

export interface NodeProps {
    node: Node,
    canvasRef: RefObject<HTMLDivElement>
}