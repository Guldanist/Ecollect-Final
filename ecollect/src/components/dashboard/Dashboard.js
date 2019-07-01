import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import $ from 'jquery';

import Home from '../home/Home'
import MiPerfil from '../miPerfil/MiPerfil'
import MisPublicaciones from '../usuario/misAnuncios/MisAnuncios'
import MisOfertas from '../misOfertas/MisOfertas'
import Mensaje from '../mensaje/Mensaje'
import Reciclar from '../reciclar/Reciclar'
import Publicaciones from '../recolector/Recolector'
import Publicacion from '../publicacion/Publicacion'
import Button from 'react-bootstrap/Button'


import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';

import './dashboard.css';


export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.Salir = this.Salir.bind(this)
        this.state={
            usuario:{}
        }
    }

    componentDidMount() {
        this.ClickToggleSidebar();
        // this.props.history.push("/publicaciones");
        this.obtenerUsuario();
    }

    obtenerUsuario=()=>{
        let usuario=JSON.parse(localStorage.getItem('usuario-ecollect'))
        if(usuario){
            this.setState({usuario:usuario})    
        }else{
            this.setState({usuario:{
                nombre:'Invitado',
                img:'https://www.musicu.live/assets/images/user-avatar.png'
            }})
        }
        
    }
    obtenerFotoUsuario=()=>{
        if(this.state.usuario.img){
            return this.state.usuario.img
        }else{
            return 'https://www.musicu.live/assets/images/user-avatar.png'
        }
    }


    ClickToggleSidebar = () => {
        // console.log("Se hizo clic");
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        //$('a[aria-expanded=true]').attr('aria-expanded', 'false');
    }

    Salir = () => {
        // eliminar Usuario de local Storage y redireccionar a Home
        localStorage.removeItem('usuario-ecollect');
        this.props.history.push('/');
    }

    render() {
        return (
            <BrowserRouter>

                <div className="wrapper">

                    <nav id="sidebar">
                        <div className="sidebar-header">
                            {/* Imagen logo Ecolect */}
                            <img src={require('./../../assets/img/logo_negat_ecollect.png')}></img>                            
                        </div>
                        <hr className="my-1 " style={{color:'white'}}/>
                        <div></div>


                        <ul className="list-unstyled components">
                            {/* <Link className="nav-link" component={Link} to='/Home'>Recicla con Ecollect</Link> */}
                            <li className="">
                                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Usuario</a>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <Link className="nav-link" component={Link} to='/miPerfil'>Mi Perfil</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" component={Link} to='/misPublicaciones'>Mis Publicaciones</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" component={Link} to='/misOfertas'>Mis Ofertas</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" component={Link} to='/misMensajes'>Mis Mensajes</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link className="nav-link" component={Link} to='/reciclar'>Reciclar</Link>
                            </li>
                            <li>
                                <Link className="nav-link" component={Link} to='/publicaciones'>Publicaciones</Link>
                            </li>
                            <li>
                                <Link className="nav-link" component={Link} to='/' onClick={this.Salir}>Salir</Link>
                            </li>
                        </ul>
                    </nav>


                    <div id="content">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">

                                {/* <button  type="button" id="sidebarCollapse" onClick={this.ClickToggleSidebar} className="btn">
                                    <i style={{border:'1px solid #A1A1A1',padding:10,borderRadius:5,color:'#A1A1A1',}} class="fas fa-align-justify"></i>                                   
                                </button> */}
                                {/* <Button variant="outline-secondary"> */}
                                    <i onClick={this.ClickToggleSidebar} id='sidebarbutton' style={{border:'1px solid #A1A1A1',padding:10,borderRadius:5,color:'#A1A1A1',}} class="fas fa-align-justify"></i>    
                                {/* </Button> */}

                                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fas fa-align-justify"></i>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        <li id="menuNavBar" className="nav-item" style={{display:'flex', alignContent:'center',alignItems:'center'}}>
                                            <Badge style={{marginRight:10,marginLeft:10,color:'#A1A1A1'}} badgeContent={4} color="secondary">
                                                <MailIcon />
                                            </Badge>
                                            <Avatar style={{marginRight:10,marginLeft:10,borderRadius:'50%'}} alt="" src={this.obtenerFotoUsuario()}  />
                                            <label style={{marginRight:10,marginLeft:10,marginTop:5}}>{this.state.usuario.nombre}</label>                                            
                                            <Link style={{marginRight:10,marginLeft:10}} onClick={this.Salir}>Salir</Link>
                                            {/* Menu */}                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <Switch>
                            <Route exact path="/" />
                            <Route exact path="/Home" component={Home} />
                            <Route exact path="/miPerfil" component={MiPerfil} />
                            <Route exact path="/misPublicaciones" component={MisPublicaciones} />
                            <Route exact path="/misOfertas" component={MisOfertas} />
                            <Route exact path="/misMensajes" component={Mensaje} />
                            <Route exact path="/reciclar" component={Reciclar} />
                            <Route exact path="/publicaciones" component={Publicaciones} />
                            <Route exact path="/publicacion/:publi_id" component={Publicacion} />
                        </Switch>
                    </div>
                </div>

            </BrowserRouter>
        )
    }
}
