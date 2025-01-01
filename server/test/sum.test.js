// import {describe, expect, test} from '@jest/globals';

//Si usas ES Modules
import { describe, it, expect, test} from '@jest/globals';
import request from "supertest";
import sumar from './sumar.js';

import app from '../src/app.js'

import {sequelize} from "../src/database/database.js"
import {  server, startServer, stop, stopServer} from '../src/index.js'


afterAll(() => {
    stopServer();
});

// let server;
// beforeAll(() => {
//     // Inicia el servidor si es necesario (en pruebas con sockets, por ejemplo)
//     server = app.listen(8000, () => console.log("Test server running"));
// });
  
// afterAll((done) => {
//     // Cierra el servidor y otros recursos asíncronos
//     server.close(done);
// });

afterAll(async () => {
    await sequelize.close();
    
});



describe("Products API Endpoints", () => {
    test("GET /apiv4/info", async () => {
        const res = await request(app).get("/apiv4/info");
        //console.log(res)
        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();
        expect(res.body.body[0]).toEqual({
            api: "crud-angular",
            port: 8000,
            url: "/apiv4",
            description: ""
        });
        
    })

    test("GET /apiv4/productos/:id", async () => {

        const res = await request(app).get("/apiv4/productos/1");
        //console.log(res)
        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();

    })

    test("GET /apiv4/productos/item/:cod", async () => {

        const res = await request(app).get("/apiv4/productos/item/COMHPXA47CQLA-1-lg");
        //console.log(res)
        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();
    })
});




// describe('Test', () => {
//     test('sumar 1 + 2 es igual a 3', () => {
//         expect(sumar(1, 2)).toBe(3);
//     });
// })

// describe('Test', () => {
//     test('sumar 1 + 2 es igual a 3', () => {
//         expect(sumar(1, 8)).toBe(9);
//     });
// })



// describe('sum function', () => {
//   it('should add two numbers', () => {
//     expect(sumar(1, 2)).toBe(3);
//   });

//   it('should add two numbers', () => {
//     expect(sumar(3, 7)).toBe(10);
//   });

//   it('should add two numbers', () => {
//     expect(sumar(13, 7)).toBe(20);
//   });
// });



// Si usas CommonJS
// const { describe, it, expect } = require('@jest/globals');
// const sum = require('./sum');


