import express  from "express";
import configeViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config()
import bodyParser from "body-parser";
import connectDB from "./config/configDB";

const app =express();
//config view engine
configeViewEngine(app);
//config body-parser    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//test connectDB
connectDB();
//initWebRoutes(app);
initWebRoutes(app);

const PORT=4000
app.listen(PORT,()=>{
    console.log("JWT BACKEND RUNNING from port" +PORT);
})