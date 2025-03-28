import z from "zod";

const activityValidation = z.object({
    title: z.string(),
    description: z.string().min(6),
    typeId: z.string(),
    address: z.object({latitude: z.number(), longitude: z.number()}),
    image: z.string(),
    scheduledDate: z.string().datetime(),//2020-01-01T00:00:00.123Z
    private: z.boolean(),
    
})

export default activityValidation;