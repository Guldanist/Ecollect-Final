// USUARIO ROUTER
import {PublicacionController} from'./../Controllers/publicacion';
import {Router} from 'express';

export var PublicacionRouter=Router();

var multiparty=require('connect-multiparty');
var multipartyMiddleware=multiparty({uploadDir:'./images'});

/**
 * Implementamos las consultas mediante  GET
 */

// Buscar publicacion por publi_id
PublicacionRouter.get('/publicacion/buscarById/:publi_id',PublicacionController.getPublicacionByIdPublicacion);
// Mostrar todas las Publicaciones por estado
PublicacionRouter.get('/publicacion/:publi_estado',PublicacionController.getAllPublicaciones);
// Mostrar todas las publicaiones por nombre y estado
PublicacionRouter.get('/publicacion/buscarByNombre/:nombre/:publi_estado',PublicacionController.getPublicacionByNombre);
// Mostrar todas las publiaciones por nombre ,cat_id, estado
PublicacionRouter.get('/publicacion/buscarByNombreyCatProd/:nombre/:catpro_id/:publi_estado',PublicacionController.getPublicacionByNombreYCategotia);
// Mostrar todas las publicaciones por usu_id
PublicacionRouter.get('/publicacion/buscarByIdUsuario/:usu_id/:publi_estado',PublicacionController.getPublicacionByIdUsuario);

// Mostrar Fotos de una publicacion
PublicacionRouter.get('/publicacion/fotos/:publi_id',PublicacionController.getImagenPublicacion);
// Cambiar Estado de una publicacion por publi_id
PublicacionRouter.put('/publicacion/cambiarEstado/:publi_id/:publi_estado',PublicacionController.cambiarEstadoPublicacionById);
// Crear Publicacion
PublicacionRouter.post('/publicacion',PublicacionController.createPublicacion);



// Mostrar todas las Publicaciones por estado con paginacion
PublicacionRouter.get('/publicacion/:publi_estado/:limit/:page',PublicacionController.getAllPublicacionesPaginacion);
// Mostrar todas las publicaiones por nombre y estado con paginacion
PublicacionRouter.get('/publicacion/buscarByNombre/:nombre/:publi_estado/:limit/:page',PublicacionController.getPublicacionByNombrePaginacion);
// Mostrar todas las publiaciones por nombre ,cat_id, estado con paginacion
PublicacionRouter.get('/publicacion/buscarByNombreyCatProd/:nombre/:catpro_id/:publi_estado/:limit/:page',PublicacionController.getPublicacionByNombreYCategotiaPaginacion);
// Mostrar todas las publiaciones cat_id, estado con paginacion
PublicacionRouter.get('/publicacion/buscarByIdCatProd/:catpro_id/:publi_estado/:limit/:page',PublicacionController.getPublicacionByIdCategotiaPaginacion);

PublicacionRouter.get('/publicacion/count/:publi_estado',PublicacionController.getAllItemsCount);
