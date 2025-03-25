import { Express, Router } from "express";
import authGuard from "../middlewares/authGuard";
import {activityCreate, TypeCreate} from "../services/activityServices";



const activityController = (server: Express) => {
    const router = Router();

    router.use(authGuard);

    router.get("/types", async (req ,resp)=>{
        
    });

    router.get("", async (req ,resp)=>{
        
    });

    router.get("/all", async (req ,resp)=>{
        
    });

    router.get("/user/creator", async (req ,resp)=>{
        
    });

    router.get("/user/creator/all", async (req ,resp)=>{
        
    });

    router.get("/user/participant", async (req ,resp)=>{
        
    });

    router.get("/user/participant/all", async (req ,resp)=>{
        
    });

    router.get("/{id}/participants", async (req ,resp)=>{
        
    });

    router.post("/newType", async (req ,resp)=>{
        try{
            const data  = req.body;
            const create = await TypeCreate(data);
            resp.status(200).send(create);       
        }catch(error: any){
            resp.status(400).json({error:"Errou!"});
        }
    });

    router.post("/new", async (req ,resp)=>{
        try{
            const data  = req.body;
            const create = await activityCreate(data);
            resp.status(200).send(create);       
        }catch(error: any){
            resp.status(400).json({error:"Errou!"});
        }
    });

    router.post("/{id}/subscribe", async (req ,resp)=>{
        
    });

    router.put("/{id}/update", async (req ,resp)=>{
        
    });

    router.put("/{id}/conclude", async (req ,resp)=>{
        
    });

    router.put("/{id}/approve", async (req ,resp)=>{
        
    });

    router.put("/{id}/check-in", async (req ,resp)=>{
        
    });

    router.put("/{id}/unsubscribe", async (req ,resp)=>{
        
    });

    router.put("/{id}/delete", async (req ,resp)=>{
        
    });


    server.use("/activities", router);
}
export default activityController;