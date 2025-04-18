import { z } from "zod";

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

export {formSchema};