
import { ActionFunctionArgs, defer, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { formDataValues } from '@vert-capital/common';
import { useCallback, useState } from 'react';
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeService } from '~/services/node.service';
import FormFlow from './form/form-flow';

export async function loader() {
  const service = new NodeService();
  const initialNodes = await service.list();
  const initialEdges =  [
    { id: 'a1-a2', source: 'A-1', target: 'A-2' },
    { id: 'a2-b', source: 'A-2', target: 'B' },
    { id: 'a2-c', source: 'A-2', target: 'C' },
  ];
  return defer({ initialNodes, initialEdges });
}

const rfStyle = {
  position: 'absolute'
};

export default function NodeList() {
  const { initialNodes, initialEdges } = useLoaderData<typeof loader>();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="flex flex-row">
      <div className="basis-1/3">
        <div className="flex flex-row justify-between">
          <FormFlow />  
        </div>
      </div>
      <div className="basis-2/3">
 {/*        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={rfStyle}
          attributionPosition="top-right"
        >
          <Background />
      </ReactFlow> */}
      </div>
    </div>
  );
}


export async function action({ request }: ActionFunctionArgs) {
  const { ...values } = await formDataValues({ request });
  try {
    const service = new NodeService();
    await service.add(values);

    console.log('values', values);
  } catch (error) {
    return json({ error, lastSubmission: values });
  }
}

