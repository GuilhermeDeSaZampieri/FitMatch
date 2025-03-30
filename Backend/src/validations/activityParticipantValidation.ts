import z from "zod";

const activityParticipantValidation = z.object({

    participantId: z.string(),
    approved: z.boolean(),
    
})

export default activityParticipantValidation;