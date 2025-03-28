import { createActivityRepository, getActivityRepository, getActivityAllRepository } from "../repository/activityRepository";
import activityData from "../types/activityData";
import { createActivityAddressesService } from "./ActivityAddressesService";
import { getUsersByid } from "./userServices";

export async function createActivityService(data: activityData, userId: string){

    const Code = creatorCode();
    const activitiesSaved = await createActivityRepository( 
    {
        title: data.title,
        description: data.description,
        image: data.image,
        scheduledDate: data.scheduledDate,
        private: data.private,
        confirmationCode: Code,
        createdAt: new Date(),
        activityTypes: {
            connect: { id: data.typeId } 
        },
        creator:{
            connect: {id: userId}
        }
    });


    const addresses = await createActivityAddressesService({...data.address,activityId:activitiesSaved.id});
    const creator = await getUsersByid(userId);  
    
    return {
        id: activitiesSaved.id,
        title: activitiesSaved.title,
        description: activitiesSaved.description,
        type: activitiesSaved.typeId,
        image: activitiesSaved.image,
        addresses: {
            latitude: addresses.latitude,
            longitude: addresses.longitude,
        },
        scheduledDate: activitiesSaved.scheduledDate,
        createdAt: activitiesSaved.createdAt,
        completedAt: activitiesSaved.completedAt,
        private: activitiesSaved.private,
        creator: {
            id: creator.id,
            name: creator.name, 
            avatar: creator.avatar },
    };
}

export async function getActivityService(
    page: number,
    pageSize: number,
    typeId: string,
    orderBy: string,
    order: "asc" | "desc") 
{
    const all = await getActivityRepository(page, pageSize, typeId, orderBy, order);
    
    return all;
}

export async function getActivityAllService( 
    typeId: string,
    orderBy: string,
    order: "asc" | "desc"){

    const all = await getActivityAllRepository(typeId, orderBy, order);
    
    return all;
}


function creatorCode() {
    let c = ''
    do{
        c += Math.random().toString(36).substring(2);
    }while(c.length < 6);
    c = c.substring(0, 6);
    return c;
}

