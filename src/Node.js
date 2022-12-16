import React, { useEffect, useRef } from 'react'
import { useCanvasStore } from './store'
import styles from './styles.module.css'
import Arrow from './Arrow'
import AddNodeIcon from './AddNodeIcon'

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
  const selectedItem = useCanvasStore((state) => state.selectedItem)
  const setSelectedItem = useCanvasStore((state) => state.setSelectedItem)

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

  // select node
  const mouseClickHandler = () => {
    setSelectedItem(node)
  }

  const nodeInputRef = useRef(null)

  useEffect(() => {
    if (nodeInputRef.current) {
      nodeInputRef.current.style.height = '1px'
      nodeInputRef.current.style.height =
        nodeInputRef.current.scrollHeight + 'px'
    }
    if (nodeRef.current) {
      updateNode(node.id, {
        w: nodeRef.current.offsetWidth,
        h: nodeRef.current.offsetHeight
      })
    }
  }, [nodeInputRef.current, node.label])

  const doubleClickHandler = () => {
    nodeInputRef.current.focus()
  }

  const onChange = (e) => {
    e.target.parentNode.dataset.replicatedValue = e.target.value
    updateNode(node.id, {
      w: nodeRef.current.offsetWidth,
      h: nodeRef.current.offsetHeight,
      label: e.target.value
    })
  }

  return (
    <React.Fragment>
      <div
        id={node.id}
        ref={nodeRef}
        onDoubleClick={doubleClickHandler}
        onMouseDown={mouseDownHandler}
        onClick={mouseClickHandler}
        className={styles.node}
        style={{
          top: node.y,
          left: node.x,
          border: selectedItem?.id === node.id ? '2px solid #3B4252' : 'none',
          color: '#3B4252',
          background: '#f5f5f5'
        }}
      >
        <div className={styles.wrapper}>
          <textarea
            onDoubleClick={doubleClickHandler}
            ref={nodeInputRef}
            value={node.label}
            onChange={onChange}
            wrap='hard'
            style={{
              outline: '0px solid transparent',
              pointerEvents: 'none',
              background: '#f5f5f5',
              border: 'none',
              wordWrap: 'break-word'
            }}
          />
        </div>
        <AddNodeIcon node={node} nodeRef={nodeRef} />
      </div>
      {node.nextNodeIds.map((nextNodeId) => (
        <Arrow node={node} key={nextNodeId} nextNodeId={nextNodeId} />
      ))}
    </React.Fragment>
  )
}

export default Node
