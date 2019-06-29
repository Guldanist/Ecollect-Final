"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../Configuracion/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.CitaController = {
    createCita: (req, res) => {
        const nCita = sequelize_1.Cita.build(req.body);
        nCita.save().then((citaCreada) => {
            if (citaCreada) {
                res.status(200).json({
                    message: "created",
                    content: citaCreada
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
                message: "failed",
                content: error.original.sqlMessage
            });
        });
    },
    getCitaByIdPublicacion: (req, res) => {
        let { publi_id } = req.params;
        sequelize_1.Cita.findAll({ where: { publi_id }, include: [{ model: sequelize_1.Mensaje }, { model: sequelize_1.Oferta }] }).then((respuesta) => {
            if (respuesta.length > 0) {
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
        }).catch((error) => {
            res.status(500).json({
                message: "failed",
                content: error.original.sqlMessage
            });
        });
    },
};
