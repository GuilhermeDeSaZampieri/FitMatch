import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import mapImage from "../../../assets/images/map.png";
import { CirclePlus, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string(),
  date: z.string().min(1, "Data obrigatória"), // datetime-local

  type: z.string().min(1, "Tipo obrigatório"), // tipo da atividade
  descricao: z.string(),
  location: z.string().min(1, "Local obrigatório"),
  bool: z.boolean(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Imagem obrigatória"),
});

const onSubmit = (data: any) => {
  return data;
};

function ModalEditActivity() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bool: false, // "Não" selecionado por padrão
    },
  });
  return (
    <div className=" py-40 flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-emerald-500">
            <CirclePlus />
            Editar atividade
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[784px] h-[770px] ">
          <AlertDialogTitle className="text-[#171717] font-heading text-[2rem] font-normal leading-9">
            EDITAR ATIVIDADE
          </AlertDialogTitle>

          <Form {...form}>
            <form
              className="grid justify-center-end pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex gap-x-12">
                <div className="space-y-4 flex-1">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel className="font-semibold text-[16px] leading-5 text-[#404040]">
                          Imagem<span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative w-full h-32 border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition">
                            <Image className="w-6 h-5 text-[#D4D4D4]" />
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-[16px] leading-5 text-[#404040]">
                          Título<span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input className="h-14" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-[16px] leading-5 text-[#404040]">
                          Descrição<span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea className="h-27.5" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-[16px] leading-5 text-[#404040]">
                          Data<span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <div className="space-y-4 flex flex-col justify-between flex-1">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tipo<span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="overflow-auto max-w-80 flex gap-x-2">
                            <div>
                              <div className="w-20 h-20 border rounded-full"></div>
                              <span {...field}>Corrida</span>
                            </div>

                            <div>
                              <div className="w-20 h-20 border rounded-full"></div>
                              <span>Corrida</span>
                            </div>
                            <div>
                              <div className="w-20 h-20 border rounded-full"></div>
                              <span>Corrida</span>
                            </div>
                            <div>
                              <div className="w-20 h-20 border rounded-full"></div>
                              <span>Corrida</span>
                            </div>
                            <div>
                              <div className="w-20 h-20 border rounded-full"></div>
                              <span>Corrida</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-[16px] leading-5 text-[#404040]">
                          Local<span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <img src={mapImage} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="bool"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-[16px] leading-5 text-[#404040]">
                          Requer aprovação para participar
                          <span className="text-[#E7000b]">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2 w-[164px] ">
                            <Button
                              type="button"
                              variant={
                                field.value === true ? "default" : "outline"
                              }
                              className={`h-[44px] w-1/2 ${
                                field.value === true
                                  ? "bg-[#404040] text-white"
                                  : "bg-white text-gray-800"
                              }`}
                              onClick={() => field.onChange(true)}
                            >
                              Sim
                            </Button>
                            <Button
                              type="button"
                              variant={
                                field.value === false ? "default" : "outline"
                              }
                              className={`h-[44px] w-1/2 ${
                                field.value === false
                                  ? "bg-[#404040] text-white"
                                  : "bg-white text-gray-800"
                              }`}
                              onClick={() => field.onChange(false)}
                            >
                              Não
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
              <div className="mt-4 h-12 flex justify-end gap-x-2">
                <AlertDialogCancel className="w-56 h-full rounded-[2px]  bg-[#fff]  text-[#E7000B] border-[#E7000B] font-bold text-[16px] leading-6">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction className="w-56 h-full rounded-[2px] bg-emerald-500 font-bold text-[16px] leading-6 ">
                  Confirmar
                </AlertDialogAction>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { ModalEditActivity };
