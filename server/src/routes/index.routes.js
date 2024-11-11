import { Router } from "express";
import  routeProductos  from "../controllers/productos.controller.js";

const router = Router();
const url = '/apiv4';

router.get(url + '/info', (req, res, next) => {
    res.json({
        status: 200,
        message: 'OK',
        version: '1.15',
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