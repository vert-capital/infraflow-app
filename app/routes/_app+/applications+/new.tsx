import { json, redirect, useActionData, useNavigation, useSubmit } from '@remix-run/react';
import { formDataValues, handleError } from '@vert-capital/common';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Icons, Input, sonner } from '@vert-capital/design-system-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ApplicationRegisterModel } from '~/models/application.model';
import { ApplicationService } from '~/services/application.service';

export default function NewApplication() {
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();

  const form = useForm<ApplicationRegisterModel>({
    defaultValues: {
      name: '',
      description: ''
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
    
    if (actionData?.data) {
      sonner.toast.success('Cadastro realizado com sucesso', {
        description: 'Aplicação cadastrada com sucesso',
        closeButton: true,
      });
      redirect('/applications');
    }
  }, [actionData]);

  const onSubmit = async (values: z.infer<any>) => {
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome"
                    type="name"
                    autoComplete="off"
                    autoCorrect="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          >
          </FormField>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descrição"
                    type="description"
                    autoComplete="off"
                    autoCorrect="off"
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

export async function action({ request }: { request: Request }) {
  const { ...values } = await formDataValues({ request });
  try {
    const service = new ApplicationService();
    const response = await service.add(values);
    return json({ error: '', lastSubmission: '', data: response });
  } catch (error) {
    return json({ error, lastSubmission: values, data: false });
  }
}
