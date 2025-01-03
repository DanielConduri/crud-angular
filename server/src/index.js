import app from "./app.js";
import {sequelize} from './database/database.js';
import { configVariables } from "./config/variables.config.js";

// app.get("/apiv4/info", (req, res) => {
//     res.json({
//         status: true,
//         message: 'Welcome to the ExpressJS server',
//         //body: [{server:'recetas'}],
//         version: '1.0.0'
//     })
// });

  //const port = process.env.PORT || 3002;
  //force: true -> elimina las tablas existentes y luego las vuelve a crear basándose en los modelos.
  //alter: true -> Sequelize intentará ajustar la tabla en lugar de eliminarla completamente. Aplicará cambios en el esquema sin perder datos (agregará columnas nuevas, cambiará tipos de datos, etc.).
let server;
let sever2 = null;
  async function startServer(port){
    try {
    //await sequelize.sync( {}); //No recrea las tablas

      server = app.listen(port, () => {
        console.log(`server is listening on port :${port}`)
      });
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


function stop() {
  server.close();
}

function stopServer() {
  if (server) {
    server.close();  // Cierra el servidor si está en ejecución
  }
}

export { server, startServer, stopServer}

startServer(configVariables.port);