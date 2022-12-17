import React, {useEffect} from 'react'
import RFlow, { useNodesState } from 'rflow'
import 'rflow/dist/index.css'

const CustomNode = ({ node }) => {
  return (
    <div style={{ color: 'purple' }}>
      {node.data.name}
      <button>test</button>
    </div>
  )
}

const CustomNode2 = ({ node }) => {
  return (
    <div style={{ color: 'pink', background: 'black' }}>
      <button>test</button>
      {node.data.name}
    </div>
  )
}

const App = () => {
  const [nodes, setNodes] = useNodesState([]);

  useEffect(() => {
    setNodes([
      {
        id: '1',
        x: 100,
        y: 200,
        component: CustomNode2,
        data: {
          name: 'Bruno'
        },
        nextNodeIds: ['2'],
      },
      {
        id: '2',
        x: 500,
        y: 100,
        component: CustomNode,
        data: {
          name: 'Bruno'
        },
      }
    ])
  }, [setNodes])

  return (
    <div style={{ width: 500, height: 300 }}>
      <RFlow nodes={nodes}  />
    </div>
  )
}

export default App
