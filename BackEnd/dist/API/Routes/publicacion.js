"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// USUARIO ROUTER
const publicacion_1 = require("./../Controllers/publicacion");
const express_1 = require("express");
exports.PublicacionRouter = express_1.Router();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './images' });
/**
 * Implementamos las consultas mediante  GET
 */
// Buscar publicacion por publi_id
exports.PublicacionRouter.get('/publicacion/buscarById/:publi_id', publicacion_1.PublicacionController.getPublicacionByIdPublicacion);
// Mostrar todas las Publicaciones por estado
exports.PublicacionRouter.get('/publicacion/:publi_estado', publicacion_1.PublicacionController.getAllPublicaciones);
// Mostrar todas las publicaiones por nombre y estado
exports.PublicacionRouter.get('/publicacion/buscarByNombre/:nombre/:publi_estado', publicacion_1.PublicacionController.getPublicacionByNombre);
// Mostrar todas las publiaciones por nombre ,cat_id, estado
exports.PublicacionRouter.get('/publicacion/buscarByNombreyCatProd/:nombre/:catpro_id/:publi_estado', publicacion_1.PublicacionController.getPublicacionByNombreYCategotia);
// Mostrar todas las publicaciones por usu_id
exports.PublicacionRouter.get('/publicacion/buscarByIdUsuario/:usu_id/:publi_estado', publicacion_1.PublicacionController.getPublicacionByIdUsuario);
// Mostrar Fotos de una publicacion
exports.PublicacionRouter.get('/publicacion/fotos/:publi_id', publicacion_1.PublicacionController.getImagenPublicacion);
// Cambiar Estado de una publicacion por publi_id
exports.PublicacionRouter.put('/publicacion/cambiarEstado/:publi_id/:publi_estado', publicacion_1.PublicacionController.cambiarEstadoPublicacionById);
// Crear Publicacion
exports.PublicacionRouter.post('/publicacion', publicacion_1.PublicacionController.createPublicacion);
// Mostrar todas las Publicaciones por estado con paginacion
exports.PublicacionRouter.get('/publicacion/:publi_estado/:limit/:page', publicacion_1.PublicacionController.getAllPublicacionesPaginacion);
// Mostrar todas las publicaiones por nombre y estado con paginacion
exports.PublicacionRouter.get('/publicacion/buscarByNombre/:nombre/:publi_estado/:limit/:page', publicacion_1.PublicacionController.getPublicacionByNombrePaginacion);
// Mostrar todas las publiaciones por nombre ,cat_id, estado con paginacion
exports.PublicacionRouter.get('/publicacion/buscarByNombreyCatProd/:nombre/:catpro_id/:publi_estado/:limit/:page', publicacion_1.PublicacionController.getPublicacionByNombreYCategotiaPaginacion);
// Mostrar todas las publiaciones cat_id, estado con paginacion
exports.PublicacionRouter.get('/publicacion/buscarByIdCatProd/:catpro_id/:publi_estado/:limit/:page', publicacion_1.PublicacionController.getPublicacionByIdCategotiaPaginacion);
exports.PublicacionRouter.get('/publicacion/count/:publi_estado', publicacion_1.PublicacionController.getAllItemsCount);
