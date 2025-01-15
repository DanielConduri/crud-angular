//const fetch = require('node-fetch');
import fetch from "node-fetch";
import { configVariables } from './src/config/variables.config.js';
import client from 'prom-client';

const TOKEN = process.env.GITHUB_TOKEN;
const urlDeploymets = 'https://api.github.com/repos/DanielConduri/crud-angular/deployments';
const urlActions = 'https://api.github.com/repos/DanielConduri/crud-angular/actions/runs?page='

async function getDeployments(i) {
    //let page = '?page='

    const response = await fetch(`${urlActions}${i}`, {
        headers: { Authorization: `token ${configVariables.token}` },
    });
    if (!response.ok) throw new Error(`Error fetching deployments: ${response.status}`);
        return await response.json();
}

const register = new client.Registry();

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



  const totalDeployments = new client.Gauge({
    name: 'dora_total_deployments',
    help: 'Total deployments',
    labelNames: ['pipeline']
  });

  const successDeployments = new client.Gauge({
    name: 'dora_success_deployments',
    help: 'Total success deployments',
    labelNames: ['pipeline']
  });

  const failureDeployments = new client.Gauge({
    name: 'dora_failure_deployments',
    help: 'Total failure deployments',
    labelNames: ['pipeline']
  });

  const startupFailureDeployments = new client.Gauge({
    name: 'dora_startup_failure_deployments',
    help: 'Total startup failure deployments',
    labelNames: ['pipeline']
  });

  const cancelledDeployments = new client.Gauge({
    name: 'dora_cancelled_deployments',
    help: 'Total cancelled deployments',
    labelNames: ['pipeline']
  });



  // Registramos las métricas
  register.registerMetric(leadTimeGauge);
  register.registerMetric(deploymentFreqCounter);
  register.registerMetric(meanTimeToRestoreGauge);
  register.registerMetric(changeFailureRateGauge);

  register.registerMetric(totalDeployments);
  register.registerMetric(successDeployments);
  register.registerMetric(failureDeployments);
  register.registerMetric(startupFailureDeployments);
  register.registerMetric(cancelledDeployments);

async function updateMetrics() {

    let { totalRuns, successCount, failureCount, startup_failure, cancelled } = await getData();
    
    let deployment_frequency = 219;
    let lead_time = 120;
    let mean_time_to_restore = 60;
    let change_failure_rate = 0.1;
    
    // Asignamos valores a las métricas (puedes actualizarlos según el estado del pipeline)
    leadTimeGauge.set({ pipeline: 'ci' }, lead_time); // Tiempo de lead time en segundos
    deploymentFreqCounter.inc({ pipeline: 'ci' }, deployment_frequency); // Frecuencia de despliegue
    meanTimeToRestoreGauge.set({ pipeline: 'ci' }, mean_time_to_restore); // MTTR en segundos
    changeFailureRateGauge.set({ pipeline: 'ci' }, change_failure_rate); // Tasa de fallos de cambios

    totalDeployments.set({pipeline: 'ci'}, totalRuns);
    successDeployments.set({pipeline: 'ci'}, successCount);
    failureDeployments.set({pipeline: 'ci'}, failureCount);
    startupFailureDeployments.set({pipeline: 'ci'}, startup_failure);
    cancelledDeployments.set({pipeline: 'ci'}, cancelled);
    
}

