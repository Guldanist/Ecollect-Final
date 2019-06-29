import {sequelize} from './../Configuracion/sequelize';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import {Request,Response,NextFunction} from 'express'

// Importando Rutas de API
import {UsuarioRouter} from './../Routes/usuario'
import { PublicacionRouter } from '../Routes/publicacion';
import { OfertaRouter } from '../Routes/oferta';
import { HCalificacionRouter } from '../Routes/calificacion';
import { CitaRouter } from '../Routes/cita';
import { MensajeRouter } from '../Routes/mensaje';
import { CategoriaRouter } from '../Routes/categoria';

export default class Server{

    public app:express.Application;
    public PUERTO:any;
    // Variables para uso de Socket
    public httpServer:http.Server;
    public io:socketIO.Server;

    constructor(){
        this.app=express();
        this.PUERTO=process.env.PORT || 3700;
        this.httpServer=new http.Server(this.app);
        this.io=socketIO(this.httpServer);     

        this.ConfigurarBodyPArser();
        this.configurarCORS();
        this.asignarRutas();     
        this.escucharSockets();    
    }
        
    // config BodyPArser
    ConfigurarBodyPArser(){
        var BodyPArser=require('body-parser');
        this.app.use(BodyPArser.urlencoded({limit: '16mb', extended: true}));
        this.app.use(BodyPArser.json({limit: '16mb', extended: true}));
    }

    configurarCORS(){
        this.app.use((req:Request,res:Response,next:NextFunction)=>{
            //Reglas
            res.header('Access-Control-Allow-Origin','*');            
            res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
            res.header('Allow','GET,POST,PUT,DELETE');
            next();
        });
    } 
    escucharSockets(){

        console.log("Escuchando sockets");

        this.io.on('connect',(cliente)=>{
            console.log("Alguien se conectó :"+cliente.id);            

            cliente.on('disconnect',()=>{
                console.log(`El cliente ${cliente.id} se desconecto`);
                // this.clientes.remove(cliente.id);
                // this.io.emit('retorno-usuarios',this.clientes.getClientes());
            });

            cliente.on('agregaroferta',(data)=>{                
                console.log('datos ... : '+ data);                
                this.io.emit('actualizar-oferta','dato recibido');
            });
            
            // cliente.on('enviar-mensaje',(mensaje)=>{
            //     let objcliente:any=this.clientes.getClienteById(cliente.id);
            //     let content={
            //         mensaje:mensaje,
            //         nombre:objcliente.nombre
            //     }
            //     this.io.emit('nuevo-mensaje',content);
            // });
            //Cuando el cliente quiere emitir un evento a todos los clientes conectados
            //excepto a si mismo
            // cliente.broadcast.emit('evento',contenido);
           
        });
    }



    asignarRutas(){
        this.app.get('/',(req,res)=>{
            res.send("Backend Ecollect corriendo");
        });
        this.app.use('/api',UsuarioRouter);
        this.app.use('/api',PublicacionRouter);
        this.app.use('/api',OfertaRouter);
        this.app.use('/api',HCalificacionRouter);
        this.app.use('/api',CitaRouter);
        this.app.use('/api',MensajeRouter);
        this.app.use('/api',CategoriaRouter);
    }

    IniciarServidor(){
        let port=this.PUERTO;
        this.httpServer.listen(port,function(){
            console.log(`Servidor corriendo en el puerto ${port}` ); 

                sequelize.sync({force:false}).then(()=>{
                    console.log('Base de datos creada con exito');    
                }).catch((error:any)=>{
                    console.log("Error ...... "+error);
                });
        });
    }
}

