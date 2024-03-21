import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData, useNavigation, useSubmit } from '@remix-run/react';
import { formDataValues, handleError } from '@vert-capital/common';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Icons, Input, SelectAdvanced, sonner } from '@vert-capital/design-system-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterNodeModel, TypesNode, getTypesNodesOptions } from "~/models/node.model";
import { NodeService } from '~/services/node.service';

export default function FormFlow() {
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();

  const typesNodeOptions = getTypesNodesOptions();

  const form = useForm<RegisterNodeModel>({
    resolver: zodResolver(RegisterNodeModel.schema),
    defaultValues: {
      type: TypesNode.Input,
      position: { x: 0, y: 0 },
      parentNode: '',
      label: ''
    }
  })

  useEffect(() => {
    if (actionData?.error) {
      sonner.toast.error('Erro ao realizar cadastro', {
        description: handleError(actionData.error).message,
        closeButton: true,
      });
      if (actionData.lastSubmission) {
        Object.entries(actionData.lastSubmission).forEach(
          ([key, value]: any) => {
            form.setValue(key, value);
          },
        );
      }
    }
  }, [actionData]);

  const onSubmit = async (values: z.infer<typeof RegisterNodeModel.schema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]: any) => {
      formData.append(key, value);
    });
    submit(formData, { method: 'post', replace: true });
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="label">Nome do nó</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do nó"
                      type="label"
                      autoComplete="off"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
                )}
            >
            </FormField>
          </div>
          {/* Crie um formulário que gere um flow principal do type group, esse nó pode receber vários sub flows, onde você pode escolher se é do tipo input, output ou ambos (sem type), inserir um nome e dizer a qual sub flow já cadastrado ele se relaciona */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Tipo do nó</FormLabel>
                  <FormControl>
                  <SelectAdvanced
                    placeholder="Selecione o tipo do nó"
                    selected={field.value as any}
                    onChangeValue={(value) => form.setValue('type', value as any)}
                    options={typesNodeOptions}
                    {...field}
                  />
                  </FormControl>
                </FormItem>
              )}
            >
            </FormField>
    
          <Button
            type="submit"
            className="w-full"
            disabled={transition.state === 'submitting'}
          >
            {transition.state === 'submitting' && (
              <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {transition.state === 'submitting' ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { ...values } = await formDataValues({ request });
  try {
    const service = new NodeService();
    await service.add(values);

    console.log('values', values);
  } catch (error) {
    return json({ error, lastSubmission: values });
  }
}
