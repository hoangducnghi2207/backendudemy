import  express from "express";
import homeController from "../controller/homeController"
import apiController from "../controller/apiController"
const router =express.Router();
// express app
const initApiRoutes =(app)=>{
   
    router.get("/test-api", apiController.testApi)
    router.post("/register",apiController.handleRegister)
    return app.use("/api/v1/", router)
    //rest api
    //GET-R POST-C PUT-U DEl-D

}

export default initApiRoutes ;