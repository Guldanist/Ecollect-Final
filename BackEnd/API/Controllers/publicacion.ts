// USUARIO CONTROLER
import { Request, Response } from 'express';
import { Publicacion, Oferta, Foto, Cita, Usuario } from './../Configuracion/sequelize';

import { sequelize } from './../Configuracion/sequelize'
import { Model } from 'sequelize/types';


var fs = require('fs');
var path_module = require('path');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var base64ToImage = require('base64-to-image');

export var PublicacionController = {

    createPublicacion: async (req: Request, res: Response) => {
        try {
            const npublicacion = Publicacion.build(req.body);
            await sequelize.transaction(async (transac: any) => {
                await npublicacion.save({ transaction: transac }).then(async (publicacionCreada: any) => {
                    if (publicacionCreada) {
                        await Foto.create({
                            fot_img: req.body.foto_img,
                            publi_id: publicacionCreada.publi_id
                        }, { transaction: transac }).then((respuesta: any) => {
                            if (respuesta) {
                                res.status(200).json({
                                    message: "created",
                                    content: {
                                        publicacion: publicacionCreada,
                                        imagen: respuesta.fot_id
                                    }
                                });
                            } else {
                                throw new Error('Rollback initiated');
                            }
                        });
                    } else {
                        throw new Error('Rollback initiated');
                    }
                });
            });
        } catch (error) {
            res.status(500).json({
                message: "Ocurrio un Error",
                content: error
            });
        }

    },
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
    getImagenPublicacion: (req: Request, res: Response) => {
        let { publi_id } = req.params;

        Foto.findAll({ where: { publi_id: publi_id } }).then(async (respuesta: any) => {
            if (respuesta.length > 0) {
                let base64Str = respuesta[0].fot_img;
                let path = './images/'
                let rutaDefault = `./images/default.png`;
                let imageInfo = await base64ToImage(base64Str, path);
                let ruta = path + imageInfo.fileName;
                // Enviando el archivo como file
                console.log(ruta);
                if (fs.existsSync(ruta)) {
                    console.log('enviando archivo');
                    return res.sendFile(path_module.resolve(ruta));
                    // return res.sendFile(path_module.resolve(rutaDefault));
                } else {
                    console.log('error al enviar');
                    return res.sendFile(path_module.resolve(rutaDefault));
                }
            } else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        }).catch((error: any) => {
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

    getPublicacionByIdPublicacion: (req: Request, res: Response) => {
        let { publi_id } = req.params;

        Publicacion.findAll({ where: { publi_id: publi_id }, include: [{ model: Foto },{model:Usuario}] }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            } else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },

    // Mostrando datos con Paginacion
    getAllItemsCount: (req: Request, res: Response) => {
        let { publi_estado } = req.params;
        Publicacion.findAndCountAll({ where: { publi_estado: publi_estado } }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    count: respuesta.count
                });
            } else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getAllPublicacionesPaginacion: (req: Request, res: Response) => {
        let { publi_estado, limit, page } = req.params;
        Publicacion.findAndCountAll().then((respuesta: any) => {
            let pages = Math.ceil(respuesta.count / limit);//Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            // Obtener el total de elementos 
            Publicacion.findAll({ where: { publi_estado: publi_estado }}).then((resp: any) => {
                if (resp) {
                    Publicacion.findAll({ where: { publi_estado: publi_estado },order:[['publi_fecha', 'DESC']], include: [{ model: Foto }], limit: +limit, offset: offset }).then((respuesta2: any) => {
                        if (respuesta2) {

                            res.status(200).json({
                                message: "ok",
                                count: resp.length,
                                content: respuesta2
                            });
                        } else {
                            res.status(500).json({
                                message: "not found",
                                content: null
                            });
                        }
                    });
                }
            });

        }).catch((error: any) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        })
    },
    getPublicacionByNombrePaginacion: (req: Request, res: Response) => {
        let { publi_estado, nombre, limit, page } = req.params;
        Publicacion.findAndCountAll().then((respuesta: any) => {
            let pages = Math.ceil(respuesta.count / limit);//Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);

            Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }] } })
                .then((resp: any) => {
                    
                    if (resp) {
                        Publicacion.findAll({
                            where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }] },order:[['publi_fecha', 'DESC']], include: [{ model: Foto }],
                            limit: +limit, offset: offset
                        }).then((respuesta2: any) => {
                            // console.log(respuesta2);
                            if (respuesta2) {
                                res.status(200).json({
                                    message: "ok",
                                    count: resp.length,
                                    content: respuesta2
                                });
                            } else {
                                res.status(500).json({
                                    message: "not found",
                                    content: null
                                });
                            }
                        });
                    }
                });

        }).catch((error: any) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        })
    },
    getPublicacionByNombreYCategotiaPaginacion: (req: Request, res: Response) => {
        let { nombre, catpro_id, publi_estado, limit, page } = req.params;
        Publicacion.findAndCountAll().then((respuesta: any) => {
            let pages = Math.ceil(respuesta.count / limit);//Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] } })
                .then((resp: any) => {

                    if (resp) {
                        Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] },order:[['publi_fecha', 'DESC']], include: [{ model: Foto }], limit: +limit, offset: offset })
                            .then((respuesta2: any) => {
                                if (respuesta2) {
                                    res.status(200).json({
                                        message: "ok",
                                        count: resp.length,
                                        content: respuesta2
                                    });
                                } else {
                                    res.status(500).json({
                                        message: "not found",
                                        content: null
                                    });
                                }
                            });
                    }
                });

        }).catch((error: any) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        })
    },
    getPublicacionByIdCategotiaPaginacion: (req: Request, res: Response) => {
        let { catpro_id, publi_estado, limit, page } = req.params;
        Publicacion.findAndCountAll().then((respuesta: any) => {
            let pages = Math.ceil(respuesta.count / limit);//Solo para saber cuantas paginas se generaran
            let offset = limit * (page - 1);
            Publicacion.findAll({ where: { [Op.and]: [{ publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] } })
                .then((resp: any) => {
                    if (resp) {
                        Publicacion.findAll({ where: { [Op.and]: [{ publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] },order:[['publi_fecha', 'DESC']], include: [{ model: Foto }], limit: +limit, offset: offset })
                            .then((respuesta2: any) => {
                                if (respuesta2) {
                                    res.status(200).json({
                                        message: "ok",
                                        count: resp.length,
                                        content: respuesta2
                                    });
                                } else {
                                    res.status(500).json({
                                        message: "not found",
                                        content: null
                                    });
                                }
                            });
                    }
                });
                
        }).catch((error: any) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        })
    },
    // PAginacion FIN

    getAllPublicaciones: (req: Request, res: Response) => {
        let { publi_estado } = req.params;
        Publicacion.findAll({ where: { publi_estado: publi_estado }, include: [{ model: Foto }] }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            } else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getPublicacionByNombre: (req: Request, res: Response) => {
        let { nombre, publi_estado } = req.params;
        Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }] }, include: [{ model: Foto }] }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            } else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        });
    },
    getPublicacionByNombreYCategotia: (req: Request, res: Response) => {
        let { nombre, catpro_id, publi_estado } = req.params;
        Publicacion.findAll({ where: { [Op.and]: [{ publi_descripcion: { [Op.like]: `%${nombre}%` } }, { publi_estado: { [Op.eq]: publi_estado } }, { catpro_id: { [Op.eq]: catpro_id } }] }, include: [{ model: Foto }] })
            .then((respuesta: any) => {
                if (respuesta) {
                    res.status(200).json({
                        message: "ok",
                        content: respuesta
                    });
                } else {
                    res.status(500).json({
                        message: "not found",
                        content: null
                    });
                }
            });
    },
    getPublicacionByIdUsuario: (req: Request, res: Response) => {
        let { usu_id,publi_estado } = req.params;
        Publicacion.findAll({  where: { [Op.and]: [{ usu_id: { [Op.eq]: usu_id } },{ publi_estado: { [Op.eq]: publi_estado } }] },order:[['publi_fecha', 'DESC']], include: [{ model: Oferta },{model:Foto}] })       
            .then((respuesta: any) => {
                if (respuesta) {
                    res.status(200).json({
                        message: "ok",
                        content: respuesta
                    });
                } else {
                    res.status(500).json({
                        message: "not found",
                        content: null
                    });
                }
            });
    },
    cambiarEstadoPublicacionById: (req: Request, res: Response) => {
        let { publi_id, publi_estado } = req.params;

        Publicacion.update({ publi_estado: publi_estado }, { where: { publi_id: publi_id } }).then((datos_actualizados: any) => {
            if (datos_actualizados[0] > 0) {
                res.status(200).json({
                    message: "updated",
                    content: datos_actualizados[0]
                });
            } else {
                res.status(400).json({
                    message: "not updated",
                    content: null
                });
            }
        }).catch((error: any) => {
            res.status(400).json({
                message: "failed",
                content: error
            });
        });
    }
}


