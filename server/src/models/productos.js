import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Productos = sequelize.define('productos',{  //Define un nuevo esuquema (nombreTabla, )
    int_producto_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: DataTypes.STRING
    },
    dt_fecha_creacion:{
        type: DataTypes.STRING
    }
},{
    schema: 'inventario',
    timestamps: false
});
