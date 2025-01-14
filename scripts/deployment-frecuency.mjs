//const fetch = require('node-fetch');
import fetch from "node-fetch";
import { configVariables } from '../server/src/config/variables.config.js';


const GITHUB_API = "https://api.github.com";
const REPO = "DanielConduri/crud-angular"; 
const TOKEN = process.env.GITHUB_TOKEN;

async function getDeployments() {
    //console.log(configVariables.token)
    //const url = `${GITHUB_API}/repos/${REPO}/deployments`;
    const response = await fetch('https://api.github.com/repos/DanielConduri/crud-angular/deployments', {
        headers: { Authorization: `token ${configVariables.token}` },
    });
    // if (!response.ok) {
    //     console.error("Error fetching deployments:", response.status, await response.text());
    //     return [];
    // }
    // return await response.json();
    if (!response.ok) throw new Error(`Error fetching deployments: ${response.status}`);
        return await response.json();
}


async function getDeploymentsStatus(data) {
    //console.log(configVariables.token)
    //const url = `${GITHUB_API}/repos/${REPO}/deployments`;
    //console.log('data en deplomymentStatus', data[0])
        const response = await fetch(data[0], {
                headers: {
                    Authorization: `token ${configVariables.token}`,
                },
        });
        if (!response.ok) {
            console.error("Error fetching deployments:", response.status, await response.text());
            return [];
        }
        return await response.json();
}

(async () => {
    const deployments = await getDeployments();
   
    console.log(`Total despliegues: ${deployments.length}`);
    let url = []
    deployments.forEach(deployment => {
        //console.log(`- Deployment created at: ${deployment.statuses_url}`);
        url.push(deployment.statuses_url)
        
    });
    //console.log(url)
    let data2 = await getDeploymentsStatus(url);
    //console.log(data2[0].state)
    
    
})();


const deployments = [
    "2025-01-07T05Z",
    "2025-01-05T05Z",
    "2025-01-03T05Z",
    // ... (agrega el resto de tus fechas aquí)
];
function calculateDailyFrequency(deployments) {
    const frequency = {};
    deployments.forEach(deployment => {
        if (!deployment || typeof deployment !== "string") {
            console.error(`Valor inválido en deployments: ${deployment}`);
            return; // Ignora valores inválidos
        }
        const date = new Date(deployment);
        if (isNaN(date.getTime())) { // Verifica si la fecha es inválida
            console.error(`Fecha inválida: ${deployment}`);
            return; // Ignora fechas inválidas
        }
        const dateString = date.toISOString().split("T")[0]; // Extrae solo la fecha
        frequency[dateString] = (frequency[dateString] || 0) + 1; // Incrementa el conteo
    });
    return frequency;
}

const dailyFrequency = calculateDailyFrequency(deployments);
console.log("Frecuencia diaria de despliegues:");
Object.entries(dailyFrequency).forEach(([date, count]) => {
    console.log(`${date}: ${count} despliegues`);
});


import fs from 'fs';
fs.writeFileSync('deployment_frequency.json', JSON.stringify(dailyFrequency, null, 2));



// Función para calcular métricas DORA
async function calculateMetrics() {
    const deployments = await getDeployments();
    if (deployments.length === 0) return null;

    // Frecuencia de despliegues
    const frequency = deployments.length; // Ejemplo: total de despliegues
    console.log('Frequency', frequency)

    // Tiempo de cambio (en segundos)
    const leadTimes = deployments.map(dep => {
        const prCreatedAt = new Date(dep.created_at); // Simulado, ajusta según los datos reales
        const deployedAt = new Date(dep.created_at);
        return (deployedAt - prCreatedAt) / 1000; // Diferencia en segundos
    });
    const averageLeadTime = leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length;
    console.log('averageLeadTime', averageLeadTime)

    // Tasa de fallos (simulado)
    const failedDeployments = deployments.filter(dep => dep.status === "failure").length;
    const failureRate = failedDeployments / deployments.length;
    console.log('failureRate', failureRate)

    // Tiempo de recuperación (simulado)
    const mttr = failedDeployments > 0 ? 3600 : 0; // Simulado
    console.log('mttr', mttr)

    return { frequency, averageLeadTime, failureRate, mttr };
}

calculateMetrics()

// # HELP dora_deployment_frequency Frecuencia de despliegues
// # TYPE dora_deployment_frequency gauge
// dora_deployment_frequency ${frequency}

// # HELP dora_change_lead_time_seconds Tiempo promedio de cambio en segundos
// # TYPE dora_change_lead_time_seconds gauge
// dora_change_lead_time_seconds ${averageLeadTime}

// # HELP dora_failure_rate Tasa de fallos de despliegues
// # TYPE dora_failure_rate gauge
// dora_failure_rate ${failureRate}

// # HELP dora_mttr_seconds Tiempo medio de recuperación en segundos
// # TYPE dora_mttr_seconds gauge
// dora_mttr_seconds ${mttr}