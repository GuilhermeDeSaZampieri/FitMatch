import { createActivityAddressesRepository } from "../repository/ActivityAddressesRepository";


export async function createActivityAddressesService(data: any){
    return await createActivityAddressesRepository(data);
}