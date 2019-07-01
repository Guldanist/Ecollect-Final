import React, { Component } from 'react'

import './Login.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

// import utils from './../utils/utils'

export default class Login extends Component {
    // this=new utils();

    constructor(props) {        
        super(props);
        this.email = React.createRef();
        this.pass = React.createRef();
        this.mensaje = React.createRef();
        this.state = {
            usuario: {
                id: 0,
                nombre: '',
                email: '',
                token: '',
                sesion: '',
                img: '',
                exp: 0
            }
        }
        if (this.ValidarUsuario()) {
            this.props.history.push("/dashboard")
        }
    }

    ValidarUsuario = () => {
        let usuarioLocalstorage = this.ObtenerUsuario()
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
            }else{
                if (usuarioLocalstorage.exp > ahora) {
                    return true;
                } else {
                    localStorage.removeItem("usuario-ecollect");
                }
            }

        }
        return false;
    }

    ObtenerUsuario = () => {
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

    login = () => {

        if (this.email.current.value.trim() && this.pass.current.value.trim()) {
            this.mensaje.current.innerHTML = ''
            let headers = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usu_email: this.email.current.value.trim(),
                    usu_pass: this.pass.current.value.trim()
                })
            };
            fetch('https://backend-ecollect.herokuapp.com/api/usuario/login', headers).then((respuesta) => {
                return respuesta.json();
            }).then((data) => {
                if (data.token) {
                    // Creando Usuario para localstorage
                    let detalle = JSON.parse(this.ObtenerDetalleToken(data.token));
                    // console.log(detalle);
                    
                    this.setState({
                        usuario: {
                            id: detalle.usu_id,
                            nombre: detalle.usu_nombre,
                            email: detalle.usu_email,
                            token: data.token,
                            sesion: detalle.usu_tiposesion,
                            img: detalle.usu_urlimagen
                        }
                    })
                    this.mensaje.current.innerHTML = '';

                    localStorage.setItem('usuario-ecollect', JSON.stringify(this.state.usuario));
                    if (this.ValidarUsuario()) {
                        this.props.history.push("/dashboard")
                    }
                }
                else {
                    this.mensaje.current.innerHTML = 'Email o Contraseña incorrectos.';
                }
            })
        } else {
            this.mensaje.current.innerHTML = 'Falta email o contraseña.';
        }
    }

    LoginGoogle = (usuario) => {
        // Verificar Si usario existe en nuestra base de datos
        let detalle = JSON.parse(this.ObtenerDetalleToken(usuario.tokenId));

        let headers = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usu_email: detalle.email,
                usu_tiposesion: 'google',
                usu_estado:'a'
            })
        };
        // Se verifica que el usario exista y que inicie sesion con API Facebook o Google
        fetch('https://backend-ecollect.herokuapp.com/api/usuario/login/social', headers).then((respuesta) => {
            return respuesta.json();
        }).then((data) => {
            if (data.message === 'ok') {
                // console.log(data);
                // console.log(detalle);
                this.setState({
                    usuario: {
                        id: data.content.usu_id,
                        nombre: detalle.name,
                        email: detalle.email,
                        token: usuario.tokenId,
                        sesion: data.content.usu_tiposesion,
                        img: detalle.picture
                    }
                })
                this.mensaje.current.innerHTML = '';
                localStorage.setItem('usuario-ecollect', JSON.stringify(this.state.usuario));
                if (this.ValidarUsuario()) {
                    this.props.history.push("/dashboard")
                }
            } else {
                this.mensaje.current.innerHTML = data.content;
            }
        });
    }

    LoginFacebook = (usuario) => {
        // console.log(usuario);
        // Verificar Si usario existe en nuestra base de datos
        // let detalle = JSON.parse(this.ObtenerDetalleToken(usuario.tokenId));

        let headers = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usu_email: usuario.email,
                usu_tiposesion: 'facebook',
                usu_estado:'a'
            })
        };
        // Se verifica que el usario exista y que inicie sesion con API Facebook o Google
        fetch('https://backend-ecollect.herokuapp.com/api/usuario/login/social', headers).then((respuesta) => {
            return respuesta.json();
        }).then((data) => {
            if (data.message === 'ok') {
                // console.log(data);
                // console.log(detalle);
                this.setState({
                    usuario: {
                        id: data.content.usu_id,
                        nombre: usuario.name,
                        email: usuario.email,
                        token: null,
                        sesion: data.content.usu_tiposesion,
                        img: usuario.picture.data.url,
                        exp: usuario.data_access_expiration_time
                    }
                })
                this.mensaje.current.innerHTML = '';
                localStorage.setItem('usuario-ecollect', JSON.stringify(this.state.usuario));
                if (this.ValidarUsuario()) {
                    this.props.history.push("/dashboard")
                }
            } else {
                this.mensaje.current.innerHTML = data.content;
            }
        });
    }
    submitForm = (event) => {
        event.preventDefault();
    }
    nuevoRegistro = () => {
        this.props.history.push("/registrar")
    }
    render() {
        return (
            <div className="container" style={{display:'flex',justifyContent:'center'}}>
                <div className="row">
                    <div className="">
                        <div className="card card-signin my-3" style={{width:300}}>
                            <div className="card-body" style={{width:300}}>
                                {/* <h5 className="card-title text-center">Iniciar Sesión</h5> */}
                                <div className="content-logo">
                                    <img className="logo-login" id="loginlogo" alt="" src={require('./../../assets/img/logo_ecollect.png')} />
                                </div>
                                <form className="form-signin" onSubmit={this.submitForm}>
                                    <hr className="my-1" />
                                    <div className="form-group">

                                        <input ref={this.email} type="text" name="email" id="email" className="form-control" placeholder="Correo Electronico" autoFocus />
                                    </div>

                                    <div className="form-group">
                                        <input ref={this.pass} type="password" name="password" id="password" className="form-control" placeholder="Contraseña" />
                                    </div>
                                    <div>
                                        <small ref={this.mensaje} style={{ color: 'red' }}></small>
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3 fila-flex">
                                        <div>
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label">Recordar Contraseña</label>
                                        </div>

                                        <button className="text-info btn-link" onClick={this.nuevoRegistro}>Registrar Aqui</button>

                                    </div>

                                    <button onClick={this.login} className="btn btn-md btn-primary btn-block text-uppercase" >Iniciar</button>
                                    <hr className="my-1" />
                                    <GoogleLogin  className="btn-block mt-2 btn-google"
                                        clientId="499637178396-0rd7ne99bkhkqvvi3bj1h8eif8oi5a3n.apps.googleusercontent.com"
                                        onSuccess={this.LoginGoogle}
                                        onFailure={this.LoginGoogle}
                                        style={{alignSelf:'center'}}
                                    >
                                        <span> Login con google</span>
                                    </GoogleLogin>

                                    {/* <button className="btn btn-lg btn-google btn-block text-uppercase" ><i className="fab fa-google mr-2"></i> Login con Google</button> */}
                                    <FacebookLogin
                                        appId="468853403866304"
                                        fields="name,email,picture"
                                        callback={this.LoginFacebook}
                                        cssClass="btn btn-lg btn-facebook btn-block text-uppercase mt-2 mb-2"
                                        icon="fa-facebook"   
                                        textButton=' Login con Facebook'                                     
                                    ></FacebookLogin>
                                    {/* <button className="btn btn-lg btn-facebook btn-block text-uppercase" ><i className="fab fa-facebook-f mr-2"></i> Login con Facebook</button> */}
                                    <hr className="my-1" />

                                    <div className="custom-control mb-2 mt-2 fila-flex">
                                        <button className="text-info btn-link">¿Olvidaste tu Contraseña?</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
