import { memo } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';
import { isTextNode, type MyNode } from './utils';

function ResultNode() {
  const connections = useHandleConnections({
    type: 'target',
  });
  const nodesData = useNodesData<MyNode>(
    connections.map((connection) => connection.source)
  );
  // const textNodes = nodesData.filter(isTextNode);
  const textNodes = nodesData;

  return (
    <div
      style={{
        background: '#eee',
        color: '#222',
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div>
        context:{' '}
        {textNodes.map(({ data }, i) => <div key={i}>{data.text}</div>) ||
          'none'}
      </div>
    </div>
  );
}

export default memo(ResultNode);
