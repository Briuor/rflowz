import React, { useEffect, useRef } from 'react'
import Node from './Node'
import { useCanvasStore } from './store'
import styles from './styles.module.css';

export function RFlow(props: any) {
  const nodes = useCanvasStore((state: any) => state.nodes)
  const updateNode = useCanvasStore((state: any) => state.updateNode)

  const hangingPos = useCanvasStore((state: any) => state.hangingPos)
  const setHangingPos = useCanvasStore((state: any) => state.setHangingPos)

  const canvasProperties = useCanvasStore(
    (state: any) => state.canvasProperties
  )
  const setCanvasProperties = useCanvasStore(
    (state: any) => state.setCanvasProperties
  )

  const nodeMouseOffset = useCanvasStore((state: any) => state.nodeMouseOffset)
  const currentDraggingNode = useCanvasStore(
    (state: any) => state.currentDraggingNode
  )
  const setCurrentDraggingNode = useCanvasStore(
    (state: any) => state.setCurrentDraggingNode
  )

  const selectedItem = useCanvasStore((state: any) => state.selectedItem)

  const setNodes = useCanvasStore((state: any) => state.setNodes)

  const deleteNode = useCanvasStore((state: any) => state.deleteNode)

  const canvasRef = useRef<any>(null)

  // initialize nodes
  useEffect(() => {
    setNodes(props.nodes)
  }, [props.nodes, setNodes])

  // reset mouse position and current dragging node when stop dragging canvas
  const mouseUpHandler = () => {
    setHangingPos(null)
    setCurrentDraggingNode(null)
  }

  const mouseDownHandler = (e: any) => {
    // store mouse position when start dragging canvas
    setHangingPos({
      x: e.clientX - canvasProperties.tx,
      y: e.clientY - canvasProperties.ty
    })
  }

  const transformCanvas = (newCanvasProperties: any) => {
    canvasRef.current.style.transform = `translate(${newCanvasProperties.tx}px, ${newCanvasProperties.ty}px) scale(${newCanvasProperties.scale})`
    setCanvasProperties(newCanvasProperties)
  }

  const mouseMoveHandler = (e: any) => {
    const canvasInitialPos = canvasRef.current.getBoundingClientRect()
    // handle drag node
    if (currentDraggingNode) {
      const newCoodinates = {
        x:
          (e.clientX - nodeMouseOffset.x - canvasInitialPos.x) /
          canvasProperties.scale,
        y:
          (e.clientY - nodeMouseOffset.y - canvasInitialPos.y) /
          canvasProperties.scale
      }

      updateNode(currentDraggingNode.id, newCoodinates)
    }
    // handle drag canvas, translating canvas
    else if (hangingPos) {
      const newCanvasProperties = {
        tx: e.clientX - hangingPos.x,
        ty: e.clientY - hangingPos.y,
        scale: canvasProperties.scale
      }

      transformCanvas(newCanvasProperties)
    }
  }

  const zoomHandler = (e: any) => {
    const factor = 1.1
    const center = {
      x: e.clientX - canvasRef.current.offsetWidth / 2,
      y: e.clientY - canvasRef.current.offsetHeight / 2
    }
    const { tx, ty, scale } = canvasProperties
    const newCanvasProperties = { scale: 0, tx: 0, ty: 0 }

    // calculate new scale
    if (e.deltaY * -1 > 0) {
      newCanvasProperties.scale = scale * factor
    } else {
      newCanvasProperties.scale = scale / factor
    }

    // calculate new translate position
    newCanvasProperties.tx =
      center.x - ((center.x - tx) * newCanvasProperties.scale) / scale
    newCanvasProperties.ty =
      center.y - ((center.y - ty) * newCanvasProperties.scale) / scale

    transformCanvas(newCanvasProperties)
  }

  const keyDownHandler = (e: any) => {
    if (selectedItem && e.key === 'Delete') {
      deleteNode(selectedItem?.id)
      setCurrentDraggingNode(null)
    }
  }

  return (
    <div className={styles.rootContainer}>
      <div
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
        onWheel={zoomHandler}
        onKeyDown={keyDownHandler}
        className={styles.container}
      >
        <div className={styles.canvas} id='canvas' ref={canvasRef}>
          {nodes
            ? nodes.map((node: any) => {
                return (
                  <Node
                    key={node.id}
                    node={node}
                    canvasRef={canvasRef}
                    text={node.text}
                  />
                )
              })
            : null}
        </div>
        <div id='canvasControl' className={styles.canvasControl} />
      </div>
    </div>
  )
}

export default RFlow