getData();
function calculateTime (created_at, updated_at) {
    //console.log(created_at, updated_at)
    // Fechas en formato ISO 8601
    // const created_at = "2025-01-09T20:41:32Z";
    // const updated_at = "2025-01-09T20:42:14Z";

    // Convertir las fechas a objetos Date
    const createdAtDate = new Date(created_at);
    const updatedAtDate = new Date(updated_at);

    // Calcular la diferencia en milisegundos
    const timeDifferenceMs = updatedAtDate - createdAtDate;
    //console.log(timeDifferenceMs)
    
    // Convertir la diferencia a minutos y segundos
    const timeDifferenceSec = timeDifferenceMs / 1000; // Convertir a segundos
    const minutes = Math.floor(timeDifferenceSec / 60); // Obtener minutos
    const seconds = Math.floor(timeDifferenceSec % 60); // Obtener segundos

    const description = `La diferencia entre las dos fechas es de ${minutes} minutos y ${seconds} segundos.`;
    //console.log(description);
    return {minutes, seconds, description};
    //console.log(`La diferencia entre las dos fechas es de ${timeDifferenceSec} segundos.`);

}
export async function getData (){

    let successCount = 0;
    let failureCount = 0;
    let totalDuration = 0;
    let startup_failure = 0
    let cancelled = 0;
    let lenght = 0;
    let totalRuns = 0;
    
    let i = 1;
    let deployments = null;
    let totalSize = 0;
    let timeAdd = 0;
    let time = 0;
    do{
        deployments = await getDeployments(i);

        //console.log('Tamaño', await getSize(deployments.workflow_runs));
        lenght= await getSize(deployments.workflow_runs);
        totalSize += lenght
        timeAdd +=  time
        //console.log('totalSize', totalSize)
        //console.log('Total Deployments', deployments.workflow_runs[0])
        i++;
    }while(lenght != 0);
    totalRuns = deployments.total_count;
    //console.log('totalSize', totalSize)
    //console.log('Número de páginas:', i)

    async function getSize(workflow_runs) {
        // Calcular el tamaño total del array
        let j = 0;
        let time1 = 0;
        workflow_runs.forEach(run => {
            //console.log(run.conclusion)
            if (run.conclusion === 'success') {
                successCount++;
            } else if (run.conclusion === 'failure') {
                failureCount++;
            } else if (run.conclusion === 'startup_failure'){
                startup_failure++;
            } else if (run.conclusion === 'cancelled') {
                cancelled++;
            }
            j++;

        });

        //time1 = await getTimeDeployment(workflow_runs, j)
        //console.log(successCount, failureCount, startup_failure, cancelled)
        return j;
    }
   
    console.log('successCount', successCount)
    console.log('failureCount', failureCount)
    console.log('startup_failure', startup_failure)
    console.log('cancelled', cancelled)
    console.log('AverageTime', timeAdd/totalRuns)

    //const deployments = await getDeployments();
    //console.log('Total Deployments', deployments.workflow_runs.lenght)

    //console.log(`Total Deployments ${deployments.total_count}`)
    //console.log('Worflow_runs:', deployments.workflow_runs)
    
    async function getTimeDeployment(workflow_runs, count){
        let totalTime2 = 0
        //console.log(count)
        if(count > 0) {
        workflow_runs.forEach(i => {
            const id = i.id;
            const conclusion = i.conclusion;
            const created_at = i.created_at;
            const updated_at = i.updated_at;
        
        
            const { minutes, seconds, description }= calculateTime (created_at, updated_at);

            // Convertir segundos a fracción de minuto
            const secondsInMinutes = seconds / 60;

            // Sumar la fracción a los minutos
            const time = minutes + secondsInMinutes;
           
            totalTime2 += time;
        })

        return totalTime2
        // const id = deployments.workflow_runs[0].id;
        // const conclusion = deployments.workflow_runs[0].conclusion;
        // const created_at = deployments.workflow_runs[0].created_at;
        // const updated_at = deployments.workflow_runs[0].updated_at;
    
    
        // const { minutes, seconds, description }= calculateTime (created_at, updated_at);
        // const item1 = [ 
        //     {
        //         id: id,
        //         conclusion: conclusion,
        //         created_at: created_at,
        //         updated_at: updated_at,
        //         deployment_time: description,
        //         minutes: minutes,
        //         seconds: seconds
        //         // deployment_time:{
        //         //     minutes: minutes,
        //         //     seconds: seconds
        //         // }
        //     }
        // ];
        // console.log ('array',item1)
        }
        
    }

    
    
   
   
    //create array
    // const data = [];
    // for (let i = 1; i <= 5; i++) {
    //     data.push({ id: i, name: `User${i}`, age: 20 + i });
    // }
    // console.log(data);


    let url = []

    // deployments.workflow_runs.forEach(item => {
    //     //console.log(item.display_title)
    //     console.log('conclusion', item.conclusion)
    //     //url.push(deployment.statuses_url)
    // });
    //console.log(url)
    let status = []
    //let data2 = await getDeploymentsStatus(url);
    //console.log(data2)
    for (let item of url){
        let data = await getDeploymentsStatus(item);
        //console.log(data[0].state)
        status.push(data[0].state)
    }
    status.forEach(item => {
        console.log(item)
    })

    return { 
        totalRuns, 
        successCount, 
        failureCount, 
        startup_failure, 
        cancelled
    };

}


