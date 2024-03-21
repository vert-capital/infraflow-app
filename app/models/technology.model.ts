export enum TechnologyType {
    kafka = 'kafka',
    postgres = 'postgres',
    redis = 'redis',
    go = 'go',
    phyton = 'phyton',
    vue = 'vue',
    react = 'react'
}

export class TechnologyModel {
    id: string;
    name: string;
    type: TechnologyType;
    description: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.description = data.description;
    }

    static validate(data: any): TechnologyModel {
        return new TechnologyModel(data);
    }

    toNodeJson(data: { position: { x: number, y: number }, parentNode: string }) {
        return {
            id: this.id,
            type: 'input',
            position: data.position,
            data: { label: this.name },
            parentNode: data.parentNode,
        };
    }
}