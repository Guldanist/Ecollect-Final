"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * MODELS
 */
const categoria_producto_1 = require("../Models/categoria_producto");
const cita_1 = require("./../Models/cita");
const historial_calificacion_1 = require("./../Models/historial_calificacion");
const mensaje_1 = require("./../Models/mensaje");
const oferta_1 = require("./../Models/oferta");
const publicacion_1 = require("./../Models/publicacion");
const usuario_1 = require("./../Models/usuario");
const foto_1 = require("../Models/foto");
const precio_1 = require("../Models/precio");
const unidadMedida_1 = require("../Models/unidadMedida");
/**
 * FIN MODELS
 */
// 
// const Sequelize=require('sequelize');
// export const sequelize=new Sequelize('ecollect','root','root',{
//     host:'localhost',
//     dialect:'mysql',
//     timeZone:'-05.00'
// });
// Base de Datos Prueba
// const Sequelize=require('sequelize');
// export const sequelize=new Sequelize('wVa0gcHZjN','wVa0gcHZjN','efmBSACYRg',{
//     host:'remotemysql.com',
//     dialect:'mysql',
//     timeZone:'-05.00'
// });
// Base de datos Final
const Sequelize = require('sequelize');
exports.sequelize = new Sequelize('ecollect', 'codigo', 'tecsup', {
    host: '3.18.116.129',
    dialect: 'mysql',
    timeZone: '-05.00'
});
/**
 * CREANDO MODELOS
 */
exports.CategoriaProducto = categoria_producto_1.categoriaProducto_model(exports.sequelize);
exports.Cita = cita_1.cita_model(exports.sequelize);
exports.Foto = foto_1.foto_model(exports.sequelize);
exports.HistorialCalificacion = historial_calificacion_1.historialCalificacion_model(exports.sequelize);
exports.Mensaje = mensaje_1.mensaje_model(exports.sequelize);
exports.Oferta = oferta_1.oferta_model(exports.sequelize);
exports.Precio = precio_1.precio_model(exports.sequelize);
exports.Publicacion = publicacion_1.publicacion_model(exports.sequelize);
exports.UnidadMedida = unidadMedida_1.unidadMedida_model(exports.sequelize);
exports.Usuario = usuario_1.usuario_model(exports.sequelize);
/**
 * FIN CREANDO MODELOS
 */
/**
 * DEFINICION RELACIONES DE TABLAS
 */
exports.Oferta.belongsTo(exports.Usuario, { foreignKey: 'usu_id' });
exports.Usuario.hasMany(exports.Oferta, { foreignKey: 'usu_id' });
exports.Oferta.belongsTo(exports.Publicacion, { foreignKey: 'publi_id' });
exports.Publicacion.hasMany(exports.Oferta, { foreignKey: 'publi_id' });
exports.Publicacion.belongsTo(exports.Usuario, { foreignKey: 'usu_id' });
exports.Usuario.hasMany(exports.Publicacion, { foreignKey: 'usu_id' });
exports.Publicacion.belongsTo(exports.CategoriaProducto, { foreignKey: 'catpro_id' });
exports.CategoriaProducto.hasMany(exports.Publicacion, { foreignKey: 'catpro_id' });
exports.Cita.belongsTo(exports.Publicacion, { foreignKey: 'publi_id' });
exports.Publicacion.hasMany(exports.Cita, { foreignKey: 'publi_id' });
// Modificado
exports.Cita.belongsTo(exports.Oferta, { foreignKey: 'ofer_id' });
exports.Oferta.hasMany(exports.Cita, { foreignKey: 'ofer_id' });
// Modificado
exports.Mensaje.belongsTo(exports.Cita, { foreignKey: 'cita_id' });
exports.Cita.hasMany(exports.Mensaje, { foreignKey: 'cita_id' });
exports.Mensaje.belongsTo(exports.Usuario, { foreignKey: 'usu_envia' });
exports.Usuario.hasMany(exports.Mensaje, { foreignKey: 'usu_envia' });
exports.Mensaje.belongsTo(exports.Usuario, { foreignKey: 'usu_recibe' });
exports.Usuario.hasMany(exports.Mensaje, { foreignKey: 'usu_recibe' });
exports.HistorialCalificacion.belongsTo(exports.Usuario, { foreignKey: 'usu_id' });
exports.Usuario.hasMany(exports.HistorialCalificacion, { foreignKey: 'usu_id' });
exports.HistorialCalificacion.belongsTo(exports.Usuario, { foreignKey: 'usu_idcalif' });
exports.Usuario.hasMany(exports.HistorialCalificacion, { foreignKey: 'usu_idcalif' });
exports.Foto.belongsTo(exports.Publicacion, { foreignKey: 'publi_id' });
exports.Publicacion.hasMany(exports.Foto, { foreignKey: 'publi_id' });
exports.CategoriaProducto.belongsTo(exports.Precio, { foreignKey: 'prec_id' });
exports.Precio.hasMany(exports.CategoriaProducto, { foreignKey: 'prec_id' });
exports.Precio.belongsTo(exports.UnidadMedida, { foreignKey: 'unimed_id' });
exports.UnidadMedida.hasMany(exports.Precio, { foreignKey: 'unimed_id' });
/**
* FIN DEFINICION RELACIONES DE TABLAS
*/
