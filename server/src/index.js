import app from "./app.js";
import {sequelize} from './database/database.js';
import { configVariables } from "./config/variables.config.js";
import client from 'prom-client';

const register = new client.Registry();

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

// Métricas DORA (ejemplo de métricas fijas)
const leadTimeGauge = new client.Gauge({
  name: 'dora_lead_time_seconds',
  help: 'Lead Time for Changes (seconds)',
  labelNames: ['pipeline']
});
const deploymentFreqCounter = new client.Counter({
  name: 'dora_deployment_frequency_count',
  help: 'Deployment Frequency count',
  labelNames: ['pipeline']
});
const meanTimeToRestoreGauge = new client.Gauge({
  name: 'dora_mean_time_to_restore_seconds',
  help: 'Mean Time to Restore (seconds)',
  labelNames: ['pipeline']
});
const changeFailureRateGauge = new client.Gauge({
  name: 'dora_change_failure_rate',
  help: 'Change Failure Rate',
  labelNames: ['pipeline']
});

// Registramos las métricas
register.registerMetric(leadTimeGauge);
register.registerMetric(deploymentFreqCounter);
register.registerMetric(meanTimeToRestoreGauge);
register.registerMetric(changeFailureRateGauge);

// Asignamos valores a las métricas (puedes actualizarlos según el estado del pipeline)
leadTimeGauge.set({ pipeline: 'ci' }, 120); // Tiempo de lead time en segundos
deploymentFreqCounter.inc({ pipeline: 'ci' }, 5); // Frecuencia de despliegue
meanTimeToRestoreGauge.set({ pipeline: 'ci' }, 200); // MTTR en segundos
changeFailureRateGauge.set({ pipeline: 'ci' }, 0.02); // Tasa de fallos de cambios

// Endpoint para exponer las métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
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