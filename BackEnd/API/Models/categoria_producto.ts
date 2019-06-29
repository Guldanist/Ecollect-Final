import {Sequelize, DataTypes} from 'sequelize';

export var categoriaProducto_model=(sequelize:Sequelize)=>{
    var categoriaProducto_model=sequelize.define('t_categoria_producto',{
        catprod_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        catprod_nombre:{
            type:DataTypes.STRING(45),
            allowNull:true
        },
        catprod_estado:{
            type:DataTypes.STRING(1),
            allowNull:true
        },
        catprod_descripcion:{
            type:DataTypes.STRING(100),
            allowNull:true
        },
        catprod_foto:{
            type:DataTypes.TEXT('medium'),
            allowNull:false
        }    
    },
    {
        timestamps:false,
        tableName:'t_categoria_producto'
    }
    );
    return categoriaProducto_model;
}