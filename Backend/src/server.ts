import "dotenv/config";
import express, {json} from "express";
import authController from "../src/controller/authController";
import activityController from "./controller/activityController";
import userController from "./controller/userController";
import { createBucket } from "./services/s3-services";
import swagger from "swagger-ui-express"
import docs from "./swagger.json";

async function init() 
{
    const server = express();

    server.use(json());
    server.use("/docs", swagger.serve, swagger.setup(docs))


    activityController(server);
    authController(server);
    userController(server);

    createBucket();

    const port = process.env.PORT;

    server.listen(port, ()=>{
    console.log(`Servidor Executando na porta ${port}`);
});
}

init();
