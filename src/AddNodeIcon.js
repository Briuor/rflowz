import React from 'react'
import NewNodeIcon from 'newnode.png'
import { useCanvasStore } from './store'
import styles from './styles.module.css'

export default function AddNodeIcon({ node, nodeRef }) {
  const selectedItem = useCanvasStore((state) => state.selectedItem)
  const addNode = useCanvasStore((state) => state.addNode)

  const handleAddNode = () => {
    addNode(node.id)
  }

  return nodeRef?.current && selectedItem?.id === node.id ? (
    <div
      style={{
        left: nodeRef.current?.offsetWidth + 10,
        top: nodeRef.current?.offsetHeight / 2 - 18
      }}
      onMouseDown={handleAddNode}
      className={styles.plusIcon}
    >
      <img src={NewNodeIcon} alt='Add Node' style={{ width: 22 }} />
    </div>
  ) : null
}
