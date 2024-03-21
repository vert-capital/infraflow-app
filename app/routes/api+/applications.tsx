import { LoaderFunctionArgs, json } from '@remix-run/node';
import { ApplicationService } from '~/services/application.service';

export async function loader({ request }: LoaderFunctionArgs) {
    const service = new ApplicationService();
  const response = await service.list(request);
  return json(response);
}