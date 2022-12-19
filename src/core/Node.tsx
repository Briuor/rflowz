import React, { useEffect, useRef } from 'react'
import { useCanvasStore } from '../store'
import Arrow from './Arrow'
import styles from './styles.module.css'
import { NodeID, NodeProps, RFlowState } from '../types'

export default function Node({ node, canvasRef }: NodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null)

  const setNodeMouseOffset = useCanvasStore(
    (state: RFlowState) => state.setNodeMouseOffset
  )
  const currentDraggingNode = useCanvasStore(
    (state: RFlowState) => state.currentDraggingNode
  )
  const setCurrentDraggingNode = useCanvasStore(
    (state: RFlowState) => state.setCurrentDraggingNode
  )
  const canvasProperties = useCanvasStore(
    (state: RFlowState) => state.canvasProperties
  )
  const updateNode = useCanvasStore((state: RFlowState) => state.updateNode)

  // change cursor when dragging node
  useEffect(() => {
    if(nodeRef.current) {
      nodeRef.current.style.cursor = currentDraggingNode ? 'grabbing' : 'pointer'
    }
  }, [currentDraggingNode])

  // initialize node width and height
  useEffect(() => {
    if (!nodeRef.current) return ;
    
    updateNode(node.id, {
      w: nodeRef.current.offsetWidth,
      h: nodeRef.current.offsetHeight
    })
  }, [nodeRef.current, node.id, node.w, node.h, updateNode])

  // start dragging node
  const mouseDownHandler = (e: React.MouseEvent) => {
    if(!canvasRef.current) return ;
    
    const canvasInitialPos = canvasRef.current.getBoundingClientRect()
    setNodeMouseOffset({
      x: e.clientX - (canvasInitialPos.x + node.x * canvasProperties.scale),
      y: e.clientY - (canvasInitialPos.y + node.y * canvasProperties.scale)
    })

    setCurrentDraggingNode(node)
  }

  const NodeComponent = node.component

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
        }}
      >
        <NodeComponent node={node} />
      </div>
      {node.nextNodeIds?.map((nextNodeId: NodeID) => (
        <Arrow node={node} key={nextNodeId} nextNodeId={nextNodeId} />
      ))}
    </React.Fragment>
  )
}
