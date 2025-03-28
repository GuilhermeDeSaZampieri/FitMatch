import { Express, Router } from "express";
import { createUserService } from "../services/authServices";
import { login } from "../services/authServices";
import authValidation from "../validations/userValidation";

import validateRequestBody from "../middlewares/authValidation";
import loginValidation from "../validations/loginValidation";


const authController = (server: Express) => {
    const router = Router();
    
    router.post("/register", validateRequestBody(authValidation), async (req, res) =>{

        try{
            
            const userData = req.body;
        
            await createUserService(userData);
            res.status(201).json({message: "Usuário criado com sucesso."});

        }catch(error: any)
        {
            if(error.message === "Cpf já existente" || error.message === "E-mail já existente"){
                res.status(409).json({error: "O e-mail ou CPF informado já pertence a outro usuário"});
                return;
            }
            res.status(500).json({error:"Erro inesperado"});
        }
        
       
    });

    router.post("/sign-in", validateRequestBody(loginValidation), async (req, res) =>{

        try{
        const { email,password} = req.body;

        const user = await login(email, password);
        
        res.status(200).json(user);
        }catch(error: any){
            if(error.message === "Usuário não encontrado."){
                res.status(404).json({error: "Usuário não encontrado."});
                return;
            }

            if(error.message === "Senha incorreta"){
                res.status(401).json({error: "Senha incorreta."});
                return;
            }

            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."});
                return;
            }


            res.status(500).json({error:"Erro inesperado."});
        }
    });


    server.use("/auth", router);
}

export default authController;