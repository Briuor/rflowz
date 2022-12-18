import React, { useEffect, useRef } from 'react'
import { useCanvasStore } from './store'
import Arrow from './Arrow'
import styles from './styles.module.css';

const Node = ({ node, canvasRef }: any) => {
  const nodeRef = useRef<any>(null)

  const setNodeMouseOffset = useCanvasStore(
    (state: any) => state.setNodeMouseOffset
  )
  const currentDraggingNode = useCanvasStore(
    (state: any) => state.currentDraggingNode
  )
  const setCurrentDraggingNode = useCanvasStore(
    (state: any) => state.setCurrentDraggingNode
  )
  const canvasProperties = useCanvasStore(
    (state: any) => state.canvasProperties
  )
  const updateNode = useCanvasStore((state: any) => state.updateNode)

  // change cursor when dragging node
  useEffect(() => {
    nodeRef.current.style.cursor = currentDraggingNode ? 'grabbing' : 'pointer'
  }, [currentDraggingNode])

  // initialize node width and height
  useEffect(() => {
    if (nodeRef.current) {
      updateNode(node.id, {
        w: nodeRef.current.offsetWidth,
        h: nodeRef.current.offsetHeight
      })
    }
  }, [nodeRef.current, node.id, updateNode])

  // start dragging node
  const mouseDownHandler = (e: any) => {
    const canvasInitialPos = canvasRef.current.getBoundingClientRect()
    setNodeMouseOffset({
      x: e.clientX - (canvasInitialPos.x + node.x * canvasProperties.scale),
      y: e.clientY - (canvasInitialPos.y + node.y * canvasProperties.scale)
    })

    setCurrentDraggingNode(node)
  }

  const Element = node.component

  return (
    <React.Fragment>
      <div
        id={node.id}
        ref={nodeRef}
        onMouseDown={mouseDownHandler}
        className={styles.node}
        style={{
          top: node.y,
          left: node.x,
          ...node.style
        }}
      >
        {node.component ? <Element node={node} /> : <span>{node.label}</span>}
      </div>
      {node.nextNodeIds?.map((nextNodeId: any) => (
        <Arrow node={node} key={nextNodeId} nextNodeId={nextNodeId} />
      ))}
    </React.Fragment>
  )
}

export default Node
