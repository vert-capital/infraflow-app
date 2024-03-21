import type { LoaderFunctionArgs } from '@remix-run/node';
import { MetaFunction, redirect } from '@remix-run/node';
import routes from '~/common/routes';
import { AuthService } from '~/services/auth.service';
import { commitSession, getSession } from '~/sessions.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Redirecionando... | InfraFlow' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new AuthService();
  const values = {
    email: 'root@root.com.br',
    password: 'root'
  }
  const { token } = await service.logIn(values);

  const session = await getSession(request.headers.get('Cookie'));
  session.set('token', token);
  
  const headers = new Headers();
  headers.append('Set-Cookie', await commitSession(session));
  return redirect(routes.app, {
    headers: headers,
  });
}
