import api from "~/common/api.server";
import {
  NodeModel,
  NodeTableModel,
  RegisterNodeModel,
} from "~/models/node.model";
import { TableResponseModel } from "~/models/table.model";

export class NodeService {
  async all(request: Request): Promise<NodeModel[]> {
    const response = await api<any>(`/node/`, request);

    return response.map((item: any) => new NodeModel(item));
  }

  async list(request: Request): Promise<TableResponseModel<NodeTableModel>> {
    const response = await api<any>(`/node/`, request);
    return new TableResponseModel<NodeTableModel>(NodeTableModel, response);
  }

  async detail({
    id,
    request,
  }: {
    id: string;
    request: Request;
  }): Promise<NodeModel> {
    const response = await api<NodeModel>(`/node/${id}`, request);
    return new NodeModel(response);
  }

  async add(values: any): Promise<NodeModel> {
    const payload = new RegisterNodeModel(values);
    const response = await api<NodeModel>("/node", {
      body: payload as any,
      method: "POST",
    });
    return new NodeModel(response);
  }
}
