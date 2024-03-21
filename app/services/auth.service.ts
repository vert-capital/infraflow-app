import { redirect } from '@remix-run/node';
import api from '~/common/api.server';
import routes from '~/common/routes';
import { UserLoginModel, UserModel } from '~/models/user.model';
import { getSession } from '~/sessions.server';

export class AuthService {
  // Me
  async me(request: Request): Promise<UserModel> {
    const session = await getSession(request.headers.get('Cookie'));
    if (!session.has('token')) {
      redirect(routes.api.loginDev);
    }
    const response = await api<UserModel>('/user/me', request);
    const userData = UserModel.validate(response);
    return userData;
  }

  // Log in
  async logIn(values: any): Promise<{ token: string }> {
    const payload = new UserLoginModel(values).validate();
    const response = await api<any>('/login', {
      body: payload.toJson() as any,
      method: 'POST'
    });
    return response;
  }
}
