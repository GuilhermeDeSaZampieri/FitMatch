import { getByEmail, getUserByid, updateUserRepository, softDeleteUser, getActivityCreateByUserRepository, getAllActivityCreateByUserRepository, updateUserAvatar } from "../repository/userRepository";
import bcrypt from "bcryptjs";


export async function getUsersByid(id: string){
    const userFind  = await getUserByid(id);
    
    if(!userFind){
        throw new Error("Usuário não encontrado");
    }

    if(userFind.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }

    return userFind;
}


export async function updateUserService(data: any, id: string){
    
    const encryptedPassword = await bcrypt.hash(data.password, 10); 
    data.password = encryptedPassword;

    await verifyIfUserEmailExists(data.email);

    const userFind  = await updateUserRepository(data, id);

    if(!userFind){
        throw new Error("Usuário não encontrado");
    }

    if(userFind.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }

    return userFind;
}


export async function updateUserAvatarService(avatar:string, id: string, newAvatar: string){
            

        if (!avatar) {
            throw new Error("nenhum arquivo foi enviado");
        } 
        if (avatar != "image/png" && avatar != "image/jpeg") {
            throw new Error("Tipo de arquivo inválido. Apenas JPEG e PNG são permitidos.");
        }
    
        return await updateUserAvatar(newAvatar, id);

}


export async function deleteUserService(id: string){
    
    const userFind = await softDeleteUser(id);

    if(!userFind){
        throw new Error("Usuário não encontrado");
    }

    if(userFind.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }
}

async function verifyIfUserEmailExists(email: string){
    const user = await getByEmail(email);

    if(user){
        throw new Error("O e-mail já pertence a outro usuário");
        
    }
}

export async function getActivityCreateByUserService(page: number,pageSize: number,id:string){
    const all  =  await getActivityCreateByUserRepository(page,pageSize,id);
 
    return all;
}

export async function getAllActivityCreateByUserService(id:string) {
    return await getAllActivityCreateByUserRepository(id);

}




