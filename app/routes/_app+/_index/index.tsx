import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction } from "@remix-run/react";
import FlowManager from "~/components/FlowManager";
import { EdgeService } from "~/services/edge.service";
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
  const edgeService = new EdgeService();
  const nodes = await service.all(request);

  const edges = await edgeService.all(request);

  return { nodes: nodes, edges: edges };
}

export default function Index() {
  return (
    <div id="content-main" className="w-full">
      <div className="w-full">
        <FlowManager />
      </div>
    </div>
  );
}
