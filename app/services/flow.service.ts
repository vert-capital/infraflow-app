import { FlowModel } from "~/models/flow.model";

export class FlowService {

    async all(request: Request): Promise<FlowModel> {
/*         const response = await api<any>(
            `/flow/`,
            request
        ); */

        const response = {
            nodes:  [
                {
                  id: 'A',
                  type: 'group',
                  data: { label: null },
                  position: { x: 0, y: 0 },
                  style: {
                    width: 170,
                    height: 140,
                  },
                },
                {
                  id: 'B',
                  type: 'input',
                  data: { label: 'FrontEnd' },
                  position: { x: 10, y: 10 },
                  parentNode: 'A',
                  extent: 'parent',
                },
                {
                  id: 'C',
                  data: { label: 'BackEnd' },
                  position: { x: 10, y: 90 },
                  parentNode: 'A',
                  extent: 'parent',
                },
              ],
            edges: [{ id: 'b-c', source: 'B', target: 'C' }]
        }
        return new FlowModel(response);
    }
}