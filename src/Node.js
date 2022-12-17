import React, { useEffect, useRef } from 'react'
import { useCanvasStore } from './store'
import styles from './styles.module.css'
import Arrow from './Arrow'

const Node = ({ node, canvasRef }) => {
  const nodeRef = useRef(null)

  const setNodeMouseOffset = useCanvasStore((state) => state.setNodeMouseOffset)
  const currentDraggingNode = useCanvasStore(
    (state) => state.currentDraggingNode
  )
  const setCurrentDraggingNode = useCanvasStore(
    (state) => state.setCurrentDraggingNode
  )
  const canvasProperties = useCanvasStore((state) => state.canvasProperties)
  const updateNode = useCanvasStore((state) => state.updateNode)

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
  const mouseDownHandler = (e) => {
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
      {node.nextNodeIds?.map((nextNodeId) => (
        <Arrow node={node} key={nextNodeId} nextNodeId={nextNodeId} />
      ))}
    </React.Fragment>
  )
}

export default Node
