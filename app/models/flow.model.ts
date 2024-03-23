import { NodeModel } from "./node.model";

export class EdgeModel {
    id: string;
    source: string;
    target: string;

    constructor(data: any) {
        this.id = data?.id || '';
        this.source = data?.source || '';
        this.target = data?.target || '';
    }

    static validate(data: any): EdgeModel {
        return new EdgeModel(data);
    }

    toJson() {
        return {
            id: this.id,
            source: this.source,
            target: this.target,
        };
    }
}

export class FlowModel {
    nodes: NodeModel[] = [];
    edges: EdgeModel[] = [];

    constructor(data: any) {
        this.nodes = data.nodes?.map((item: any) => new NodeModel(item)) || [];
        this.edges = data.edges?.map((item: any) => new EdgeModel(item)) || [];
    }
}