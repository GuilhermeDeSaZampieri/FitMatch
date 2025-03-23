import { Express, Router } from "express";
import { createUser } from "../services/authServices";


const authController = (server: Express) => {
    const router = Router();
    
    router.post("/register", async (req, resp) =>{

        const userdata = req.body;
        const user = await createUser(userdata);
        resp.status(200).send(user);
        
    });

    router.post("/sign-in", async (req, resp) =>{

        
        
    });


    server.use("/auth", router);
}

export default authController;