import { Express, Router } from "express";
import authGuard from "../middlewares/authGuard";


const userController = (server: Express) => {
    const router = Router();

    router.use(authGuard);

    router.get("", async (req, resp) =>{
    
              
    });

    router.get("/preferences", async (req ,resp)=>{

    });

    router.post("/preferences/define", async (req ,resp)=>{
        
    });

    router.put("/avatar", async (req ,resp)=>{
        
    });

    router.put("/update", async (req ,resp)=>{
        
    });

    router.delete("/deactivate", async (req ,resp)=>{
        
    });

    server.use("/user", router);
}
export default userController;