"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.publicacion_model = (sequelize) => {
    var publicacion_model = sequelize.define('t_publicacion', {
        publi_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        publi_lng: {
            type: sequelize_1.DataTypes.DECIMAL(10, 7),
            allowNull: true
        },
        publi_lat: {
            type: sequelize_1.DataTypes.DECIMAL(10, 7),
            allowNull: true
        },
        publi_fecha: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        publi_estado: {
            type: sequelize_1.DataTypes.STRING(1),
            allowNull: true
        },
        publi_tiempo_oferta: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        // publi_foto:{
        //     type:DataTypes.TEXT,
        //     allowNull:true
        // },
        publi_cant: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        publi_preciobase: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        publi_descripcion: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
    }, {
        timestamps: false,
        tableName: 't_publicacion'
    });
    return publicacion_model;
};
