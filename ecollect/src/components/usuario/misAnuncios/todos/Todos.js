import React, { Component } from 'react'
import './Todos.css';
import Anuncios from './Anuncios';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publicaciones: [],
            cargado: false
        }
    }
    
    componentDidMount(){
        let usuLocalStorage = this.obtenerUsuario()
        // console.log(usuLocalStorage.id);
        if (usuLocalStorage != null){
            usuLocalStorage = JSON.parse(usuLocalStorage);
            //console.log(usuLocalStorage);
            //console.log(usuLocalStorage.id);

            fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/buscarByIdUsuario/${usuLocalStorage.id}/t`)
            .then((response) => { return response.json(); })
            .then((data) => {
                //console.log(data.content);
                this.setState({
                    publicaciones: data.content,
                    cargado: true,
                });
    
            });
            
        }
        
       
    }

    obtenerUsuario = () => {
        let usuLocalStorage = localStorage.getItem('usuario-ecollect')
        if (usuLocalStorage) {
            //console.log(usuLocalStorage);

            
            return usuLocalStorage
        } else {
            return null
        }
    }

   

    render() {

        let {cargado,publicaciones} = this.state;    
        
        if(cargado){
            return (
                <React.Fragment>
                    <div style={{backgroundColor:'white',paddingTop:20,paddingRight:20,paddingLeft:20}}>                        
                        <div className="list-group">
                            <div className="">
    
                                {
                                    publicaciones.length > 0 ? (publicaciones.map(anuncio => (<Anuncios key={anuncio.publi_id} anuncio={anuncio} />)))
                                    : (<div style={{ height: 300,display:'flex',alignItems:'center',justifyContent:'center' }}>
                                            <Alert variant='info'>
                                                    No se encontraron  Publicaciones
                                            </Alert>                                            
                                        </div>)
                                }

                            </div>
                           
                        </div>
                    </div>
                </React.Fragment>
            )
        }else{
            return( 
                <div className="center"><Spinner style={{marginTop:50}}  animation="border" variant="success" /> </div>
             )
            
        }
        
       
    }
}
