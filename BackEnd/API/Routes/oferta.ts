// OFERTA ROUTER
import {OfertaController} from'./../Controllers/oferta';
import {Router} from 'express';

export var OfertaRouter=Router();
/**
 * Implementamos las consultas mediante  GET
 */
OfertaRouter.get('/oferta/:publi_id',OfertaController.getOfertasByIdPublicacion);
OfertaRouter.get('/oferta/misofertas/:usu_id',OfertaController.getOfertasByIdUsuario);
OfertaRouter.post('/oferta',OfertaController.createOferta);
OfertaRouter.get('/oferta/cambiarestado/:ofer_id/:ofer_estado',OfertaController.setEstadoOfertasByIdOferta);

