import { EdgeModel } from "./edge.model";
import { NodeModel } from "./node.model";

export class FlowModel {
  nodes: NodeModel[] = [];
  edges: EdgeModel[] = [];

  constructor(data: any) {
    this.nodes = data.nodes?.map((item: any) => new NodeModel(item)) || [];
    this.edges = data.edges?.map((item: any) => new EdgeModel(item)) || [];
  }
}
