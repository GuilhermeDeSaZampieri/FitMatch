import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import imgLogin from "../../assets/images/imgLogin.png";
import logo from "../../assets/images/Logo.png";
import { Password } from "@/components/ourCreation/inputPassword";
import { Email } from "@/components/ourCreation/inputEmail";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, getHeaders } from "@/services/apiService";
import { useState } from "react";

const formSchema = z.object({
  name: z.string({ message: "Este campo é obrigatório!" }),
  cpf: z.string({ message: "Este campo é obrigatório!" }).regex(/^\d{11}$/, {
    message: "O CPF deve conter apenas números e ter 11 dígitos",
  }),
  email: z
    .string({ message: "Este campo é obrigatório!" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ message: "Este campo é obrigatório!" })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

function Cadastro() {
  const [getError, setGetError] = useState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    api
      .post("/auth/register", JSON.stringify(data), getHeaders())
      .then((response) => {
        response.data;
        console.log(response);
        navigate("/Login");
      })
      .catch((error) => {
        setGetError(error.response.data.error);

        console.log(error);
      });
  };

  return (
    <main className="flex h-screen">
      <div className="w-1/2 flex items-center justify-start p-4 h-full">
        <img className="w-full h-full" src={imgLogin} alt="Img Login" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[20rem] h-[45.8rem] space-y-12">
          <img src={logo} alt="Logo" className="" />
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-[2rem] text-[#171717] leading-[2.25rem]">
                CRIE SUA CONTA!{" "}
              </h1>
              <p className="font-normal text-base">
                Cadastre-se para encontrar parceiros de treino e começar a se
                exercitar ao ar livre. Vamos juntos! 💪
              </p>
            </div>
            <Form {...form}>
              <form
                className="grid  gap-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid gap-6">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full grid gap-1.5">
                          <FormLabel>
                            Nome Completo{<p className="text-[#E7000b]">*</p>}
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Ex.: João Silva" {...field} />
                          </FormControl>
                          {fieldState.error && <FormMessage />}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full grid gap-1.5">
                          <FormLabel>
                            CPF{<p className="text-[#E7000b]">*</p>}
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input
                              placeholder="Ex.: 123.456.789-01"
                              {...field}
                            />
                          </FormControl>
                          {fieldState.error && <FormMessage />}
                          {getError && (
                            <FormDescription className="text-red-600">
                              {getError}
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full grid gap-1.5">
                          <Email field={field} />
                          {fieldState.error && <FormMessage />}
                          {getError && (
                            <FormDescription className="text-red-600">
                              {getError}
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    ></FormField>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full grid gap-1.5">
                          <Password field={field} />
                          {fieldState.error && <FormMessage />}
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <div className="">
                    <Button className="w-full h-12 bg-emerald-500 ">
                      Cadastrar
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="font-normal text-[0.88rem] flex justify-center">
                    Já tem uma conta?
                    <Link to="/Login" className="font-bold ml-1 ">
                      Faça login
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}

export { Cadastro };
