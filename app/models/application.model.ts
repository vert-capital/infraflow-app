import { NodeModel } from "./node.model";

export class ApplicationModel {
    id: string;
    name: string;
    description: string;
    nodes: NodeModel[] = [];
    edgs: any[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.nodes = data.nodes?.map((item: any) => new NodeModel(item)) || [];
        this.edgs = data?.edgs || [];
    }

    static validate(data: any): ApplicationModel {
        return new ApplicationModel(data);
    }

    toNodeJson() {
        return {
            id: this.id,
            type: 'group',
            position: { x: 0, y: 0 },
            data: { label: this.name },
        };
    }
}

export class ApplicationRegisterModel {
    name: string;
    description: string;

    constructor(data: any) {
        this.name = data.name;
        this.description = data.description;
    }

    static validate(data: any): ApplicationRegisterModel {
        return new ApplicationRegisterModel(data);
    }
}