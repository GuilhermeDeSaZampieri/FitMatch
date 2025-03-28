import { Express, Router } from "express";
import authGuard from "../middlewares/authGuard";
import {createActivityService, getActivityService} from "../services/activityServices";
import validateRequestBody from "../middlewares/authValidation";
import activityValidation from "../validations/activityValidations";
import { getTypesActivityService } from "../services/activityTypeService";



const activityController = (server: Express) => {
    const router = Router();

    router.use(authGuard);

    router.get("/types", async (req ,res)=>{
        try{
        const activityTypes = await getTypesActivityService(); 
        res.status(200).json(activityTypes);
        return;
        }
        catch(error: any){
            console.log(error);

            if(error.message === "Você precisa estar autorizado para acesar este endpoint."){
                res.status(403).json({error: "Autenticação necessária."})    
            }
            
            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."})    
            }
            res.status(500).json({error:"Erro inesperado"});
        }
    });

    router.get("", async (req ,res)=>{
        try{
            const {page, pageSize, typeId, orderBy, order } = req.query as {
                page: string,
                pageSize: string,
                typeId: string,
                orderBy: string ,
                order: "asc" | "desc",
            };
            const activityTypes = await getActivityService(parseInt(page)|| 1, parseInt(pageSize) || 10, typeId, orderBy, order); 
            res.status(200).json(activityTypes);
            return;
            }
            catch(error: any){
                console.log(error);
    
                if(error.message === "Você precisa estar autorizado para acesar este endpoint."){
                    res.status(403).json({error: "Autenticação necessária."})    
                }
                
                if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                    res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."})    
                }
                res.status(500).json({error:"Erro inesperado"});
            }
    });

    router.get("/all", async (req ,res)=>{
        
    });

    router.get("/user/creator", async (req ,res)=>{
        
    });

    router.get("/user/creator/all", async (req ,res)=>{
        
    });

    router.get("/user/participant", async (req ,res)=>{
        
    });

    router.get("/user/participant/all", async (req ,res)=>{
        
    });

    router.get("/{id}/participants", async (req ,res)=>{
        
    });

    router.post("/new", validateRequestBody(activityValidation), async  (req ,res)=>{
        try{

            const data  = req.body;
            const userId = req.userId;

            const create = await createActivityService(data, userId);
            res.status(200).send(create);       

        }catch(error: any){
            console.log(error);

            if(error.message === "Você precisa estar autorizado para acesar este endpoint."){
                res.status(403).json({error: "Autenticação necessária."})    
            }
            
            if(error.message === "Esta conta foi desativada e não pode ser ultilizada"){
                res.status(403).json({error: "Esta conta foi desativada e não pode ser ultilizada."})    
            }
            res.status(500).json({error:"Erro inesperado"});
        }
    });

    router.post("/{id}/subscribe", async (req ,res)=>{
        
    });

    router.put("/{id}/update", async (req ,res)=>{
        
    });

    router.put("/{id}/conclude", async (req ,res)=>{
        
    });

    router.put("/{id}/approve", async (req ,res)=>{
        
    });

    router.put("/{id}/check-in", async (req ,res)=>{
        
    });

    router.put("/{id}/unsubscribe", async (req ,res)=>{
        
    });

    router.put("/{id}/delete", async (req ,res)=>{
        
    });


    server.use("/activities", router);
}
export default activityController;