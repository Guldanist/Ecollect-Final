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
import { flexbox } from '@material-ui/system';


export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.Salir = this.Salir.bind(this)
        this.state = {
            usuario: {},
            displaylinkUsuario:'',
            displaylinkLogin:''
        }        
    }

    async componentDidMount() {
        await this.ClickToggleSidebar();
        // this.props.history.push("/misPublicaciones");
        await this.obtenerUsuario();
        if (this.ValidarUsuario()) {
            // Usuario Validado(Existe)
            this.setState({
                displaylinkLogin:'none',
                displaylinkUsuario:''})
        }else{
            // Usuario no valido No existe
            this.setState({
                displaylinkLogin:'',
                displaylinkUsuario:'none'})
        }
    }

    ValidarUsuario = () => {
        let usuarioLocalstorage = this.ObtenerUsuarioLocalStorage()
        if (usuarioLocalstorage != null) {
            usuarioLocalstorage = JSON.parse(usuarioLocalstorage);
            let ahora = Date.now() / 1000;
            // console.log(usuarioLocalstorage);
            if (usuarioLocalstorage.token != null) {
                let userDetails = this.ObtenerDetalleToken(usuarioLocalstorage.token);
                // console.log(JSON.parse(userDetails));                
                if (userDetails) {
                    if (JSON.parse(userDetails).exp > ahora) {
                        return true;
                    } else {
                        localStorage.removeItem("usuario-ecollect");
                    }
                }
            } else {
                if (usuarioLocalstorage.exp > ahora) {
                    return true;
                } else {
                    localStorage.removeItem("usuario-ecollect");
                }
            }

        }
        return false;
    }

    ObtenerUsuarioLocalStorage = () => {
        let usuarioLocalstorage = localStorage.getItem('usuario-ecollect')
        if (usuarioLocalstorage) {
            return usuarioLocalstorage
        } else {
            return null
        }
    }
    ObtenerDetalleToken(token) {
        if (token) {
            let centro = token.split(".")[1];
            return window.atob(centro);
        }
        return null;
    }


    obtenerUsuario = () => {
        let usuario = JSON.parse(localStorage.getItem('usuario-ecollect'))
        if (usuario) {
            this.setState({ usuario: usuario })
        } else {
            this.setState({
                usuario: {
                    nombre: 'Invitado',
                    img: 'https://www.musicu.live/assets/images/user-avatar.png'
                }
            })
        }

    }
    obtenerFotoUsuario = () => {
        if (this.state.usuario.img) {
            return this.state.usuario.img
        } else {
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
            <React.Fragment>
                {/* <BrowserRouter> */}

                <div className="wrapper">

                    <nav id="sidebar">
                        <div className="sidebar-header">
                            {/* Imagen logo Ecolect */}
                            <img src={require('./../../assets/img/logotipo_original.png')}></img>
                        </div>
                        <hr className="my-1 " style={{ color: 'white' }} />
                        <div></div>


                        <ul className="list-unstyled components">
                            <li>
                                <Link className="nav-link" component={Link} to='/'><i class="fas fa-home" style={{ marginRight: 10 }}></i>Inicio</Link>
                            </li>
                            <li className="">
                                <a  style={{display:this.state.displaylinkUsuario}} href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fas fa-user" style={{ marginRight: 10 }}></i>Usuario</a>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        <Link className="nav-link" component={Link} to={`${this.props.match.url}/miPerfil`}>Mi Perfil</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" component={Link} to={`${this.props.match.url}/misPublicaciones`}>Mis Publicaciones</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" component={Link} to={`${this.props.match.url}/misOfertas`} >Mis Ofertas</Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link" component={Link} to={`${this.props.match.url}/misMensajes`}>Mis Mensajes</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link className="nav-link" component={Link} to={`${this.props.match.url}/reciclar`} ><i class="fas fa-recycle" style={{ marginRight: 10 }}></i>Reciclar</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to={`/dashboard`}><i class="fas fa-file-image" style={{ marginRight: 10 }}></i>Publicaciones</Link>
                            </li>
                            <li>
                                <Link style={{display:this.state.displaylinkLogin}} className="nav-link" to={`/login`}><i class="fas fa-sign-in-alt" style={{ marginRight: 10 }}></i>Login</Link>
                            </li>
                            <li>
                                <Link className="nav-link" component={Link} to='/' onClick={this.Salir}><i class="fas fa-power-off" style={{ marginRight: 10 }}></i>Salir</Link>
                            </li>
                        </ul>
                    </nav>


                    <div id="content">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid" style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', width: 150 }}>
                                    <i onClick={this.ClickToggleSidebar} id='sidebarbutton' style={{ border: '1px solid #A1A1A1', padding: 10, borderRadius: 5, color: '#A1A1A1', }} class="fas fa-align-justify"></i>
                                    <img style={{ height: 40,marginLeft:10 }} src={require('./../../assets/img/logotipo_original.png')}></img>
                                </div>
                                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fas fa-align-justify"></i>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="nav navbar-nav ml-auto">
                                        <li id="menuNavBar" className="nav-item" style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                            <Badge style={{ marginRight: 10, marginLeft: 10, color: '#A1A1A1' }} badgeContent={1} color="secondary">
                                                <MailIcon />
                                            </Badge>
                                            <Avatar style={{ marginRight: 10, marginLeft: 10, borderRadius: '50%' }} alt="" src={this.obtenerFotoUsuario()} />
                                            <label style={{ marginRight: 10, marginLeft: 10, marginTop: 5 }}>{this.state.usuario.nombre}</label>
                                            <i style={{ marginLeft: 10 }} class="fas fa-sign-out-alt"></i>
                                            <Link style={{ marginRight: 10, marginLeft: 5 }} onClick={this.Salir}>Salir</Link>
                                            {/* Menu */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        {/* <Switch> */}
                        {/* <Route exact path="/" />
                            <Route exact path="/Home" component={Home} />
                            <Route exact path="/miPerfil" component={MiPerfil} />
                            <Route exact path="/misPublicaciones" component={MisPublicaciones} />
                            <Route exact path="/misOfertas" component={MisOfertas} />
                            <Route exact path="/misMensajes" component={Mensaje} />
                            <Route exact path="/reciclar" component={Reciclar} />
                            <Route exact path="/publicaciones" component={Publicaciones} />
                            <Route exact path="/publicacion/:publi_id" component={Publicacion} /> */}
                        {/* </Switch> */}
                        <Route exact path={this.props.match.url}  component={Publicaciones}/>
                        <Route path={`${this.props.match.url}/miPerfil`} component={MiPerfil}/>
                        <Route path={`${this.props.match.url}/misPublicaciones`} component={MisPublicaciones}/>
                        <Route path={`${this.props.match.url}/misOfertas`} component={MisOfertas}/>
                        <Route path={`${this.props.match.url}/misMensajes`} component={Mensaje} />
                        <Route path={`${this.props.match.url}/reciclar`} component={Reciclar}/>
                        <Route path={`${this.props.match.url}/publicaciones`} component={Publicaciones}/>
                        {/* <Route path={`${this.props.match.url}/publicaciones`} render={()=>{return(<Publicaciones></Publicaciones>)}}/> */}
                        <Route path={`${this.props.match.url}/publicacion/:publi_id`} component={Publicacion}/>

                    </div>
                </div>

                {/* </BrowserRouter> */}
            </React.Fragment>
        )
    }
}
