import React, {useEffect, useState} from 'react'
import RFlow from 'rflow'
import 'rflow/dist/index.css'

const DefaultNode = ({ node }) => {
  return (
    <div style={{ color: 'purple', border: '1px solid black', padding: 20 }}>
      {node.data.label} {node.data.count}
      {node.data.incrementCount && <span role="button" onClick={node.data.incrementCount}>Tap</span>}
    </div>
  )
}

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setNodes([
      ...nodes,
    ])
  }

  const [nodes, setNodes] = useState([
    {
      id: '1',
      x: 100,
      y: 200,
      component: DefaultNode,
      data: {
        label: 'Tap here -> ',
        incrementCount: incrementCount
      },
      nextNodeIds: ['2'],
    },
    {
      id: '2',
      x: 400,
      y: 200,
      component: DefaultNode,
      data: {
        count: count
      },
      nextNodeIds: [],
    },
  ]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RFlow nodes={nodes} />
    </div>
  )
}

export default App
