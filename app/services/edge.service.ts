import api from "~/common/api.server";
import {
  EdgeModel,
  EdgeTableModel,
  RegisterEdgeModel,
} from "~/models/edge.model";
import { TableResponseModel } from "~/models/table.model";

export class EdgeService {
  async all(request: Request): Promise<EdgeModel[]> {
    const response = await api<any>(`/edge/`, request);

    return response.map((item: any) => new EdgeModel(item));
  }

  async list(request: Request): Promise<TableResponseModel<EdgeTableModel>> {
    const response = await api<any>(`/edge/`, request);
    return new TableResponseModel<EdgeTableModel>(EdgeTableModel, response);
  }

  async detail({
    id,
    request,
  }: {
    id: string;
    request: Request;
  }): Promise<EdgeModel> {
    const response = await api<EdgeModel>(`/edge/${id}`, request);
    return new EdgeModel(response);
  }

  async add(values: any): Promise<EdgeModel> {
    const payload = new RegisterEdgeModel(values);
    const response = await api<EdgeModel>("/edge", {
      body: payload as any,
      method: "POST",
    });
    return new EdgeModel(response);
  }
}
