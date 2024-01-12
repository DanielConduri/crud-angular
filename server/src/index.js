import app from "./app.js";
import {sequelize} from './database/database.js';

app.get("/info", (req, res) => {
    res.json({
        status: true,
        message: 'Welcome to the ExpressJS server',
        //body: [{server:'recetas'}],
        version: '1.0.0'
    })
  });

  const port = process.env.PORT || 3002;
async function main(){
    try {
        await sequelize.sync( { force: false }); //No recrea las tablas
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log("Server is listening on port", port);
          });
        //app.listen(3002)
        //console.log('Server is  listening on port', 3002)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main(port);