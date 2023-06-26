import app from "./app.js";
import {sequelize} from './database/database.js';

async function main(){
    try {
        await sequelize.sync( { force: false }); //No recrea las tablas
        console.log('Connection has been established successfully.');
        app.listen(3002)
        console.log('Server is  listening on port', 3002)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();