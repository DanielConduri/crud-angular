import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://crud-angular-eta.vercel.app/');
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3002/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());  //Para procesar datos en formato json
const whiteList = [
    "http://localhost:4200",
    "http://localhost:51769",
    "http://localhost:3002/",
    "https://crud-angular-production-315c.up.railway.app",
    "https://crud-angular-2at2-kitl-danielconduris-projects.vercel.app/",
    "https://localhost:4200",
    "https://pruebasinventario.me",
    "https://crud-angular-eta.vercel.app/"
    //"https://inventario-espoch.rubenvn.com",
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