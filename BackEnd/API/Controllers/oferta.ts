// OFERTA CONTROLER
import { Request, Response } from 'express';
import { Oferta, Usuario, Publicacion,sequelize} from './../Configuracion/sequelize';
import { where } from 'sequelize/types';

const Sequelize=require('sequelize');
const Op = Sequelize.Op;
export var OfertaController = {

    createOferta: (req: Request, res: Response) => {
        const noferta = Oferta.build(req.body);
        // console.log(noferta);
        
        noferta.save().then((OfertaCreada: any) => {
            if (OfertaCreada) {
                res.status(200).json({
                    message: "created",
                    content: OfertaCreada
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
                content: error
            });
        });
    },   
    getOfertasByIdPublicacion:(req: Request, res: Response)=>{
        let {publi_id}=req.params;

        Oferta.findAll({where:{publi_id:publi_id},order:[['ofer_precio_oferta', 'DESC']],include:[{model:Usuario}] }).then((respuesta:any)=>{
            if(respuesta){
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
                content: error
            });
        });
    },  
    getOfertasByIdUsuario:(req: Request, res: Response)=>{
        let {usu_id}=req.params;

        sequelize.query(`SELECT t_oferta.ofer_id,t_oferta.ofer_precio_oferta,t_oferta.ofer_comentario,t_oferta.ofer_fecha,t_oferta.ofer_estado,t_oferta.usu_id as ofer_usuarioid,
        t_publicacion.publi_id,t_publicacion.publi_descripcion,t_publicacion.publi_fecha,t_publicacion.publi_cant,t_publicacion.publi_estado,t_publicacion.publi_preciobase,t_foto.fot_id,t_foto.fot_img as publi_foto,t_publicacion.usu_id as publi_usuarioid,
        t_usuario.usu_nombre,t_usuario.usu_calificacion,t_usuario.usu_telefono
        FROM ecollect.t_oferta 
        inner join t_publicacion on t_oferta.publi_id=t_publicacion.publi_id
        inner join t_usuario on t_usuario.usu_id=t_publicacion.usu_id
        inner join t_foto on t_foto.publi_id=t_publicacion.publi_id where t_oferta.usu_id=${usu_id} order by t_oferta.ofer_fecha  desc`).then((respuesta:any)=>{
            if(respuesta){
                res.status(200).json({
                    message: "ok",
                    content: respuesta[0]
                });
            }
        }).catch((error:any)=>{
            res.status(500).json({
                message: "failed",
                content: error
            });
        });

        // Oferta.findAll({where:{usu_id:usu_id},include:[{model:Publicacion}],order:[['ofer_precio_oferta', 'DESC']]}).then( async(respuesta:any)=>{
            
        //     if(respuesta){     
        //         // console.log(respuesta);                           
        //         let vector:any[]=[];
        //         await respuesta.forEach((element:any,index:number) => {
        //             Publicacion.findByPk(element.publi_id).then((resp2:any)=>{
        //                 if(resp2){
        //                     // let obj={
        //                     //     oferta:element,
        //                     //     publicacion:resp2
        //                     // }
        //                     // console.log(obj);
        //                     respuesta[index].foto('foto de prueba ');
        //                 }
        //             })    
        //         });

        //         res.status(200).json({
        //             message: "ok",
        //             content: respuesta
        //         });
        //     }else{
        //         res.status(500).json({
        //             message: "not found",
        //             content: null
        //         });
        //     }
        // }).catch((error:any)=>{
        //     res.status(500).json({
        //         message: "failed",
        //         content: error
        //     });
        // });
    },  
    setEstadoOfertasByIdOferta:(req: Request, res: Response)=>{
        let {ofer_id,ofer_estado}=req.params;
        console.log();
        
        Oferta.update({
            ofer_estado:ofer_estado
        },{ where: { ofer_id: ofer_id} }).then((datos_actualizados: any) => {
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
        }).catch((error:any)=>{
            res.status(500).json({
                message: "failed",
                content: error
            });
        });        
    },  


}
