import z from "zod";

const userUpdateValidation = z.object({
    name: z.string(),
    email: z.string().email().min(6),
    password: z.string().min(6),
})

export default userUpdateValidation;