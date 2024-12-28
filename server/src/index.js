import app from "./app.js";
import {sequelize} from './database/database.js';
import { configVariables } from "./config/variables.config.js";
let server;
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

  async function startServer(port){

    try {
    await sequelize.sync( {}); //No recrea las tablas
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log("Server is listening on port", port);
          });
        //app.listen(3002)
        //console.log('Server is  listening on port', 3002)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer(configVariables.port);

function stop() {
    console.log("Stopping server");
    server.close();
}

export  {server, startServer, stop}
