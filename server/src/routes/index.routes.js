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
                command1: "docker rm -f container-productos",
                command2: "docker rmi -f img-productos",
                command3: "docker build -t img-productos -f ./server/Dockerfile .",
                command4: "docker run --name container-productos -d -p 8000:8000 img-productos",
          
            },
            {
                test: "In process"
            },{
                database: "Update credentials postgres verify 30/12/2024--"
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