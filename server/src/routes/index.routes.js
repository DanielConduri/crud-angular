import { Router } from "express";
import  routeProductos  from "../controllers/productos.controller.js";

const router = Router();
const url = '/apiv4';

router.get(url + '/info', (req, res, next) => {
    res.json({
        status: 200,
        message: "Get successfully",
        body: [
            {
                api: "crud-angular",
                port: 8000,
                url: "/apiv4",
                description: ""
            },
            {
                docker_compose_v1: {
                    command: "docker-compose up --buld -d",
                },
                docker_compose_v2: {
                    command: "docker compose up --buld -d",
                }

            },
            {
                command1: "docker build -t img-productos -f ./server/Dockerfile ./server",
                command2: "docker run --name container-productos -d -p 8000:8000 img-productos"
          
            },
            {
                test: "Unit tests completed with jest and verify container!"
            },{
                database: "Update credentials, postgres verify 02/01/2025 update___"
            }, 
            {
                containers: 2,
                container_1: {
                    name: "container-api-node",
                    network: "172.18.0.2"
                },
                container_2: {
                    name: "container-api-node-2",
                    network: "172.18.20.2"
                }, 
                 nginx:{
                    upstream: true,
                    status: "OK",

                }
                
            }

        ]
    });
});

//Rutas de productos
router.get(url + "/productos", routeProductos.obtenerProductos);
router.get(url + "/productos/:id", routeProductos.obtenerProductoId)
router.post(url + "/productos", routeProductos.insertarProducto);
router.put(url + '/productos/:id', routeProductos.actualizarProducto);
router.delete(url + '/productos/:id', routeProductos.eliminarProducto);
router.get(url + "/filtrado/:data", routeProductos.findProductos);
router.get(url + '/productos/item/:codigo', routeProductos.obtenerProductoCodigo);


export default router;