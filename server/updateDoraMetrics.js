import express from "express"
import { spawn } from 'child_process';
import client from 'prom-client';
const app = express();
const register = client.register;

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

// Llamar a la función periódicamente para obtener métricas
setInterval(fetchMetrics, 10000);  // Ejecuta cada 10 segundos

// Endpoint para exponer las métricas
app.get('/apiv4/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Iniciar el servidor
app.listen(8000, () => {
  console.log('Server is listening on port :8000');
});
