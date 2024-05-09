import api from "~/common/api.server";
import { EdgeModel } from "~/models/edge.model";
import { NodeModel } from "~/models/node.model";

export class ManagerService {
  async getNodes(request: Request): Promise<NodeModel[]> {
    const response = await api<any>(
      `/nodes/`,
      request,
      "http://localhost:3001"
    );

    return response.map((item: any) => new NodeModel(item));
  }

  async getEdges(request: Request): Promise<EdgeModel[]> {
    const response = await api<any>(
      `/edges/`,
      request,
      "http://localhost:3001"
    );

    return response.map((item: any) => new EdgeModel(item));
  }
}
