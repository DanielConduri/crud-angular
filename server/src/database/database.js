import { Sequelize } from 'sequelize';
import { configVariables } from '../config/variables.config.js';

//Servidor PostgreSQL 15
// export const sequelize = new Sequelize(
//     'db_ventas',
//     'postgres',
//     'backend',
//     {
//         host: 'localhost',
//         logging: false,
//         dialect: 'postgres'
//     }
// );


// export const sequelize = new Sequelize(
//     "railway",
//      "postgres", 
//      "xbQcEKNCmflePzXphVttZDwUFsTGCXBv", 
//      {
//       host: "roundhouse.proxy.rlwy.net",
//       logging: false,
//       dialect: "postgres",
//       port: 12556
//     } 
//   );
  
// export const sequelize = new Sequelize(
//     "verceldb",
//     "postgres", 
//     "wHQtNUPrT27J", 
//     {
//      host: "ep-mute-poetry-a47jj8ak-pooler.us-east-1.aws.neon.techp",
//      logging: false,
//      dialect: "postgres",
//      port: 5432
//    } 
// );

export const sequelize = new Sequelize(
  configVariables.dbName,
  configVariables.dbUser,
  configVariables.dbPassword,
  {
      host: configVariables.dbServer,
      dialect: configVariables.dbDialect,
      logging: false,
      port: configVariables.dbPort,
      ssl: true, // Habilita SSL
      dialectOptions: {
          ssl: {
              require: true // Utiliza sslmode=require
          }
      }
  }
);
