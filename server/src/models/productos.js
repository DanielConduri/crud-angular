import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Categorias } from "./categoria.js";

export const Productos = sequelize.define('productos',{  //Define un nuevo esuquema (nombreTabla, )
    int_producto_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    int_categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categorias,
            key: "int_categoria_id"
        }
    },
    str_producto_codigo:{
        type: DataTypes.STRING
    },
	str_producto_nombre:{
        type: DataTypes.STRING
    } ,
	int_producto_cantidad:{
        type: DataTypes.INTEGER
    },
   
	str_producto_marca:{
        type: DataTypes.STRING
    },
	int_producto_precio:{
        type: DataTypes.DOUBLE
    },
	str_producto_proveedor:{
        type: DataTypes.STRING
    },
    str_producto_estado:{
        type: DataTypes.STRING,
        defaultValue: 'ACTIVO'
    },
    dt_fecha_creacion:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    schema: 'inventario',
    timestamps: false
});
