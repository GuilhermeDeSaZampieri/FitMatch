import { Express, Router, Request, Response, response } from "express";
import authGuard from "../middlewares/authGuard";
import { deleteUserService, getUsersByid , updateUserAvatarService, updateUserService} from "../services/userServices";
import userUpdateValidation from "../validations/userUpdateValidation";
import validateRequestBody from "../middlewares/authValidation";
import { getUserPreferencesService, preferenceService } from "../services/preferenceService";
import upload from "../multer/multer";
import { uploadImage } from "../services/s3-services";


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

    

    router.put(
        "/avatar", 
        upload.single("avatar"),
        async (req ,res)=>
    {
            try{
                const avatar = req.file!.mimetype
                console.log(avatar)

                const newAvatar = await uploadImage(req.file!);

                const updateAvatar = await updateUserAvatarService(avatar,req.userId, newAvatar)
                res.status(200).json(updateAvatar);
                
            }catch(error: any){
                if(error.message === "nenhum arquivo foi enviado"){
                    res.status(400).json({error:error.message});
                    return
                }
                if(error.message === "Tipo de arquivo inválido. Apenas JPEG e PNG são permitidos."){
                    res.status(400).json({error:error.message});
                    return
                }
                res.status(500).json({error: "Erro inesperado"})
                
            }

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