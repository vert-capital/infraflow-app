import api from '~/common/api.server';
import { ApplicationModel, ApplicationRegisterModel, ApplicationTableModel } from '~/models/application.model';
import { TableResponseModel } from '~/models/table.model';

export class ApplicationService {  
    async list(request: Request): Promise<TableResponseModel<ApplicationTableModel>> {
    const response = await api<any>(
      `/application/`,
      request
    );

    return new TableResponseModel<ApplicationTableModel>(
      ApplicationTableModel,
      response
    );
  }

  async detail({
    id,
    request,
  }: {
    id: string;
    request: Request;
  }): Promise<ApplicationModel> {
    const response = await api<ApplicationModel>(
      `/application/${id}`,
      request
    );
    return new ApplicationModel(response);
  }

  async add(values: any): Promise<ApplicationModel> {
    const payload = new ApplicationRegisterModel(values);
    const response = await api<ApplicationModel>('/application', {
      body: payload.toJson() as any,
      method: 'POST',
    });
    return new ApplicationModel(response);
  }
}
