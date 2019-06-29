// CALIFICACION CONTROLER
import { Request, Response } from 'express';
import { Cita, Mensaje, Oferta} from './../Configuracion/sequelize';

const Sequelize=require('sequelize');
const Op = Sequelize.Op;
export var CitaController = {

    createCita: (req: Request, res: Response) => {
        const nCita = Cita.build(req.body);

        nCita.save().then((citaCreada: any) => {
            if (citaCreada) {
                res.status(200).json({
                    message: "created",
                    content: citaCreada
                });
            } else {
                res.status(500).json({
                    message: "not created",
                    content: null
                });
            }
        }).catch((error:any)=>{
            res.status(500).json({
                message: "failed",
                content: error.original.sqlMessage
            });
        });
    },   
    getCitaByIdPublicacion:(req: Request, res: Response)=>{
        let {publi_id}=req.params;

        Cita.findAll({where:{publi_id},include:[{model:Mensaje},{model:Oferta}]}).then((respuesta:any)=>{
            if(respuesta.length>0){
                res.status(200).json({
                    message: "ok",
                    content: respuesta
                });
            }else{
                res.status(500).json({
                    message: "not found",
                    content: null
                });
            }
        }).catch((error:any)=>{
            res.status(500).json({
                message: "failed",
                content: error.original.sqlMessage
            });
        });
    },  


}
