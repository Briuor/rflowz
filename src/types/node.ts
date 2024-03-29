import { RefObject } from 'react';

export type NodeID = string;

export interface Node {
  id: NodeID;
  x: number;
  y: number;
  w?: number;
  h?: number;
  component: new () => React.Component<any, any>;
  data?: any;
  nextNodeIds?: NodeID[];
  arrowColor?: string;
}

export interface NodeProps {
  node: Node;
  canvasRef: RefObject<HTMLDivElement>;
}
