// CALIFICA ROUTER
import {CateogiraController} from'./../Controllers/categoria';
import {Router} from 'express';

export var CategoriaRouter=Router();
/**
 * Implementamos las consultas mediante  GET
 */
CategoriaRouter.get('/categoria',CateogiraController.getCategorias);
CategoriaRouter.post('/categoria',CateogiraController.createCategoria);
CategoriaRouter.post('/categoria/imagen',CateogiraController.uploadImage);

