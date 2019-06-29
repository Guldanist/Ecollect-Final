import {Sequelize,DataTypes} from 'sequelize';
export var publicacion_model=(sequelize:Sequelize)=>{
    var publicacion_model=sequelize.define('t_publicacion',{
        publi_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        publi_lng:{
            type:DataTypes.DECIMAL(10,7),
            allowNull:true
        },
        publi_lat:{
            type:DataTypes.DECIMAL(10,7),
            allowNull:true
        },
        publi_fecha:{
            type:DataTypes.DATE,
            allowNull:true
        },
        publi_estado:{
            type:DataTypes.STRING(1),
            allowNull:true
        },
        publi_tiempo_oferta:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        // publi_foto:{
        //     type:DataTypes.TEXT,
        //     allowNull:true
        // },
        publi_cant:{
            type:DataTypes.INTEGER,
            allowNull:true
        },        
        publi_preciobase:{
            type:DataTypes.DECIMAL(5,2),
            allowNull:true
        },
        publi_descripcion:{
            type:DataTypes.TEXT,
            allowNull:true
        },
        // publi_titu:{
        //     type:DataTypes.STRING(50),
        //     allowNull:true
        // }
    },
    {
        timestamps:false,
        tableName:'t_publicacion'
    });
    return publicacion_model;
}