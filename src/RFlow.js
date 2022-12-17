import React, { useEffect, useRef } from 'react'
import Node from './Node'
import { useCanvasStore } from './store'
import styles from './styles.module.css'

export function RFlow(props) {
  const nodes = useCanvasStore((state) => state.nodes)
  const updateNode = useCanvasStore((state) => state.updateNode)

  const hangingPos = useCanvasStore((state) => state.hangingPos)
  const setHangingPos = useCanvasStore((state) => state.setHangingPos)

  const canvasProperties = useCanvasStore((state) => state.canvasProperties)
  const setCanvasProperties = useCanvasStore(
    (state) => state.setCanvasProperties
  )

  const nodeMouseOffset = useCanvasStore((state) => state.nodeMouseOffset)
  const currentDraggingNode = useCanvasStore(
    (state) => state.currentDraggingNode
  )
  const setCurrentDraggingNode = useCanvasStore(
    (state) => state.setCurrentDraggingNode
  )

  const selectedItem = useCanvasStore((state) => state.selectedItem)

  const setNodes = useCanvasStore((state) => state.setNodes)

  const deleteNode = useCanvasStore((state) => state.deleteNode)

  const canvasRef = useRef(null)

  // initialize nodes
  useEffect(() => {
    setNodes(props.nodes)
  }, [props.nodes, setNodes])

  // reset mouse position and current dragging node when stop dragging canvas
  const mouseUpHandler = () => {
    setHangingPos(null)
    setCurrentDraggingNode(null)
  }

  const mouseDownHandler = (e) => {
    // store mouse position when start dragging canvas
    setHangingPos({
      x: e.clientX - canvasProperties.tx,
      y: e.clientY - canvasProperties.ty
    })
  }

  const transformCanvas = (newCanvasProperties) => {
    canvasRef.current.style.transform = `translate(${newCanvasProperties.tx}px, ${newCanvasProperties.ty}px) scale(${newCanvasProperties.scale})`
    setCanvasProperties(newCanvasProperties)
  }

  const mouseMoveHandler = (e) => {
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

  const zoomHandler = (e) => {
    const factor = 1.1
    const center = {
      x: e.clientX - canvasRef.current.offsetWidth / 2,
      y: e.clientY - canvasRef.current.offsetHeight / 2
    }
    const { tx, ty, scale } = canvasProperties
    const newCanvasProperties = {}

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

  const keyDownHandler = (e) => {
    if (selectedItem && e.key === 'Delete') {
      deleteNode(selectedItem?.id)
      setCurrentDraggingNode(null)
    }
  }

  return (
    <div className={styles.rootContainer}>
      <div
        tabIndex='0'
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
        onWheel={zoomHandler}
        onKeyDown={keyDownHandler}
        className={styles.container}
      >
        <div className={styles.canvas} id='canvas' ref={canvasRef}>
          {nodes
            ? nodes.map((node) => {
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
