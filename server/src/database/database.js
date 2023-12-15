import { Sequelize } from 'sequelize';

//Servidor PostgreSQL 15
/*export const sequelize = new Sequelize(
    'db_ventas',
    'postgres',
    'backend',
    {
        host: 'localhost',
        logging: false,
        dialect: 'postgres'
    }
);*/

export const sequelize = new Sequelize(
    "db_rest",
    "postgres", 
    "9iZy90V7vB0PLQfrGXnO", 
    {
     host: "containers-us-west-91.railway.app",
     logging: false,
     dialect: "postgres",
     port: 7261
   } 
);