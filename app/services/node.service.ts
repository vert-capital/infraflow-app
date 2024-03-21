import api from '~/common/api.server';
import { NodeModel } from '~/models/node.model';

export class NodeService {

  async list(): Promise<NodeModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = [
        {
          id: 'A',
          type: 'group',
          position: { x: 0, y: 0 },
          style: {
            width: 170,
            height: 140,
          },
        },
        {
          id: 'A-1',
          type: 'input',
          data: { label: 'Child Node 1' },
          position: { x: 10, y: 10 },
          parentNode: 'A',
          extent: 'parent',
        },
        {
          id: 'A-2',
          data: { label: 'Child Node 2' },
          position: { x: 10, y: 90 },
          parentNode: 'A',
          extent: 'parent',
        },
        {
          id: 'B',
          type: 'output',
          position: { x: -100, y: 200 },
          data: null,
          style: {
            width: 170,
            height: 140,
            backgroundColor: 'rgba(240,240,240,0.25)',
          },
        },
        {
          id: 'B-1',
          data: { label: 'Child 1' },
          position: { x: 50, y: 10 },
          parentNode: 'B',
          extent: 'parent',
          draggable: false,
          style: {
            width: 60,
          },
        },
        {
          id: 'B-2',
          data: { label: 'Child 2' },
          position: { x: 10, y: 90 },
          parentNode: 'B',
          extent: 'parent',
          draggable: false,
          style: {
            width: 60,
          },
        },
        {
          id: 'B-3',
          data: { label: 'Child 3' },
          position: { x: 100, y: 90 },
          parentNode: 'B',
          extent: 'parent',
          draggable: false,
          style: {
            width: 60,
          },
        },
        {
          id: 'C',
          type: 'output',
          position: { x: 100, y: 200 },
          data: { label: 'Node C' },
        },
      ];  
    return response.map((item) => new NodeModel(item));
  }

  async detail({
    id,
    request,
  }: {
    id: string;
    request: Request;
  }): Promise<NodeModel> {
    const response = await api<NodeModel>(
      `/node/${id}`,
      request
    );
    return new NodeModel(response);
  }

  add(data: any) {
    console.log('add', data);

    return data;
  }
}
