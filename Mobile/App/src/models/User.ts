export interface User {
    id: string;
    name: string;
    email: string;
    cpf: string; 
    avatar: string;
    xp: number;
    level: number;
    achievements: [{name:string,criterion: string }];
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    cpf: string;
}


export interface AuthUser{
    email: string;
    password: string
}

export interface UserPreferences{
    typeId: string,
    typeName: string,
    typeDescription: string
}