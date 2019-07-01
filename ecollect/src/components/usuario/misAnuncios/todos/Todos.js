import React, { Component } from 'react'
import './Todos.css';
import Anuncios from './Anuncios';
import Spinner from 'react-bootstrap/Spinner'
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
            console.log(usuLocalStorage);
            console.log(usuLocalStorage.id);

            fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/buscarByIdUsuario/${usuLocalStorage.id}/t`).then((response) => {
                return response.json();
            }).then((data) => {
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
                    <div>
                        Holy, I'm soy Todos los anuncios.
                    </div>
    
    
                    <div className="jumbotron">
    
                        <h1 className="display-3">Lista de Anuncios</h1>
                        {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p> */}
                        <hr className="my-4" />
                        <div className="list-group">
                            <div className="conteiner">
    
                                {
                                    publicaciones.map(anuncio=> (<Anuncios key={anuncio.publi_id} anuncio = {anuncio}/>))
                                }
    
    
    
                                {/* <div className="row">
                                    <div className="col-lg-3">
                                        <img src="http://placehold.it/300x300/" alt="" />
    
                                    </div>
                                    <div className="col-lg-9">
                                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">List group item heading</h5>
                                                <small>3 days ago</small>
                                            </div>
                                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                            <small>Donec id elit non mi porta.</small>
                                        </a>
                                        style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);"
                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <button type="button" class="btn btn-outline-primary">Destacar Anuncio</button>
                                            <button type="button" class="btn btn-outline-primary">Marcar como vendido</button>
                                            <button type="button" className="btn btn-info">Setting</button>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop3" type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop3" x-placement="bottom-start" >
                                                    <a className="dropdown-item" href="#">Editar</a>
                                                    <a className="dropdown-item" href="#">Finalizar</a>
                                                </div>
                                            </div>
    
                                        </div>
                                    </div>
                                </div>
                                <hr /> */}
                                {/* <div className="row">
                                    <div className="col-lg-3">
                                        <img src="http://placehold.it/300x300/" alt="" />
    
    
                                    </div>
                                    <div className="col-lg-9">
                                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">List group item heading</h5>
                                                <small className="text-muted">3 days ago</small>
                                            </div>
                                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                            <small className="text-muted">Donec id elit non mi porta.</small>
                                        </a>
    
                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <button type="button" class="btn btn-outline-primary">Destacar Anuncio</button>
                                            <button type="button" class="btn btn-outline-primary">Marcar como vendido</button>
                                            <button type="button" className="btn btn-info">Setting</button>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop3" type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop3" x-placement="bottom-start" >
                                                    <a className="dropdown-item" href="#">Editar</a>
                                                    <a className="dropdown-item" href="#">Finalizar</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">List group item heading</h5>
                                    <small>3 days ago</small>
                                </div>
                                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                <small>Donec id elit non mi porta.</small>
                            </a> */}
    
                            {/* <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">List group item heading</h5>
                                    <small className="text-muted">3 days ago</small>
                                </div>
                                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                <small className="text-muted">Donec id elit non mi porta.</small>
                            </a> */}
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
