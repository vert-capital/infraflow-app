import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { formDataValues, handleError } from "@vert-capital/common";
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Icons,
  Input,
  SelectAdvanced,
  SelectItemOptions,
  Separator,
  sonner,
} from "@vert-capital/design-system-ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  NodeModel,
  RegisterNodeModel,
  getTypesNodesOptions,
} from "~/models/node.model";
import { ApplicationService } from "~/services/application.service";
import { NodeService } from "~/services/node.service";

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new ApplicationService();
  const applications = await service.all(request);

  return applications.map((application) => ({
    value: application.id,
    label: application.name,
  }));
}

export default function NewNode() {
  const navigate = useNavigate();
  const transition = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();

  const typeNodesOptions = getTypesNodesOptions();

  const goBack = () => navigate(-1);

  const onSubmit = async (values: z.infer<any>) => {
    const formData = new RegisterNodeModel(values);
    submit(formData, { method: "post", replace: true });
  };

  useEffect(() => {
    if (actionData?.error && actionData.error !== "") {
      sonner.toast.error("Erro ao realizar cadastro", {
        description: handleError(actionData.error).message,
        closeButton: true,
      });
      if (actionData.lastSubmission) {
        Object.entries(actionData.lastSubmission).forEach(
          ([key, value]: any) => {
            form.setValue(key, value);
          }
        );
      }
    }
    if (actionData?.data) {
      sonner.toast.success("Cadastro realizado com sucesso", {
        description: "Aplicação cadastrada com sucesso",
        closeButton: true,
      });
      redirect("/applications");
    }
  }, [actionData]);

  const form = useForm<NodeModel>({
    defaultValues: {
      type: "",
      label: "",
      application_id: "",
      position: { x: 0, y: 0 },
      parentNode: "",
    },
  });

  const applicationsOptions: SelectItemOptions[] = useLoaderData();

  return (
    <div className="w-full flex flex-col justify-end items-center space-y-6 my-10">
      <div className="w-full flex flex-col justify-center items-center pt-3 pb-5 space-y-2">
        <div className="w-full flex justify-start items-center space-x-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={goBack}
            className="h-8 w-8"
          >
            <Icons.ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="w-full flex justify-start items-center ml-20">
            <h1 className="text-3xl font-bold">Cadastro de nó</h1>
          </div>
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="w-full h-auto bg-transparent flex flex-col justify-start items-start">
        <Card className="w-full">
          <CardContent className="space-y-4 flex flex-col justify-start items-start">
            <Form {...form}>
              <form
                className="space-y-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex space-x-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="label">Label</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Label"
                              type="text"
                              autoComplete="off"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>

                  <div className="w-full">
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
                              onChangeValue={(value) =>
                                form.setValue("type", value as any)
                              }
                              options={typeNodesOptions}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="application_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="application_id">
                            Aplicação
                          </FormLabel>
                          <FormControl>
                            <SelectAdvanced
                              placeholder="Selecione a aplicação pai"
                              selected={field.value as any}
                              onChangeValue={(value) =>
                                form.setValue("type", value as any)
                              }
                              key={field.name}
                              options={applicationsOptions}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="label">ID nó pai</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Id do nó pai"
                              type="text"
                              autoComplete="off"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>

                  <div className="w-full ">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="label">Posição (X)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Id do nó pai"
                              type="text"
                              autoComplete="off"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>

                  <div className="w-full ">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="label">Posição (Y)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Id do nó pai"
                              type="text"
                              autoComplete="off"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={transition.state === "submitting"}
                >
                  {transition.state === "submitting" && (
                    <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {transition.state === "submitting" ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
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
