import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { FlowStore, useFlowStore } from "~/common/store";
import FlowManager from "~/components/FlowManager";
import { ManagerService } from "~/services/manager.service";
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
  const manager = new ManagerService();
  const nodes = await manager.getNodes(request);
  const edges = await manager.getEdges(request);

  return { nodes: nodes, edges: edges };
}

export default function Index() {
  const selector = (state: FlowStore) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  });
  const data = useLoaderData();
  const { setEdges, setNodes } = useFlowStore(useShallow(selector));

  useEffect(() => {
    setNodes(data.nodes);
    setEdges(data.edges);
  }, []);

  return (
    <div id="content-main" className="w-full">
      <div className="w-full">
        <FlowManager />
      </div>
    </div>
  );
}
