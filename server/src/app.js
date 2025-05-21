import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";

import client from 'prom-client';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://34.155.83.51');
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3002/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());  //Para procesar datos en formato json
const whiteList = [
    "http://localhost:4200",
    "http://34.155.83.51/",
    "http://localhost",
    "http://localhost:51769",
    "http://localhost:3002/",
    "https://crud-angular-production-315c.up.railway.app",
    "https://crud-angular-2at2-kitl-danielconduris-projects.vercel.app/",
    "https://localhost:4200",
    "https://pruebasinventario.me",
    "https://crud-angular-eta.vercel.app"
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

// Creamos un registro de métricas
const register = new client.Registry();
// Endpoint para exponer las métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export default app;