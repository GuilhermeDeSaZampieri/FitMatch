import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { preferenceRepository, getUserPreferencesRepository } from "../repository/preferencesRepository";
import preferencesActivity from "../types/preferencesData";

export async function preferenceService(data: preferencesActivity) {
    try {
        const result = await preferenceRepository(data);

        if(result.length > 0 || (Array.isArray(result) && result.length === 0)){
            return { message: "Preferências atualizadas com sucesso"};
        } else{
            return result;
        }
        
    } catch (error) {
        if(PrismaClientValidationError){
            return {message: "Um ou mais IDs informados são inválidos"}
        } else{
        return {message: "Erro inesperado"}
        }
    }   
 
}

export async function getUserPreferencesService() {
    return await getUserPreferencesRepository();
}
