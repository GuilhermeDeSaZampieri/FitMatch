import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import imgLogin from "../../assets/images/imgLogin.png";
import logo from "../../assets/images/Logo.png";
import { Password } from "@/components/ourCreation/inputPassword";
import { Email } from "@/components/ourCreation/inputEmail";
import { Link, useNavigate } from "react-router";
import { api, getHeaders } from "@/services/apiService";
import { AuthResponse } from "@/models/User";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string({ message: "Este campo é obrigatório!" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ message: "Este campo é obrigatório!" })
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

function Login() {
  const [getError, setGetError] = useState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    api
      .post<AuthResponse>("/auth/sign-in", JSON.stringify(data), getHeaders())
      .then((response) => {
        login(response.data);
        console.log(response);
        navigate("/");
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
        <div className="w-[20rem] h-[32rem] grid ">
          <img src={logo} alt="Logo" className="mb-5.5" />
          <Form {...form}>
            <h1 className="font-heading text-[2rem] text-[#171717] leading-[2.25rem] -mb-2">
              BEM-VINDO DE VOLTA!
            </h1>
            <p className="font-normal text-base mb-2">
              Encontre parceiros para treinar ao ar livre. Conecte-se e comece
              agora! 💪
            </p>
            <form
              className="grid  gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
                    <Password field={field} />

                    {fieldState.error && <FormMessage />}
                    {getError && (
                      <FormDescription className="text-red-600">
                        {getError}
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              ></FormField>

              <div className="mt-4">
                <Button type="submit" className="w-full h-12 bg-emerald-500 ">
                  Entrar
                </Button>
              </div>
              <p className="font-normal text-[0.88rem] flex justify-center mt-4">
                Ainda não tem uma conta?
                <Link to="/Cadastro" className="font-bold ml-1 ">
                  Cadastre-se
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export { Login };
