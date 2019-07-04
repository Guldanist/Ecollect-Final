import React, { Component } from 'react'
import Anuncios from '../todos/Anuncios';
import Spinner from 'react-bootstrap/Spinner'

export default class Activos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publicaciones: [],
            cargado: false
        }
    }
    
    componentDidMount(){
        console.log('Estos son los activos');
        
        let usuLocalStorage = this.obtenerUsuario()
        console.log(usuLocalStorage);
        if (usuLocalStorage != null){
            usuLocalStorage = JSON.parse(usuLocalStorage);
            console.log(usuLocalStorage);
            console.log(usuLocalStorage.id);

            fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/buscarByIdUsuario/${usuLocalStorage.id}/p`)
            .then((response) => { return response.json(); })
            .then((data) => {
                console.log(data.content);
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
            console.log(usuLocalStorage);

            
            return usuLocalStorage
        } else {
            return null
        }
    }

   

    render() {

        let {cargado,publicaciones} = this.state;
        console.log(cargado);
        console.log(publicaciones);
        
        if(cargado){
            return (
                <React.Fragment>
                    <div className="jumbotron">
    
                        <h1 className="display-3">Lista de Anuncios</h1>
                        {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p> */}
                        <hr className="my-4" />
                        <div className="list-group">
                            <div className="conteiner">
    
                                {
                                    publicaciones.map(anuncio=> (<Anuncios key={anuncio.publi_id} anuncio = {anuncio}/>))
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
