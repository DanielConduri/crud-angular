import { Sequelize } from 'sequelize';

//Servidor PostgreSQL 15
export const sequelize = new Sequelize(
    'db_ventas',
    'postgres',
    'backend',
    {
        host: 'localhost',
        logging: false,
        dialect: 'postgres'
    }
);

