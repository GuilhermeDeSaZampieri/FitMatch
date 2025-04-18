import { NavBar } from "@/components/ourCreation/navBar";
import arrowBack from "../../assets/images/arroLeft.png";
import { Link } from "react-router";
import indianGuy from "../../assets/images/Ellipse.png";
import cam from "../../assets/images/imgCam.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Email } from "@/components/ourCreation/inputEmail";
import { Password } from "@/components/ourCreation/inputPassword";
import { Button } from "@/components/ui/button";
import { AlertButton } from "@/components/ourCreation/alertButton";
import { api, getAuthorization } from "@/services/apiService";
import { useEffect } from "react";
import { formSchema } from "@/zod/userZod";

function EditarPerfil() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const getUser = () => {
    api
      .get(`/user`, getAuthorization())
      .then((response) => {
        const user = response.data;
        form.setValue("name", user.name);
        form.setValue("cpf", user.cpf);
        form.setValue("email", user.email);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = (data: any) => {
    api
      .put(`/user/update`, data, getAuthorization())
      .then((response) => {
        console.log("Usuário atualizado com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao atualizar usuário:", error);
      });
  };

  return (
    <>
      <main className=" px-[110px] pt-6 grid gap-14 justify-items-center">
        <NavBar />
        <div className="w-full flex justify-center pb-6">
          <div className="grid  gap-10 w-[26%]">
            <Link to="/Perfil">
              <div className="flex gap-2 ">
                <Button variant="link">
                  <img src={arrowBack} />
                  <h1 className="font-bold text-[1rem] leading-6">
                    Voltar para o perfil
                  </h1>
                </Button>
              </div>
            </Link>
            <div className="grid place-items-center gap-10">
              <div className="w-[60%] flex relative">
                <img src={indianGuy} className="w-full" />

                <img
                  src={cam}
                  className="absolute bottom-0 right-0 w-12 h-12"
                />
              </div>
              <div className="w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid  gap-4 font-normal leading-6 text-[16px] text-[#404040]">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              Nome Completo{<p className="text-[#E7000b]">*</p>}
                            </FormLabel>
                            <FormControl className="w-full">
                              <Input placeholder="Ex.: João Silva" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              CPF{<p className="text-[#E7000b]">*</p>}
                            </FormLabel>
                            <FormControl className="w-full">
                              <Input
                                disabled
                                className="bg-[#E5E5E5] border-[1px]"
                                placeholder="Ex.: 123.456.789-01"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Email field={field} />
                          </FormItem>
                        )}
                      ></FormField>

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Password field={field} />
                          </FormItem>
                        )}
                      ></FormField>

                      <FormLabel>
                        Preferências{<p className="text-[#E7000b]">*</p>}
                        <div></div>
                      </FormLabel>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        <Button
                          className="w-full h-12 bg-emerald-500 "
                          type="submit"
                        >
                          Editar
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className=" text-[#404040] bg-[#FAFAFA] font-normal h-12 w-full"
                          onClick={getUser}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <AlertButton />
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export { EditarPerfil };
