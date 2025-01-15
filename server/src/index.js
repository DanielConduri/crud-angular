import app from "./app.js";
import {sequelize} from './database/database.js';
import { configVariables } from "./config/variables.config.js";

import { register, updateMetrics } from '../dora-metrics.js'

import { spawn } from 'child_process';
let server;
let sever2 = null;



  //force: true -> elimina las tablas existentes y luego las vuelve a crear basándose en los modelos.
  //alter: true -> Sequelize intentará ajustar la tabla en lugar de eliminarla completamente. Aplicará cambios en el esquema sin perder datos (agregará columnas nuevas, cambiará tipos de datos, etc.).









// Endpoint para exponer las métricas
app.get('/apiv4/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


// Función que ejecuta un script en un proceso separado
function fetchMetrics() {
  const process = spawn('node', ['fetchMetricsScript.js']); // Aquí se ejecuta un script externo

  process.stdout.on('data', (data) => {
    console.log(`Data from child process: ${data}`);
    // Aquí puedes parsear los datos y actualizar las métricas
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}

  async function startServer(port){
    try {
    //await sequelize.sync( {}); //No recrea las tablas

      server = app.listen(port, () => {
        console.log(`server is listening on port :${port}`)
      });

       // Calcular las métricas de forma asíncrona después de iniciar el servidor
      setTimeout(() => {
        updateMetrics().catch((error) => {
          console.error('Error al calcular las métricas:', error);
        });
      }, 0); // Se ejecuta inmediatamente después de que el servidor inicie
        
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