import z from "zod";

const loginValidation = z.object({
    email: z.string().email().min(6),
    password: z.string().min(6)
})

export default loginValidation;