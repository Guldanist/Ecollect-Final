"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CALIFICA ROUTER
const categoria_1 = require("./../Controllers/categoria");
const express_1 = require("express");
exports.CategoriaRouter = express_1.Router();
/**
 * Implementamos las consultas mediante  GET
 */
exports.CategoriaRouter.get('/categoria', categoria_1.CateogiraController.getCategorias);
exports.CategoriaRouter.post('/categoria', categoria_1.CateogiraController.createCategoria);
exports.CategoriaRouter.post('/categoria/imagen', categoria_1.CateogiraController.uploadImage);
