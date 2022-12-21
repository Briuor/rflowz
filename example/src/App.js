import React, { useState } from 'react'
import SimpleExample from './examples/SimpleExample'
import EventExample from './examples/EventExample'

const Examples = {
  SimpleExample,
  EventExample
}

export default function App() {
  const [currenExampleKey, setCurrenExampleKey] = useState('SimpleExample')

  const renderExample = () => {
    const Example = Examples[currenExampleKey]
    return <Example />
  }

  return (
    <div>
      {Object.keys(Examples).map((currenExampleKey) => {
        return (
          <button
            onClick={() => setCurrenExampleKey(currenExampleKey)}
          >
            {currenExampleKey}
          </button>
        )
      })}
      <div>{renderExample(currenExampleKey)}</div>
    </div>
  )
}
