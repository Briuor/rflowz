# rflow

> Library for building flow chart and diagrams using React

[![NPM](https://img.shields.io/npm/v/rflow.svg)](https://www.npmjs.com/package/rflow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install rflow
```

## Usage
### Basic Usage
<p align="center"> 
  <img style="border-radius: 5px" src="https://github.com/Briuor/rflow/blob/master/media/demo-rflow.gif?raw=true">
</p>

```jsx
import React from 'react';
import RFlow, { useNodeState } from 'rflow';
import 'rflow/dist/index.css';

const DefaultNode = ({ data }) => <div className='node'>{data.labelPrefix} Node</div>;

export default function App() {
  const [nodes, setNodes] = useNodeState([
    {
      id: '1',
      x: 100,
      y: 200,
      component: DefaultNode,
      data: { labelPrefix: 'First' },
      nextNodeIds: ['2']
    },
    {
      id: '2',
      x: 425,
      y: 224,
      component: DefaultNode,
      data: { labelPrefix: 'Second' },
      nextNodeIds: []
    }
  ]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RFlow nodes={nodes} />
    </div>
  );
}
```
### Passing Events to Node Component
<p align="center"> 
  <img style="border-radius: 5px" src="https://github.com/Briuor/rflow/blob/master/media/demo-event-rflow.gif?raw=true">
</p>

```jsx
import React, { useEffect } from 'react';
import RFlow, { useNodeState } from 'rflow';
import 'rflow/dist/index.css';

const StartNode = ({ data }) => (
  <div className='node'>
    Generate a random value
    <div
      onClick={data.generateRandomValue}
      className='random-btn'
      role='button'
    >
      Click Me
    </div>
  </div>
);

const ResultNode = ({ data }) => (
  <div className='node'>Result: {data.randomValue}</div>
);

export default function EventExample() {
  const [nodes, setNodes] = useNodeState([]);

  useEffect(() => {
    const generateRandomValue = (e) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === 'result') {
            const newNode = {
              ...node,
              data: {
                ...node.data,
                randomValue: Math.round(Math.random() * 999) + 1
              }
            };
            return newNode;
          }

          return node;
        })
      );
    };

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
      }
    ]);
  }, [setNodes]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RFlow nodes={nodes} />
    </div>
  );
}
```

## API

### RFlow
**Important:** The RFlow height is controlled by it's parent element.
```jsx
<div style={{ width: '100%', height: '100vh' }}>
  <RFlow nodes={nodes} />
</div>
```
#### props
- **nodes**
Type: Node[]


### Nodes

```js
const nodes = [{
  id: '1',
  x: 100,
  y: 200,
  component: CustomNode,
  data: { title: 'Node Title' },
  nextNodeIds: ['2']
}];
```
- **id (required)**
Description: Unique identifier
Type: string
- **x (required)**
Type: number
- **y (required)**
Type: number
- **component (required)**
Type: React.Component
- **data**
Type: Object
- **nextNodeIds**
Type: string[]
- **arrowColor**
Type: string
### Hooks
- #### useNodeState
  ##### Usage
  ```js
  import RFlow, { useNodeState } from 'rflow';

  function Component() {
    const [nodes, setNodes] = useNodeState([]);
    ...
  }
  ```
  ##### Typescript
  ```ts
  import RFlow, { useNodeState, Node } from 'rflow';

  function Component() {
    const [nodes, setNodes] = useNodeState<Node[]>([]);
    ...
  }
  ```

## License

MIT © [Briuor](https://github.com/Briuor)
