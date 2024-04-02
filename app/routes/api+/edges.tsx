import { LoaderFunctionArgs, json } from "@remix-run/node";
import { EdgeService } from "~/services/edge.service";

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new EdgeService();
  const response = await service.list(request);
  return json(response);
}
