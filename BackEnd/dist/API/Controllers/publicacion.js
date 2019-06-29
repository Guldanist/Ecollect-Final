"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../Configuracion/sequelize");
const sequelize_2 = require("./../Configuracion/sequelize");
var fs = require('fs');
var path_module = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var base64ToImage = require('base64-to-image');
exports.PublicacionController = {
    createPublicacion: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const npublicacion = sequelize_1.Publicacion.build(req.body);
            yield sequelize_2.sequelize.transaction((transac) => __awaiter(this, void 0, void 0, function* () {
                yield npublicacion.save({ transaction: transac }).then((publicacionCreada) => __awaiter(this, void 0, void 0, function* () {
                    if (publicacionCreada) {
                        yield sequelize_1.Foto.create({
                            fot_img: req.body.foto_img,
                            publi_id: publicacionCreada.publi_id
                        }, { transaction: transac }).then((respuesta) => {
                            if (respuesta) {
                                res.status(200).json({
                                    message: "created",
                                    content: {
                                        publicacion: publicacionCreada,
                                        imagen: respuesta.fot_id
                                    }
                                });
                            }
                            else {
                                throw new Error('Rollback initiated');
                            }
                        });
                    }
                    else {
                        throw new Error('Rollback initiated');
                    }
                }));
            }));
        }
        catch (error) {
            res.status(500).json({
                message: "Ocurrio un Error",
                content: error
            });
        }
    }),
    // uploadFile:(req: Request, res: Response)=>{
    //     let{publi_id}=req.params;
    //     if(req.files){
    //         let ruta=req.files.archivo.path;
    //         // para separar la ruta del nombre .images\d
    //         let nombreyextension=ruta.split('\\')[1];
    //     //    console.log(nombreyextension);  
    // Foto.create({
    //     fot_img:nombreyextension,
    //     publi_id:publi_id
    // }).then((respuesta: any) => {
    //     if (respuesta) {
    //         res.status(200).json({
    //             message: "created",
    //             content: respuesta
    //         });
    //     } else {
    //         res.status(500).json({
    //             message: "no se creo la imagen",
    //             content: null
    //         });
    //     }
    // });
    //     }else{
    //         return res.status(500).send({
    //             message:"No hay archivos"
    //         });
    //     }
    // },    
    getImagenPublicacion: (req, res) => {
        let { publi_id } = req.params;
        sequelize_1.Foto.findAll({ where: { publi_id: publi_id } }).then((respuesta) => __awaiter(this, void 0, void 0, function* () {
            if (respuesta.length > 0) {
                let base64Str = respuesta[0].fot_img;
                let path = './images/';
                let rutaDefault = `./images/default.png`;
                let imageInfo = yield base64ToImage(base64Str, path);
                let ruta = path + imageInfo.fileName;
                // Enviando el archivo como file
                console.log(ruta);
                if (fs.existsSync(ruta)) {
                    console.log('enviando archivo');
                    return res.sendFile(path_module.resolve(ruta));
                    // return res.sendFile(path_module.resolve(rutaDefault));
                }
                else {
                    console.log('error al enviar');
                    return res.sendFile(path_module.resolve(rutaDefault));
                }
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        })).catch((error) => {
            res.status(500).json({
                message: "not found",
                content: null
            });
        });
        // let ruta = `./images/${req.params.name}`;
        // let rutaDefault = `./images/default.png`;
        // if (fs.existsSync(ruta)) {
        //     return res.sendfile(path_module.resolve(ruta));
        // } else {
        //     return res.sendfile(path_module.resolve(rutaDefault));
        // }
    },
    getPublicacionByIdPublicacion: (req, res) => {
        let { publi_id } = req.params;
        sequelize_1.Publicacion.findAll({ where: { publi_id: publi_id }, include: [{ model: sequelize_1.Foto }, { model: sequelize_1.Usuario }] }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    // Mostrando datos con Paginacion
    getAllItemsCount: (req, res) => {
        let { publi_estado } = req.params;
        sequelize_1.Publicacion.findAndCountAll({ where: { publi_estado: publi_estado } }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    count: respuesta.count
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getAllPublicacionesPaginacion: (req, res) => {
        let { publi_estado, limit, page } = req.params;
        sequelize_1.Publicacion.findAndCountAll().then((respuesta) => {
            let pages = Math.ceil(respuesta.count / limit); //Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            // Obtener el total de elementos 
            sequelize_1.Publicacion.findAll({ where: { publi_estado: publi_estado } }).then((resp) => {
                if (resp) {
                    sequelize_1.Publicacion.findAll({ where: { publi_estado: publi_estado }, order: [['publi_fecha', 'DESC']], include: [{ model: sequelize_1.Foto }], limit: +limit, offset: offset }).then((respuesta2) => {
                        if (respuesta2) {
                            res.status(200).json({
                                message: "ok",
                                count: resp.length,
                                content: respuesta2
                            });
                        }
                        else {
                            res.status(500).json({
                                message: "not found",
                                content: null
                            });
                        }
                    });
                }
            });
        }).catch((error) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    getPublicacionByNombrePaginacion: (req, res) => {
        let { publi_estado, nombre, limit, page } = req.params;
        sequelize_1.Publicacion.findAndCountAll().then((respuesta) => {
            let pages = Math.ceil(respuesta.count / limit); //Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }] } })
                .then((resp) => {
                if (resp) {
                    sequelize_1.Publicacion.findAll({
                        where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }] }, order: [['publi_fecha', 'DESC']], include: [{ model: sequelize_1.Foto }],
                        limit: +limit, offset: offset
                    }).then((respuesta2) => {
                        // console.log(respuesta2);
                        if (respuesta2) {
                            res.status(200).json({
                                message: "ok",
                                count: resp.length,
                                content: respuesta2
                            });
                        }
                        else {
                            res.status(500).json({
                                message: "not found",
                                content: null
                            });
                        }
                    });
                }
            });
        }).catch((error) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    getPublicacionByNombreYCategotiaPaginacion: (req, res) => {
        let { nombre, catpro_id, publi_estado, limit, page } = req.params;
        sequelize_1.Publicacion.findAndCountAll().then((respuesta) => {
            let pages = Math.ceil(respuesta.count / limit); //Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] } })
                .then((resp) => {
                if (resp) {
                    sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] }, order: [['publi_fecha', 'DESC']], include: [{ model: sequelize_1.Foto }], limit: +limit, offset: offset })
                        .then((respuesta2) => {
                        if (respuesta2) {
                            res.status(200).json({
                                message: "ok",
                                count: resp.length,
                                content: respuesta2
                            });
                        }
                        else {
                            res.status(500).json({
                                message: "not found",
                                content: null
                            });
                        }
                    });
                }
            });
        }).catch((error) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    getPublicacionByIdCategotiaPaginacion: (req, res) => {
        let { catpro_id, publi_estado, limit, page } = req.params;
        sequelize_1.Publicacion.findAndCountAll().then((respuesta) => {
            let pages = Math.ceil(respuesta.count / limit); //Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] } })
                .then((resp) => {
                if (resp) {
                    sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] }, order: [['publi_fecha', 'DESC']], include: [{ model: sequelize_1.Foto }], limit: +limit, offset: offset })
                        .then((respuesta2) => {
                        if (respuesta2) {
                            res.status(200).json({
                                message: "ok",
                                count: resp.length,
                                content: respuesta2
                            });
                        }
                        else {
                            res.status(500).json({
                                message: "not found",
                                content: null
                            });
                        }
                    });
                }
            });
        }).catch((error) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    // PAginacion FIN
    getAllPublicaciones: (req, res) => {
        let { publi_estado } = req.params;
        sequelize_1.Publicacion.findAll({ where: { publi_estado: publi_estado }, include: [{ model: sequelize_1.Foto }] }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getPublicacionByNombre: (req, res) => {
        let { nombre, publi_estado } = req.params;
        sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }] }, include: [{ model: sequelize_1.Foto }] }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getPublicacionByNombreYCategotia: (req, res) => {
        let { nombre, catpro_id, publi_estado } = req.params;
        sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] }, include: [{ model: sequelize_1.Foto }] })
            .then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getPublicacionByIdUsuario: (req, res) => {
        let { usu_id, publi_estado } = req.params;
        sequelize_1.Publicacion.findAll({ where: { [Op.and]: [{ usu_id: { [Op.eq]: usu_id } }, { publi_estado: { [Op.eq]: publi_estado } }] }, order: [['publi_fecha', 'DESC']], include: [{ model: sequelize_1.Oferta }, { model: sequelize_1.Foto }] })
            .then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    cambiarEstadoPublicacionById: (req, res) => {
        let { publi_id, publi_estado } = req.params;
        sequelize_1.Publicacion.update({ publi_estado: publi_estado }, { where: { publi_id: publi_id } }).then((datos_actualizados) => {
            if (datos_actualizados[0] > 0) {
                res.status(200).json({
                    message: "updated",
                    content: datos_actualizados[0]
                });
            }
            else {
                res.status(400).json({
                    message: "not updated",
                    content: null
                });
            }
        }).catch((error) => {
            res.status(400).json({
                message: "failed",
                content: error
            });
        });
    }
};
