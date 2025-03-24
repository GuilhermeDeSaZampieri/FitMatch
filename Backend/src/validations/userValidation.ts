import z from "zod";

const userValidation = z.object({
    name: z.string(),
    email: z.string().email().min(6),
    cpf: z.string().min(11).max(11),
    password: z.string().min(6)
})

export default userValidation;