async function getDeploymentsStatus(data) {
    //console.log(configVariables.token)
    //const url = `${GITHUB_API}/repos/${REPO}/deployments`;
    //console.log('data en deplomymentStatus', data[0])
        const response = await fetch(data, {
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
    // const deployments = await getDeployments();
   
    // console.log(`Total despliegues: ${deployments.length}`);
    // let url = []
    // deployments.forEach(deployment => {
    //     //console.log(`- Deployment created at: ${deployment.statuses_url}`);
    //     url.push(deployment.statuses_url)
        
    // });
    //console.log(url)
    //let data2 = await getDeploymentsStatus(url);
    //console.log(data2[0].state)

})();


// const deployments = [
//     "2025-01-07T05Z",
//     "2025-01-05T05Z",
//     "2025-01-03T05Z",
//     // ... (agrega el resto de tus fechas aquí)
// ];
// function calculateDailyFrequency(deployments) {
//     const frequency = {};
//     deployments.forEach(deployment => {
//         if (!deployment || typeof deployment !== "string") {
//             console.error(`Valor inválido en deployments: ${deployment}`);
//             return; // Ignora valores inválidos
//         }
//         const date = new Date(deployment);
//         if (isNaN(date.getTime())) { // Verifica si la fecha es inválida
//             console.error(`Fecha inválida: ${deployment}`);
//             return; // Ignora fechas inválidas
//         }
//         const dateString = date.toISOString().split("T")[0]; // Extrae solo la fecha
//         frequency[dateString] = (frequency[dateString] || 0) + 1; // Incrementa el conteo
//     });
//     return frequency;
// }

// const dailyFrequency = calculateDailyFrequency(deployments);
// console.log("Frecuencia diaria de despliegues:");
// Object.entries(dailyFrequency).forEach(([date, count]) => {
//     console.log(`${date}: ${count} despliegues`);
// });


// // Función para calcular métricas DORA
// async function calculateMetrics() {
//     const deployments = await getDeployments();
//     if (deployments.length === 0) return null;

//     // Frecuencia de despliegues
//     const frequency = deployments.length; // Ejemplo: total de despliegues
//     console.log('Frequency', frequency)

//     // Tiempo de cambio (en segundos)
//     const leadTimes = deployments.map(dep => {
//         const prCreatedAt = new Date(dep.created_at); // Simulado, ajusta según los datos reales
//         const deployedAt = new Date(dep.created_at);
//         return (deployedAt - prCreatedAt) / 1000; // Diferencia en segundos
//     });
//     const averageLeadTime = leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length;
//     console.log('averageLeadTime', averageLeadTime)

//     // Tasa de fallos (simulado)
//     const failedDeployments = deployments.filter(dep => dep.status === "failure").length;
//     const failureRate = failedDeployments / deployments.length;
//     console.log('failureRate', failureRate)

//     // Tiempo de recuperación (simulado)
//     const mttr = failedDeployments > 0 ? 3600 : 0; // Simulado
//     console.log('mttr', mttr)

//     return { frequency, averageLeadTime, failureRate, mttr };
// }

// calculateMetrics()



export {
    register,
    updateMetrics
}