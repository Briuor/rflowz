import React, { useEffect, useRef } from 'react';
import Node from './Node';
import { useCanvasStore } from '../store';
import styles from './styles.module.css';
import {
  canvasProperties,
  Node as NodeType,
  RFlowProps,
  RFlowState
} from '../types';

export default function RFlow(props: RFlowProps) {
  const nodes = useCanvasStore((state: RFlowState) => state.nodes);
  const updateNode = useCanvasStore((state: RFlowState) => state.updateNode);
  const hangingPos = useCanvasStore((state: RFlowState) => state.hangingPos);
  const setHangingPos = useCanvasStore(
    (state: RFlowState) => state.setHangingPos
  );
  const canvasProperties = useCanvasStore(
    (state: RFlowState) => state.canvasProperties
  );
  const setCanvasProperties = useCanvasStore(
    (state: RFlowState) => state.setCanvasProperties
  );
  const nodeMouseOffset = useCanvasStore(
    (state: RFlowState) => state.nodeMouseOffset
  );
  const currentDraggingNode = useCanvasStore(
    (state: RFlowState) => state.currentDraggingNode
  );
  const setCurrentDraggingNode = useCanvasStore(
    (state: RFlowState) => state.setCurrentDraggingNode
  );
  const setNodes = useCanvasStore((state: RFlowState) => state.setNodes);

  const canvasRef = useRef<HTMLDivElement>(null);

  // initialize nodes
  useEffect(() => {
    setNodes(props.nodes);
  }, []);

  // reset mouse position and current dragging node when stop dragging canvas
  const mouseUpHandler = () => {
    setHangingPos(null);
    setCurrentDraggingNode(null);
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    // store mouse position when start dragging canvas
    setHangingPos({
      x: e.clientX - canvasProperties.tx,
      y: e.clientY - canvasProperties.ty
    });
  };

  const transformCanvas = (newCanvasProperties: canvasProperties) => {
    if (!canvasRef.current) return;

    canvasRef.current.style.transform = `translate(${newCanvasProperties.tx}px, ${newCanvasProperties.ty}px) scale(${newCanvasProperties.scale})`;
    setCanvasProperties(newCanvasProperties);
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const canvasInitialPos = canvasRef.current.getBoundingClientRect();
    // handle drag node
    if (currentDraggingNode) {
      const newCoodinates = {
        x:
          (e.clientX - nodeMouseOffset.x - canvasInitialPos.x) /
          canvasProperties.scale,
        y:
          (e.clientY - nodeMouseOffset.y - canvasInitialPos.y) /
          canvasProperties.scale
      };

      updateNode(currentDraggingNode.id, newCoodinates);
    }
    // handle drag canvas, translating canvas
    else if (hangingPos) {
      const newCanvasProperties = {
        tx: e.clientX - hangingPos.x,
        ty: e.clientY - hangingPos.y,
        scale: canvasProperties.scale
      };

      transformCanvas(newCanvasProperties);
    }
  };

  const zoomHandler = (e: React.WheelEvent) => {
    if (!canvasRef.current) return;

    const factor = 1.1;
    const center = {
      x: e.clientX - canvasRef.current.offsetWidth / 2,
      y: e.clientY - canvasRef.current.offsetHeight / 2
    };
    const { tx, ty, scale } = canvasProperties;
    const newCanvasProperties = { scale: 0, tx: 0, ty: 0 };

    // calculate new scale
    if (e.deltaY * -1 > 0) {
      newCanvasProperties.scale = scale * factor;
    } else {
      newCanvasProperties.scale = scale / factor;
    }

    // calculate new translate position
    newCanvasProperties.tx =
      center.x - ((center.x - tx) * newCanvasProperties.scale) / scale;
    newCanvasProperties.ty =
      center.y - ((center.y - ty) * newCanvasProperties.scale) / scale;

    transformCanvas(newCanvasProperties);
  };

  return (
    <div className={styles.rootContainer}>
      <div
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
        onWheel={zoomHandler}
        className={styles.container}
      >
        <div className={styles.canvas} ref={canvasRef}>
          {nodes
            ? nodes.map((node: NodeType) => {
                return <Node key={node.id} node={node} canvasRef={canvasRef} />;
              })
            : null}
        </div>
        <div className={styles.canvasControl} />
      </div>
    </div>
  );
}
