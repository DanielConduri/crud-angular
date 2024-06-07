import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Categorias = sequelize.define(
    'categorias',
    {
        int_categoria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        str_categoria_descripcion: {
            type: DataTypes.TEXT,
        }
    },
    {
        schema: 'inventario',
        timestamps: false
    }
);
