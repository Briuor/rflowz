import React from 'react';
import RFlow, { useNodeState } from 'rflow';
import 'rflow/dist/index.css';

const DefaultNode = ({ data }) => <div className='node'>{data.label} Node</div>;

export default function SimpleExample() {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes] = useNodeState([
    {
      id: '1',
      x: 100,
      y: 200,
      component: DefaultNode,
      data: { label: 'First' },
      nextNodeIds: ['2']
    },
    {
      id: '2',
      x: 425,
      y: 224,
      component: DefaultNode,
      data: { label: 'Second' },
      nextNodeIds: []
    }
  ]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RFlow nodes={nodes} />
    </div>
  );
}
