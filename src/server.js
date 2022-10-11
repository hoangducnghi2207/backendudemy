import express  from "express";

import configeViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";

const app =express();

configeViewEngine(app);
initWebRoutes(app);

const PORT=8080
app.listen(PORT,()=>{
    console.log("JWT BACKEND RUNNING from port" +PORT);
})