//const fetch = require('node-fetch');
import fetch from "node-fetch";
import { configVariables } from './src/config/variables.config.js';

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
async function getData (){

    
    let i = 1;
    let deployments = null;
    let totalSize = 0;
    do{
        deployments = await getDeployments(i);
        //console.log('Tamaño',getSize(deployments.workflow_runs));
        totalSize += getSize(deployments.workflow_runs);
        //console.log('totalSize', totalSize)
        //console.log('Total Deployments', deployments.workflow_runs[0])
        i++;
    }while(i < 2)//getSize(deployments.workflow_runs) != 0);
    console.log('totalSize', totalSize)
    console.log('Número de páginas:', i)

    function getSize(workflow_runs) {
        // Calcular el tamaño total del array
        let j = 0;
        workflow_runs.forEach(item => {
            j++;
        });
        return j;
    }
   
    //const deployments = await getDeployments();
    //console.log('Total Deployments', deployments.workflow_runs.lenght)

    //console.log(`Total Deployments ${deployments.total_count}`)
    //console.log('Worflow_runs:', deployments.workflow_runs)
    
    const id = deployments.workflow_runs[0].id;
    const conclusion = deployments.workflow_runs[0].conclusion;
    const created_at = deployments.workflow_runs[0].created_at;
    const updated_at = deployments.workflow_runs[0].updated_at;


    const { minutes, seconds, description }= calculateTime (created_at, updated_at);
    const item1 = [ 
        {
            id: id,
            conclusion: conclusion,
            created_at: created_at,
            updated_at: updated_at,
            deployment_time: description,
            minutes: minutes,
            seconds: seconds
            // deployment_time:{
            //     minutes: minutes,
            //     seconds: seconds
            // }
        }
    ];
    console.log ('array',item1)
   
   
    //create array
    // const data = [];
    // for (let i = 1; i <= 5; i++) {
    //     data.push({ id: i, name: `User${i}`, age: 20 + i });
    // }
    // console.log(data);


    let url = []

    deployments.workflow_runs.forEach(item => {
        console.log(item.display_title)
        //url.push(deployment.statuses_url)
    });
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

    return 0;
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


