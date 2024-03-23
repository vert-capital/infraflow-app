import { LoaderFunctionArgs, json } from '@remix-run/node';
import { FlowModel } from '~/models/flow.model';
import { FlowService } from '~/services/flow.service';

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new FlowService();
  const allFlow = await service.all(request);
  return json(new FlowModel(allFlow));
}