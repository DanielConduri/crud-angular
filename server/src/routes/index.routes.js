import { Router } from "express";
import  routeProductos  from "../controllers/productos.controller.js";

const router = Router();

router.get('/info', (req, res, next) => {
    res.json({
        status: 200,
        message: 'OK',
        version: '1.15',
    });
});

//Rutas de productos
router.get("/productos", routeProductos.obtenerProductos);
router.post("/productos", routeProductos.insertarProducto);
router.put('/productos/:id', routeProductos.actualizarProducto);
router.delete('/productos/:id', routeProductos.eliminarProducto);

export default router;