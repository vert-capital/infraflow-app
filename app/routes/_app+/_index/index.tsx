import { LinksFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { MetaFunction, useLoaderData } from '@remix-run/react';
import { useCallback, useState } from 'react';
import ReactFlow, { Controls, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import customStyle from './custom.css?url';

import { FlowModel } from '~/models/flow.model';
import { FlowService } from '~/services/flow.service';

export const meta: MetaFunction = () => {
  return [{ title: `Dashboard | InflaFlow` }];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: customStyle },
  {
    rel: 'preload',
    as: 'image',
    href: '/resources/images/illustration1.svg',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new FlowService();
  const allFlow = await service.all(request);
  return json(new FlowModel(allFlow));
}

export default function Index() {
  const { nodes, edges } = useLoaderData<typeof loader>();

  const [stateNodes, setStateNodes] = useState(nodes);
  const [stateEdges, setStateEdges] = useState(edges);

  const onNodesChange = useCallback(
    (changes) => setStateNodes((nds) => applyNodeChanges(changes, nds)),
    [setStateNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setStateEdges((eds) => applyEdgeChanges(changes, eds)),
    [setStateEdges]
  );
  const onConnect = useCallback(
    (connection) => setStateEdges((eds) => addEdge(connection, eds)),
    [setStateEdges]
  );

  return (
    <div
      id="content-main"
      className="w-full"
    >
      <div className="w-full">
        <ReactFlow
          nodes={stateNodes}
          edges={stateEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="absolute object-center	items-center"
        >
          <Controls />
        </ReactFlow>
      </div>

    </div>
  );
}
