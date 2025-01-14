const client = require('prom-client');
const pushgateway = new client.Pushgateway('http://pushgateway:9091');

// Registrar métricas
const job = 'my_job';
const name = 'my_counter';
const value = 1;

pushgateway.push({ job, name: name, value: value })
  .then(() => {
    console.log('Métricas enviadas al Push Gateway');
  })
  .catch((err) => {
    console.error('Error al enviar métricas:', err);
  });




//-----------------------------------------------------------------------
const express = require('express');
const client = require('prom-client');
const app = express();

// Crea un contador de ejemplo
const counter = new client.Counter({
  name: 'my_counter',
  help: 'Ejemplo de contador',
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Incrementar el contador
counter.inc();

app.listen(3000, () => {
  console.log('Servidor Node.js escuchando en el puerto 3000');
});
