import React from 'react'

import Canvas, { addNode } from 'rflow'
import 'rflow/dist/index.css'

const App = () => {
  const initialNodes = [
    {
      id: 1,
      label: 'asdasd kjh hjkgjhg node',
      nextNodeIds: [2],
      x: 100,
      y: 100
    },
    {
      id: 2,
      label: 'asdasd node',
      nextNodeIds: [],
      x: 300,
      y: 100
    }
  ]

  return (
    <div style={{ width: 500, height: 300 }}>
      <Canvas nodes={initialNodes} />
    </div>
  )
}

export default App
