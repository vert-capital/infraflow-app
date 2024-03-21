export class AplicationModel {
    id: string;
    name: string;
    description: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }

    static validate(data: any): AplicationModel {
        return new AplicationModel(data);
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