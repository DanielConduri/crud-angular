// import Worker from "worker_threads";
// import  myWorker from "./myWorker.js";

// myWorker.postMessage('Hello, world!');


// const parentPort= parentPort.on('message', (msg) => {
//     console.log(`Message received from parent: ${msg}`);
//     parentPort.postMessage('Hello, parent!');
// });

import child_process from "child_process";


//import server from  "node server.js";

//import { Productos } from '../models/productos.js';

//const query = 

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });

  
//   ls.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   })

import app from "./app.js";
import {sequelize} from './database/database.js';

async function main(){
    try {
        await sequelize.sync( { force: false }); //No recrea las tablas
        console.log('Connection has been established successfully.');
        app.listen(8000)
        console.log('Server is  listening on port', 8000)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();

