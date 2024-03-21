import api from '~/common/api.server';
import { ApplicationModel, ApplicationTableModel } from '~/models/application.model';
import { TableResponseModel } from '~/models/table.model';

export class ApplicationService {  
    async list(request: Request): Promise<TableResponseModel<ApplicationTableModel>> {
    const url = new URL(request.url);

    const response = await api<any>(
      `/application/?${url.searchParams.toString()}`,
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

  add(data: any) {
    console.log('add', data);

    return data;
  }
}
