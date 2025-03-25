import { createActivity, createType } from "../repository/activityRepository";

export async function activityCreate( 
    data: {
        title: string,
        description: string,
        typeId: string,
        userId: string,
        address: {},
        confirmationCode: string,
    
        image: string,
        scheduledDate: string, 
        createdAt: string,
        private: boolean,

        deletedAt: string | null,
        completedAt: string | null,
}){

    return createActivity(data);
}

export async function TypeCreate( data: any){

    return createType(data);
}

