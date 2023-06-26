import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";

const app = express();
app.use(express.json());  //Para procesar datos en formato json
const whiteList = [
    "http://localhost:4200",
    "http://localhost:51769",
    
    "https://localhost:4200",
    "https://inventario-espoch.rubenvn.com",
  ];
  app.use(
    cors({
      credentials: true,
      origin: whiteList,
    })
  );
  app.use(cookieParser());

app.use(indexRoutes);   

export default app;