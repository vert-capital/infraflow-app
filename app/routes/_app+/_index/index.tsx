import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { NodeModel } from "~/models/node.model";
import { NodeService } from "~/services/node.service";
import customStyle from "./custom.css?url";

export const meta: MetaFunction = () => {
  return [{ title: `Dashboard | InflaFlow` }];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: customStyle },
  {
    rel: "preload",
    as: "image",
    href: "/resources/images/illustration1.svg",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new NodeService();
  const nodes = await service.list(request);

  const edges = [
    {
      id: "a-b",
      source: "018e8cc7-e671-748a-8439-513f6e50d5d2",
      target: "011e8cca-103c-7126-8d18-349d423e10e4",
    },
    {
      id: "a-b",
      source: "018e8cc7-e671-748a-8439-513f6e50d5d2",
      target: "011e8cca-103c-7126-8d18-349d423e10e4",
    },
  ];

  return { nodes: nodes, edges: edges };
}

export default function Index() {
  const { nodes, edges } = useLoaderData<typeof loader>();

  const [stateNodes, setStateNodes] = useState<NodeModel[]>(nodes);
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
    <div id="content-main" className="w-full">
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
