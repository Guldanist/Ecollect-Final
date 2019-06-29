/**
 * MODELS
 */
import {categoriaProducto_model} from '../Models/categoria_producto';
import {cita_model} from './../Models/cita';
import {historialCalificacion_model} from './../Models/historial_calificacion';
import {mensaje_model} from './../Models/mensaje';
import {oferta_model} from './../Models/oferta';
import {publicacion_model} from './../Models/publicacion';
import {usuario_model} from './../Models/usuario';
import { foto_model } from '../Models/foto';
import { precio_model } from '../Models/precio';
import { unidadMedida_model } from '../Models/unidadMedida';

/**
 * FIN MODELS
 */
// 
// const Sequelize=require('sequelize');
// export const sequelize=new Sequelize('ecollect','root','root',{
//     host:'localhost',
//     dialect:'mysql',
//     timeZone:'-05.00'
// });

// Base de Datos Prueba
// const Sequelize=require('sequelize');
// export const sequelize=new Sequelize('wVa0gcHZjN','wVa0gcHZjN','efmBSACYRg',{
//     host:'remotemysql.com',
//     dialect:'mysql',
//     timeZone:'-05.00'
// });

// Base de datos Final
const Sequelize=require('sequelize');
export const sequelize=new Sequelize('ecollect','codigo','tecsup',{
    host:'3.18.116.129',
    dialect:'mysql',
    timeZone:'-05.00'
});

/**
 * CREANDO MODELOS
 */
export const CategoriaProducto:any=categoriaProducto_model(sequelize);
export const Cita:any=cita_model(sequelize);
export const Foto:any=foto_model(sequelize);
export const HistorialCalificacion:any=historialCalificacion_model(sequelize);
export const Mensaje:any=mensaje_model(sequelize);
export const Oferta:any=oferta_model(sequelize);
export const Precio:any=precio_model(sequelize);
export const Publicacion:any=publicacion_model(sequelize);
export const UnidadMedida:any=unidadMedida_model(sequelize);
export const Usuario:any=usuario_model(sequelize);
/**
 * FIN CREANDO MODELOS
 */

 /**
  * DEFINICION RELACIONES DE TABLAS
  */ 

    Oferta.belongsTo(Usuario,{foreignKey:'usu_id'});
    Usuario.hasMany(Oferta,{foreignKey:'usu_id'});

    Oferta.belongsTo(Publicacion,{foreignKey:'publi_id'});
    Publicacion.hasMany(Oferta,{foreignKey:'publi_id'});

    Publicacion.belongsTo(Usuario,{foreignKey:'usu_id'});
    Usuario.hasMany(Publicacion,{foreignKey:'usu_id'});

    Publicacion.belongsTo(CategoriaProducto,{foreignKey:'catpro_id'});
    CategoriaProducto.hasMany(Publicacion,{foreignKey:'catpro_id'})

    Cita.belongsTo(Publicacion,{foreignKey:'publi_id'});
    Publicacion.hasMany(Cita,{foreignKey:'publi_id'});

    // Modificado
    Cita.belongsTo(Oferta,{foreignKey:'ofer_id'});
    Oferta.hasMany(Cita,{foreignKey:'ofer_id'});
    // Modificado

    Mensaje.belongsTo(Cita,{foreignKey:'cita_id'});
    Cita.hasMany(Mensaje,{foreignKey:'cita_id'});

    Mensaje.belongsTo(Usuario,{foreignKey:'usu_envia'});
    Usuario.hasMany(Mensaje,{foreignKey:'usu_envia'})

    Mensaje.belongsTo(Usuario,{foreignKey:'usu_recibe'});
    Usuario.hasMany(Mensaje,{foreignKey:'usu_recibe'})

    HistorialCalificacion.belongsTo(Usuario,{foreignKey:'usu_id'});
    Usuario.hasMany(HistorialCalificacion,{foreignKey:'usu_id'});

    HistorialCalificacion.belongsTo(Usuario,{foreignKey:'usu_idcalif'});
    Usuario.hasMany(HistorialCalificacion,{foreignKey:'usu_idcalif'});

    Foto.belongsTo(Publicacion,{foreignKey:'publi_id'});
    Publicacion.hasMany(Foto,{foreignKey:'publi_id'});

    CategoriaProducto.belongsTo(Precio,{foreignKey:'prec_id'});
    Precio.hasMany(CategoriaProducto,{foreignKey:'prec_id'});

    Precio.belongsTo(UnidadMedida,{foreignKey:'unimed_id'});
    UnidadMedida.hasMany(Precio,{foreignKey:'unimed_id'});


    
  /**
  * FIN DEFINICION RELACIONES DE TABLAS
  */
 


