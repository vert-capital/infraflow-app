import { json } from '@remix-run/node';
import { NodeService } from '~/services/node.service';

export async function loader() {
  const service = new NodeService();
  const response = await service.list();
  return json(response);
}
