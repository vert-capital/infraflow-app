import { json, useActionData, useNavigate, useNavigation, useSubmit } from '@remix-run/react';
import { formDataValues, handleError } from '@vert-capital/common';
import { Button, Card, CardContent, Form, FormControl, FormField, FormItem, FormLabel, Icons, Input, Separator, sonner } from '@vert-capital/design-system-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ApplicationRegisterModel } from '~/models/application.model';
import { ApplicationService } from '~/services/application.service';

export default function NewApplication() {
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();
  const navigate = useNavigate();

  const redirect = (url: string) => navigate(url);
  const goBack = () => navigate(-1);

  const form = useForm<ApplicationRegisterModel>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  useEffect(() => {
    console.log(actionData)

    if (actionData?.error && actionData.error !== '') {
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
    <div className="w-full flex flex-col justify-end items-center space-y-6 my-10">
      <div className="w-full flex flex-col justify-center items-center pt-3 pb-5 space-y-2">
        <div className="w-full flex justify-start items-center space-x-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={goBack}
            className="h-8 w-8"
          >
            <Icons.ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="w-full flex justify-start items-center ml-20">
            <h1 className="text-3xl font-bold">Cadastro de aplicação</h1>
          </div>
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="w-full h-auto bg-transparent flex flex-col justify-start items-start">
        <Card className="w-full">
          <CardContent className="space-y-4 flex flex-col justify-start items-start">
            <Form {...form}>
              <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
          </CardContent>
        </Card>
      </div>
    </div>
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
