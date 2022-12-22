import { Node, NodeID } from './node';

export type Position = {
  x: number;
  y: number;
};

export type canvasProperties = {
  tx: number;
  ty: number;
  scale: number;
};

export type setNodeCallback = (prev: Node[]) => Node[];

export type RFlowzState = {
  nodes: Node[];
  hangingPos: Position | null;
  nodeMouseOffset: Position;
  canvasProperties: canvasProperties;
  currentDraggingNode: Node | null;
  updateNode: (nodeId: NodeID, data: any) => void;
  setNodes: (nodesOrCallback: Node[] | setNodeCallback) => void | Node;
  setCanvasProperties: (canvasProperties: canvasProperties) => void;
  setHangingPos: (hangingPos: Position | null) => void;
  setNodeMouseOffset: (offset: Position) => void;
  setCurrentDraggingNode: (item: Node | null) => void;
};

export interface RFlowzProps {
  nodes: Node[];
}
