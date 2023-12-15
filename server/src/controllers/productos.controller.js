//import { sequelize } from '../database/database.js';
import { Productos } from '../models/productos.js';
import childProcess from "child_process";
import child_process from "child_process";


async function startServer() {
    // Ejecuta el comando `node src/server.js`
    try {
    const childProcess = child_process.spawn("node", ["src/server.js"]);
        return "En ejecución";
    //return "Servidor ejecutado correctamente";
    // Cierra el proceso hijo cuando termine
    childProcess.on("exit", (code) => {
        if (code !== 0) {
            console.error("El servidor se cerró con código de error", code);
            return code;
        }
    });
    } catch (error) {
        return error;
    }
}



const obtenerProductos = async (req, res) => {

    /*console.log('Antes de ejecutar el servidor');
    const serverDos = await startServer();
    console.log('Ejecutando servidor 2 en el puerto 8000 /n', serverDos);*/


    const datosProductos = await Productos.findAll();

    const resultados = datosProductos.map(objeto => {
        return {
            producto: objeto.dataValues,
        };
    });
    //console.log(resultados);

    try {
        if (datosProductos.length === 0 || !datosProductos) {
            return res.json({
                status: 200,
                message: 'No hay productos registrados',
            });
        }
        return res.json({
            status: 200,
            message: 'Productos obtenidos',
            body: datosProductos,
            //serverDos: serverDos
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const obtenerProductoId = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const producto = await Productos.findOne({
            where: {
                int_producto_id: id
            }
        });
        console.log(producto)

        if (!producto) {
            return res.json({
                status: false,
                message: 'El Producto a obtener no existe',
            });
        }

        return res.json({
            status: true,
            message: 'Producto obtenido exitosamente',
            body: producto
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


};
const insertarProducto = async (req, res) => {
    console.log(req);
    const {
        str_producto_codigo,
        str_producto_nombre,
        int_producto_cantidad,
        str_producto_marca,
        int_producto_precio,
        str_producto_proveedor
    } = req.body;

    try {
        const producto = await Productos.create({
            str_producto_codigo,
            str_producto_nombre,
            int_producto_cantidad,
            str_producto_marca,
            int_producto_precio,
            str_producto_proveedor
        });

        console.log('producto ', producto);
        res.json({
            status: 200,
            message: 'Producto insertado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const actualizarProducto = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    const {
        str_producto_codigo,
        str_producto_nombre,
        int_producto_cantidad,
        str_producto_marca,
        int_producto_precio,
        str_producto_proveedor,
        str_producto_estado
    } = req.body;
    try {
        const producto = await Productos.update({
            str_producto_codigo,
            str_producto_nombre,
            int_producto_cantidad,
            str_producto_marca,
            int_producto_precio,
            str_producto_proveedor,
            str_producto_estado

        }, {
            where: { int_producto_id: id }
        });

        /*const producto = await Productos.update({
            str_producto_nombre,
            int_producto_cantidad
        }, {
            where: { int_producto_id: id }
        })*/

        console.log(producto[0]);
        /*const producto = await Productos.findOne({
            where: { int_producto_id: id }
        });*/
        if (!producto || producto[0] === 0) {
            return res.json({
                status: false,
                message: 'El Producto a actualizar no existe',
            });
        }
        /*producto.str_producto_nombre = str_producto_nombre;
        producto.int_producto_cantidad = int_producto_cantidad;
        await producto.save();*/

        return res.json({
            status: true,
            message: 'Producto actualizado exitosamente',
            //body:producto
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


//crear metodo para actualizar el producto

const eliminarProducto = async (req, res) => {

    console.log("Ingreso a eliminar producto");
    const { id } = req.params;
    console.log(id);
    try {
        /* const data = await Productos.destroy({
             where: { int_producto_id: id }
         });
     
         console.log('data ', data);
         if(data === 1){
             return res.json({
                 status: 200,
                 message: 'Producto eliminado exitosamente',
             });
         }
         return res.json({
             status: 200,
             message: 'El Producto a eliminar no existe',
         });*/

        const producto = await Productos.findOne({
            where: {
                int_producto_id: id
            }
        });

        if (!producto) {
            return res.json({
                status: false,
                message: 'El Producto a eliminar no existe',
            });
        } else if (producto.str_producto_estado === 'ACTIVO') {
            producto.str_producto_estado = 'INACTIVO';
        } else {
            producto.str_producto_estado = 'ACTIVO';
        }

        await producto.save();

        return res.json({
            status: true,
            message: 'Producto actualizado exitosamente',
            body: producto
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};
export default {
    obtenerProductos,
    obtenerProductoId,
    insertarProducto,
    actualizarProducto,
    eliminarProducto
};
