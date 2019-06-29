"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.categoriaProducto_model = (sequelize) => {
    var categoriaProducto_model = sequelize.define('t_categoria_producto', {
        catprod_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        catprod_nombre: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: true
        },
        catprod_estado: {
            type: sequelize_1.DataTypes.STRING(1),
            allowNull: true
        },
        catprod_descripcion: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        },
        catprod_foto: {
            type: sequelize_1.DataTypes.TEXT('medium'),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 't_categoria_producto'
    });
    return categoriaProducto_model;
};
