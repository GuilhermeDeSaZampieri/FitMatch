import { createTypeRepository, getTypesActivityRepository } from "../repository/activityTypeRepository"; 

export async function createActivityTypeService(data: any[]){
    try{

        return await createTypeRepository(data);
        
    }catch(error: any){
        console.log(error);
    }
}


export async function getTypesActivityService(){
        return await getTypesActivityRepository();
}