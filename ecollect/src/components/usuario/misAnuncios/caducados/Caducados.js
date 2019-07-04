import React, { Component } from 'react'
import Anuncios from '../todos/Anuncios';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
export default class Caducados extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publicaciones: [],
            cargado: false
        }
    }
    
    componentDidMount(){
        //console.log('Estos son los activos');
        
        let usuLocalStorage = this.obtenerUsuario()
        console.log(usuLocalStorage);
        if (usuLocalStorage != null){
            usuLocalStorage = JSON.parse(usuLocalStorage);
            //console.log(usuLocalStorage);
            //console.log(usuLocalStorage.id);

            fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/buscarByIdUsuario/${usuLocalStorage.id}/a`)
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
        //console.log(cargado);
        //console.log(publicaciones);
        
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
