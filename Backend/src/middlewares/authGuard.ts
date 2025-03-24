import { error } from "console";
import { Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!; //LEmbra do PONTO!!!

declare module "express-serve-static-core"{ 
    interface Request{
        userId: string,
    }
}

export default function autoGuard(
        req: Request, 
        resp: Response, 
        next: NextFunction)
    {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        resp.status(401).json({error:"Você precisa estar autorizado para acesar este endpoint."});
        return;
    }

    const token = authHeader.replace("Bearer ", "");//precisa do espaço

    try{
        //Agora o user possui a propriedade de todos os campos do token do usuario
        const user = jwt.verify(token, jwtSecret) as {
            id: string;
            name: string;
            email: string;
            cpf: string;
            password: string;
            iat: number;
            exp: number;
        };

        req.userId = user.id;
        next();
    }catch(error: any){
        resp.status(401).json({error:"token invalido ou expirado"});
        return;
    }

    
}

    