import React, { useEffect } from 'react'
import RFlow, { useNodeState } from 'rflow'
import 'rflow/dist/index.css'

const StartNode = ({ data }) => (
  <div className='node'>
    Generate a random value
    <div onClick={data.generateRandomValue} className='random-btn' role="button">
      Click Me
    </div>
  </div>
)

const ResultNode = ({ data }) => <div className='node'>Result: {data.randomValue}</div>

export default function EventExample() {
  const [nodes, setNodes] = useNodeState([])

  useEffect(() => {
    const generateRandomValue = (e) => {
      setNodes((nds) => nds.map((node) => {
          if(node.id === 'result') {
            const newNode = { 
              ...node, 
              data: { 
                ...node.data, 
                randomValue: Math.round(Math.random() * 999) + 1
              }
            }
            return newNode
          }
          
          return node
        })
      )
    }
    
    setNodes([
      {
        id: 'start',
        x: 100,
        y: 200,
        component: StartNode,
        data: {
          generateRandomValue: generateRandomValue
        },
        nextNodeIds: ['result']
      },
      {
        id: 'result',
        x: 425,
        y: 224,
        component: ResultNode,
        data: {
          randomValue: 1
        },
        nextNodeIds: []
      },
    ])
  }, [setNodes])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RFlow nodes={nodes} />
    </div>
  )
}
