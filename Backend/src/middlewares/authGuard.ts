import { Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!; 

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

    const token = authHeader.replace("Bearer ", "");

    try{
        
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

    