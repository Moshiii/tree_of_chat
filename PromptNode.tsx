import { memo, useEffect } from 'react';
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  type Node,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';

import { isTextNode, type MyNode } from './utils';

function PromptNode({ id, data }: NodeProps<Node<{ prompt: string }>>) {
  const { updateNodeData } = useReactFlow();
  const connections = useHandleConnections({
    type: 'target',
  });
  // const nodesData = useNodesData<MyNode>(connections[0]?.source);
  const nodesData = useNodesData<MyNode>(
    connections.map((connection) => connection.source)
  );
  const textNodes = nodesData;

  // const textNode = isTextNode(nodesData) ? nodesData : null;
  // const textNodes = nodesData.filter(isTextNode);

  // useEffect(() => {
  //   updateNodeData(id, { text: textNode?.data.text.toUpperCase() });
  // }, [textNode]);

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
      <Handle
        type="target"
        position={Position.Left}
        // isConnectable={connections.length === 0}
      />
      <div>node {id}</div>
      <div style={{ marginTop: 5 }}>
        <input
          onChange={(evt) =>
            updateNodeData(id, {
              prompt: evt.target.value,
            })
          }
          value={data.prompt}
          style={{ display: 'block' }}
        />
      </div>
      <div>context:</div>
      <div style={{ marginTop: 5 }}>
        {textNodes.map(({ data }, i) => <div key={i}>{data.text}</div>) ||
          'none'}
      </div>

      <div>Output:</div>
      <div style={{ marginTop: 5 }}>{data.text}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(PromptNode);
