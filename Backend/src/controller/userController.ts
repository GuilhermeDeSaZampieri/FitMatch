import { Express, Router, Request, Response, response } from "express";
import authGuard from "../middlewares/authGuard";
import { deleteUserService, getUsersByid , updateUserService} from "../services/userServices";
import userUpdateValidation from "../validations/userUpdateValidation";
import validateRequestBody from "../middlewares/authValidation";
import { getUserPreferencesService, preferenceService } from "../services/preferenceService";


const userController = (server: Express) => {
    const router = Router();

    router.use(authGuard);

    router.get("", async (req: Request, res: Response) =>{
        try{
            const {userId}=req; 
            const savedUser = await getUsersByid(userId);
            const {password, deleteAt, ...user} = savedUser;
            res.status(200).json(user);
        
        }catch(error: any)
        {
            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."});
                return;
            }
            res.status(500).json({error:"Erro inesperado."});
        }
              
    });

    router.get("/preferences", async (req ,res)=>{
        try{
            
            res.status(200).json(await getUserPreferencesService());
        
        }catch(error: any)
        {
            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."});
                return;
            }
            res.status(500).json({error:"Erro inesperado."});
        }
    });

    router.post("/preferences/define", async (req ,res)=>{
        try{
                    const data = {
                        userId: req.userId,
                        
                        typeId: req.body
                    }        
        
                    const create = await preferenceService(data);
                    res.status(200).send(create);       
        
                }catch(error: any){
                    console.log(error);
                    (error.code) ? res.status(500).json({error:`error:${error.code}`}) : res.status(403).json({error:error.messsage});        
                }
    });

    

    router.put("/avatar", async (req ,res)=>{
        
    });

    router.put("/update", validateRequestBody(userUpdateValidation), async (req ,res)=>{
        try{
            const {userId}=req; 
            const data = req.body;
            const updatedUser = await updateUserService(data, userId);
            const {password, deleteAt, ...user} = updatedUser;
            res.status(200).json(user);
        
        }catch(error: any)
        {
            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."});
                return;
            }

            if(error.message === "O e-mail já pertence a outro usuário"){
                res.status(409).json({error: "O e-mail já pertence a outro usuário."});
                return;
            }
    
            res.status(500).json({error:"Erro inesperado."});
        }
    });

    router.delete("/deactivate", async (req ,res)=>{
        try{
            const {userId}=req; 
            await deleteUserService(userId);
            res.status(200).json({message:"Conta desativada com sucessso"});
        
        }catch(error: any)
        {
            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."});
                return;
            }
    
            res.status(500).json({error:"Erro inesperado."});
        }
    });

    server.use("/user", router);
}
export default userController;