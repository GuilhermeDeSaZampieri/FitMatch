import { Response,Request,NextFunction } from "express";
import { ZodSchema } from "zod";

export  default function validateRequestBody(scheme: ZodSchema){
    return function requestBodyValidation 
    (
        req: Request, 
        resp:Response, 
        next: NextFunction){
        try{
            scheme.parse(req.body);
            next();
        }catch(error: any){
            resp.status(400).json({error:"Informe os campos obrigatórios corretamente."});
        }

}
}

