
import { ActionFunctionArgs, json } from '@remix-run/node';
import { formDataValues } from '@vert-capital/common';
import { NodeService } from '~/services/node.service';
import FormFlow from './form/form-flow';

export default function NewNode() {
  return (
    <div className="flex flex-row">
      <div className="basis-1/3">
        <div className="flex flex-row justify-between">
          <FormFlow />  
        </div>
      </div>
      <div className="basis-2/3">
 {/*        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={rfStyle}
          attributionPosition="top-right"
        >
          <Background />
      </ReactFlow> */}
      </div>
    </div>
  );
}


export async function action({ request }: ActionFunctionArgs) {
  const { ...values } = await formDataValues({ request });
  try {
    const service = new NodeService();
    await service.add(values);
  } catch (error) {
    return json({ error, lastSubmission: values });
  }
}

