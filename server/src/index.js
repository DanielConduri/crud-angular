import app from "./app.js";
import {sequelize} from './database/database.js';
import { configVariables } from "./config/variables.config.js";

app.get("/info", (req, res) => {
    res.json({
        status: true,
        message: 'Welcome to the ExpressJS server',
        //body: [{server:'recetas'}],
        version: '1.0.0'
    })
  });

  //const port = process.env.PORT || 3002;
  //force: true -> elimina las tablas existentes y luego las vuelve a crear basándose en los modelos.
  //alter: true -> Sequelize intentará ajustar la tabla en lugar de eliminarla completamente. Aplicará cambios en el esquema sin perder datos (agregará columnas nuevas, cambiará tipos de datos, etc.).

  async function main(port){
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

main(configVariables.port);

// import  http  from 'http';
// const PORT = 3002;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });