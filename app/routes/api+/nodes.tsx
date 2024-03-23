import { LoaderFunctionArgs, json } from '@remix-run/node';
import { NodeService } from '~/services/node.service';

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new NodeService();
  const response = await service.list(request);
  return json(response);
}
