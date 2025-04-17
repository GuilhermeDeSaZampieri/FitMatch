import { NavBar } from "@/components/ourCreation/navBar";
import arrowBack from "../../assets/images/arroLeft.png";
import { Link } from "react-router";
import indianGuy from "../../assets/images/Ellipse.png";
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

const formSchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

function EditarPerfil() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
                  <h1 className="font-bold text-[1rem] leading-6">Voltar para o perfil</h1>
                </Button>
              </div>
            </Link>
            <div className="grid place-items-center gap-10">
              <div className="w-[60%]">
                <img src={indianGuy} className="w-full" />
              </div>
              <div className="w-full">
                <Form {...form}>
                  <form className="grid  gap-4">
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
                  </form>
                </Form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-4">
                  <div className="mt-4">
                    <Button className="w-full h-12 bg-emerald-500 ">
                      Editar
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className=" text-[#404040] bg-[#FAFAFA] font-normal h-12 w-full"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>

                <AlertButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export { EditarPerfil };
