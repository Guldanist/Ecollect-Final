"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../Configuracion/sequelize");
// Retornar Archivo
// var fs = require('fs');
// var path_module=require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.UsuarioController = {
    createUsuario: (req, res) => {
        //Verificando que el email no se repita
        sequelize_1.Usuario.findAll({
            where: { [Op.and]: [{ usu_email: { [Op.eq]: req.body.usu_email } }, { usu_tiposesion: { [Op.eq]: req.body.usu_tiposesion } }] },
        }).then((resultado) => {
            console.log(resultado);
            if (resultado[0] == null || resultado.length == 0) {
                const nusuario = sequelize_1.Usuario.build(req.body);
                nusuario.setSaltAndHash(req.body.usu_pass);
                nusuario.save().then((usuariocreado) => {
                    if (usuariocreado) {
                        res.status(200).json({
                            message: "created",
                            content: usuariocreado
                        });
                    }
                    else {
                        res.status(500).json({
                            message: "not created",
                            content: null
                        });
                    }
                }).catch((error) => {
                    res.status(500).json({
                        message: `Failed`,
                        content: error
                    });
                });
            }
            else {
                res.status(500).json({
                    message: `Failed, El usuario con email ${req.body.usu_email} ya esta registrado.`,
                    content: null
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: `Failed`,
                content: error
            });
        });
    },
    createSocialRegister: (req, res) => {
        sequelize_1.Usuario.findAll({
            where: { [Op.and]: [{ usu_email: { [Op.eq]: req.body.usu_email } }, { usu_tiposesion: { [Op.eq]: req.body.usu_tiposesion } }] },
        }).then((resultado) => {
            if (resultado[0] == null || resultado.length == 0) {
                sequelize_1.Usuario.create(req.body).then((retorno) => {
                    if (retorno) {
                        res.status(201).json({
                            message: "ok",
                            content: retorno
                        });
                    }
                    else {
                        res.status(500).json({
                            message: 'error',
                            content: null
                        });
                    }
                }).catch((error) => {
                    res.status(500).json({
                        message: 'Failed',
                        content: error
                    });
                });
            }
            else {
                res.status(500).json({
                    message: `Failed, El usuario con email ${req.body.usu_email} ya esta registrado.`,
                    content: null
                });
            }
        });
    },
    getUsuarioById: (req, res) => {
        const { usu_id } = req.params;
        sequelize_1.Usuario.findAll({
            attributes: [['usu_id', 'usu_id'],
                ['usu_nombre', 'usu_nombre'],
                ['usu_urlimagen', 'usu_urlimagen'],
                ['usu_email', 'usu_email'],
                ['usu_telefono', 'usu_telefono'],
                ['usu_estado', 'usu_estado'],
                ['usu_tiposesion', 'usu_tiposesion'],
                ['usu_lng', 'usu_lng'],
                ['usu_lat', 'usu_lat'],
                ['usu_tipousu', 'usu_tipousu'],
                ['usu_avatar', 'usu_avatar']],
            where: { [Op.and]: [{ usu_id: { [Op.eq]: usu_id } }] },
        }).then((usuario) => {
            if (usuario) {
                res.status(200).json({
                    message: "found",
                    content: usuario
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    loginUsuario: (req, res) => {
        //BuscarUsuario
        let { usu_email, usu_pass } = req.body;
        sequelize_1.Usuario.findOne({
            where: {
                usu_email: usu_email
            }
        }).then((usuario_encontrado) => {
            if (usuario_encontrado) {
                //Validar Password
                if (usuario_encontrado.ValidarPassword(usu_pass)) {
                    res.status(200).send({
                        message: 'ok',
                        token: usuario_encontrado.generarJWT()
                    });
                }
                else {
                    res.status(500).json({
                        message: 'error',
                        content: 'usuario o pasword incorrectos'
                    });
                }
            }
            else {
                res.status(500).json({
                    message: 'error',
                    content: 'usuario o pasword incorrectos'
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: 'Failed',
                content: error
            });
        });
    },
    loginUsuarioRedesSociales: (req, res) => {
        //BuscarUsuario
        let { usu_email, usu_tiposesion, usu_estado } = req.body;
        sequelize_1.Usuario.findOne({ attributes: [['usu_id', 'usu_id'],
                ['usu_email', 'usu_email'],
                ['usu_estado', 'usu_estado'],
                ['usu_tiposesion', 'usu_tiposesion'],
                ['usu_lng', 'usu_lng'],
                ['usu_lat', 'usu_lat'],
                ['usu_tipousu', 'usu_tipousu']],
            where: {
                usu_email: usu_email,
                usu_tiposesion: usu_tiposesion,
                usu_estado: usu_estado
            }
        }).then((usuario_encontrado) => {
            if (usuario_encontrado) {
                res.status(200).send({
                    message: 'ok',
                    content: usuario_encontrado
                });
            }
            else {
                res.status(500).json({
                    message: 'error',
                    content: 'No existe usuario.'
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: 'Failed',
                content: error
            });
        });
    },
    cambiarPass: (req, res) => {
        let { usu_email, usu_pass, new_pass } = req.body;
        sequelize_1.Usuario.findOne({
            where: {
                usu_email: usu_email
            }
        }).then((usuario_encontrado) => {
            if (usuario_encontrado) {
                if (usuario_encontrado.ValidarPassword(usu_pass)) {
                    // Cambiar password                    
                    usuario_encontrado.setSaltAndHash(new_pass);
                    sequelize_1.Usuario.update({
                        usu_salt: usuario_encontrado.usu_salt,
                        usu_hash: usuario_encontrado.usu_hash
                    }, { where: { usu_id: usuario_encontrado.usu_id } }).then((datos_actualizados) => {
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
                    });
                }
                else {
                    res.status(500).json({
                        message: 'error',
                        content: 'usuario o pasword incorrectos'
                    });
                }
            }
            else {
                res.status(500).json({
                    message: 'error',
                    content: 'usuario o pasword incorrectos'
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: 'Failed',
                content: error
            });
        });
    },
    updateUsuariobyId: (req, res) => {
        sequelize_1.Usuario.update(req.body, { where: { usu_id: req.body.usu_id } }).then((datos_actualizados) => {
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
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    darBajaUsuarioById: (req, res) => {
        let { usu_id, usu_estado } = req.params;
        sequelize_1.Usuario.update({ usu_estado: usu_estado }, { where: { usu_id: usu_id } }).then((datos_actualizados) => {
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
            res.status(500).json({
                message: "Failed",
                content: error
            });
        });
    },
    uploadImageAvatar: (req, res) => {
        let { usu_id, usu_avatar } = req.body;
        // console.log(usu_avatar);
        sequelize_1.Usuario.update({ usu_avatar: usu_avatar }, { where: { usu_id: usu_id } }).then((datos_actualizados) => {
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
                message: "not updated",
                content: error
            });
        });
        ;
    },
    getImagenAvatar: (req, res) => {
        const { usu_id } = req.params;
        console.log(usu_id);
        sequelize_1.Usuario.findAll({
            attributes: [['usu_avatar', 'usu_avatar']],
            where: { [Op.and]: [{ usu_id: { [Op.eq]: usu_id } }] },
        }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: "found",
                    content: respuesta[0].usu_avatar
                });
            }
            else {
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        }).catch((error) => {
            res.status(500).json({
                message: "not found",
                content: error
            });
        });
        // Guardar File en una ruta del host.
        // let ruta=`./images/${req.params.name}`;
        // let rutaDefault=`./images/default.png`;
        // if(fs.existsSync(ruta)){
        //     return res.sendfile(path_module.resolve(ruta));
        // }else{
        //     return res.sendfile(path_module.resolve(rutaDefault));
        // }
    },
};
