import { NodeModel } from "./node.model";

export class ApplicationModel {
    id: string;
    name: string;
    description: string;
    nodes: NodeModel[] = [];
    edges: any[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.nodes = data.nodes?.map((item: any) => new NodeModel(item)) || [];
        this.edges = data?.edges || [];
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

    toJson() {
        return {
            name: this.name,
            description: this.description,
        };
    }
}

export class ApplicationTableModel {
    id: string;
    name: string;
    description: string;
    hasNode: 'Sim' | 'Não';

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data?.description || '';
        this.hasNode = data?.nodes?.length ? 'Sim' : 'Não';
    }
}