import { createActivityAddressesRepository, updateActivityAdress } from "../repository/ActivityAddressesRepository";
import activityAddress from "../types/activityAddress";


export async function createActivityAddressesService(data: any){
    return await createActivityAddressesRepository(data);
}

export async function updateActivityAdressService(data: activityAddress){
    return await updateActivityAdress(data);
}