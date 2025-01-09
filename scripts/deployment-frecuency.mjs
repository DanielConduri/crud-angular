//const fetch = require('node-fetch');
import fetch from "node-fetch";
import { configVariables } from '../server/src/config/variables.config.js';


const GITHUB_API = "https://api.github.com";
const REPO = "owner/repo"; // Cambia esto por tu repositorio
const TOKEN = process.env.GITHUB_TOKEN;

async function getDeployments() {
    //console.log(configVariables.token)
    //const url = `${GITHUB_API}/repos/${REPO}/deployments`;
    const response = await fetch('https://api.github.com/repos/DanielConduri/crud-angular/deployments', {
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

async function getDeploymentsStatus(data) {
    //console.log(configVariables.token)
    //const url = `${GITHUB_API}/repos/${REPO}/deployments`;

    console.log('data en deplomymentStatus', data[0])


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
    console.log(data2[0].state)
    
    
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
