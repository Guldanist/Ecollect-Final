import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class AppBar extends Component {

    constructor(props){
        super(props);
    }

   

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid inicio">
                    <nav data-spy="affix" data-offset-top="30" className="navbar navbar-expand-lg navbar-default">
                        <div class="">
                            <ul className="navbar-nav logobar mr-auto">
                                <li class="logotipo"><a className="nav-link" href="#"></a></li>
                            </ul>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                            aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <ion-icon name="menu"></ion-icon>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">¿Por qué Ecollect? <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">¿Cómo funciona?</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contacto</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/login'}>Ingresar</Link>
                                        {/* <a className="nav-link" href="#">Ingresar</a> */}
                                    </li>
                                </ul>
                                <Link className="btn btnregistrarse my-2 my-sm-0" to={'/registrar'}>Regístrate</Link>
                            </form>
                        </div>
                    </nav>
                    <div className="ecollect text-center">
                        <h1 className="display-3 font-white font-bold font-title">Recicla con Ecollect</h1>
                        <p className="lead font-text font-white fs-20">Ayudamos a limpiar el planeta <br />
                        y a que tú mismo ayudes de distintas formas.</p>
                        <hr className="my-4" />
                        <p className="lead">
                            <div className="busqueda">
                                <div className="busq form-group">
                                    <select className="selector form-control" id="exampleSelect1">
                                        <option selected>Tipo de residuo</option>
                                        <option>Plástico</option>
                                        <option>Papel</option>
                                        <option>Latas</option>
                                        <option>Llantas</option>
                                        <option>Vidrio</option>
                                    </select>
                                </div>
                                <div className="busq form-group">
                                    <select className="selector form-control" id="exampleSelect1">
                                        <option selected>Ubicación</option>
                                        <option>Yanahuara</option>
                                        <option>Cayma</option>
                                        <option>Cerro Colorado</option>
                                        <option>Miraflores</option>
                                        <option>JLByR</option>
                                    </select>
                                </div>
                                <div className="busq">
                                    <button className="btn  my-2 my-sm-0 btnbuscar" type="submit">Buscar</button>
                                </div>
                            </div>
                        </p>
                        <div text-center style={{marginTop:'150px'}}>
                            {/* <div className='btn' style={{padding:'1px',backgroundColor:'white',borderRadius:20}}> */}
                                <Link className='btn  my-2 my-sm-0 btngetstarted' Component={Link} to={'/dashboard'}>Empezar</Link>                            
                            {/* </div>                             */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
