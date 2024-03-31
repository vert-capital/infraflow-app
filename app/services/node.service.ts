import api from "~/common/api.server";
import { NodeModel } from "~/models/node.model";

export class NodeService {
  async list(request: Request): Promise<NodeModel[]> {
    const response = await api<any>(`/node/`, request);

    return response.map((item: any) => new NodeModel(item));
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

  add(data: any) {
    return data;
  }
}
