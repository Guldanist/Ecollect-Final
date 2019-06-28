import React, { Component } from 'react'

// Socket.io client
import socketIOClient from "socket.io-client";


// import Mapa from '../mapa/Mapa';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
// Bootstrap react
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
// Material UI
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Css
var moment = require('moment')

export class Publicacion extends Component {
    objPublicacion = {};
    // objOfertas = [];
    objCitas = {};
    socket;
    idoferta;

    constructor(props) {
        super(props)

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.inputValorOferta = React.createRef();
        this.inputComentarioOferta = React.createRef();

        this.state = {
            showModalMapa: false,
            loadPublicacion: false,
            loadOfertas: false,
            loadCitas: false,
            direccionPublicacion: '',
            objOfertas: [],
            displayBtnAceptarOferta: '',
            displayBtnOfertar: '',                        
            displayBtnCrearOferta: '',
            show: false,
            endpoint: "https://backend-ecollect.herokuapp.com/",
            openModalAceptOferta: false            
        }
    }

    async componentDidMount() {
        // Verificando que el usuario sea el correcto


        // Cargar el componente
        await this.BuscarPublicacionById(this.props.match.params.publi_id);

        // conectando con socket
        const { endpoint } = this.state;
        this.socket = socketIOClient(endpoint);
        this.socket.on("connect", (data) => {
            console.log('Conectado con el servidor de sockets');
        });
        this.socket.on('actualizar-oferta', () => {
            // Escuchar Todos los eventos agregaroferta
            // Ejecutar la fincion para obtener nuevamente las Ofertas
            // console.log('AgregarOferta Escuchado');            
            this.BuscarOfertasByIdPublicacion(this.props.match.params.publi_id);
        });


    }
    BuscarPublicacionById = (publi_id) => {
        fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/buscarById/${publi_id}`).then((respuesta) => {
            return respuesta.json();
        }).then((data) => {
            if (data.content.length > 0) {

                this.objPublicacion = data.content[0];
                this.direccionFromCoordinate();
                this.BuscarOfertasByIdPublicacion(this.props.match.params.publi_id);
                this.VerificarPublicacionPropia()
                this.setState({ loadPublicacion: true });

            }
        });
    }
    BuscarOfertasByIdPublicacion = (publi_id) => {
        fetch(`https://backend-ecollect.herokuapp.com/api/oferta/${publi_id}`).then((respuesta) => {
            return respuesta.json();
        }).then((data) => {
            if (data.content.length > 0) {

                this.setState({
                    objOfertas: data.content,
                    loadOfertas: true
                });

                // console.log(this.state.objOfertas);
            }
        });
    }
    direccionFromCoordinate = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.objPublicacion.publi_lat},${this.objPublicacion.publi_lng}&key=AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E`).then((respuesta) => {
            return respuesta.json();
        }).then((data) => {
            // console.log(data);
            let fila = -1;
            let direccion = 'Perú';
            // for (let index = 0; index < data.results[0].address_components.length; index++) {
            //     if(data.results[index].address_components.length>=6){
            //         fila=index;
            //         break;
            //     }
            // }            
            // if(fila>-1){
            direccion = data.results[0].formatted_address
            // direccion = data.results[fila].address_components[2].long_name + ', ' +
            // data.results[fila].address_components[3].long_name + ', ' +
            // data.results[fila].address_components[4].long_name + ', ' +
            // data.results[fila].address_components[5].long_name;
            // }            
            this.setState({ direccionPublicacion: direccion })
        });
    }
    VerificarPublicacionPropia = () => {
        // Hasta este punto se supon que ya cargo los datos de la publiacion
        let usuario = JSON.parse(localStorage.getItem('usuario-ecollect'));

        if (this.objPublicacion.t_usuario.usu_id == usuario.id) {
            this.setState({
                displayBtnOfertar: 'none',
            });
        } else {
            // console.log('usuario que visualiza la publicacion');
            this.setState({
                displayBtnAnularPublicacion: 'none',
                displayBtnAceptarOferta: 'none',
            });
        } 
        if(this.objPublicacion.publi_estado==='e'){
            this.setState({
                displayBtnOfertar: 'none',
                displayBtnAnularPublicacion: 'none',
                displayBtnAceptarOferta: 'none',
            });
        }
    }

    // Mostrar Fecha
    CalcularFechaPublicacion = (fecha) => {
        let fecha1 = moment(fecha);
        let hoy = moment(new Date());
        let diferencia = hoy.diff(fecha1, 'day')
        if (diferencia > 0) {
            return `Hace ${diferencia} dias.`;
        } else {
            let diferencia = hoy.diff(fecha1, 'hours')
            if (diferencia > 0) {
                return `Hace ${diferencia} horas.`;
            } else {
                return `Hace unos minutos.`;
            }
        }
    }
    // Modal Ofertas
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ displayBtnCrearOferta: '', show: true })
    }
    // verOferta = (objoferta) => {
    //     this.setState({ displayBtnCrearOferta: 'none', show: true })
    //     console.log(objoferta);
    //     // this.inputValorOferta.current.value=objoferta.ofer_precio_oferta;
    //     // this.inputComentarioOferta.current.value=objoferta.ofer_comentario;     
    // }
    CrearOferta = () => {
        let usuario = JSON.parse(localStorage.getItem('usuario-ecollect'));        
        let objoferta = {
            ofer_precio_oferta: this.inputValorOferta.current.value,
            ofer_comentario: this.inputComentarioOferta.current.value,
            ofer_fecha: new Date(),
            ofer_estado: 'a',
            usu_id: usuario.id,
            publi_id: this.props.match.params.publi_id
        };
        let headers = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objoferta)
        };
        fetch('https://backend-ecollect.herokuapp.com/api/oferta', headers)
            .then(response => {
                return response.json();
            })
            .then((data) => {                
                if (data.message === "created") {
                    this.BuscarOfertasByIdPublicacion(this.props.match.params.publi_id);                    
                    this.socket.emit('agregaroferta', { mensaje: 'se ha agregado una oferta' })
                    ToastsStore.success("Oferta creada con Exito !!!.")
                }
                else {
                    console.log('no se creo nada');
                    ToastsStore.error("No se creo la Oferta. Error !!!.")
                }
            }).catch((error) => {                
                ToastsStore.error("No se creo la Oferta. Error !!!.")
            });
        this.setState({ show: false });
    }

    CrearCita = () => {
        // Creando Cita
        let objcita = {
            cita_ubicacion: '',
            cita_fecha: new Date(),
            cita_estado: 'a',
            publi_id: this.props.match.params.publi_id,
            ofer_id: this.idoferta
        }
        let headers = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objcita)
        };
        fetch('https://backend-ecollect.herokuapp.com/api/cita', headers).then((respuesta) => {
            return respuesta.json();
        }).then((data) => {
            if (data.message === 'created') {
                // Modificar el estado de la publicacion(e=escogido)          
                fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/cambiarEstado/${this.props.match.params.publi_id}/e`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((resp2) => {
                    return resp2.json();
                }).then((data) => {
                    // ToastsStore.success("Publicacion Actualizada !!!.")
                    // console.log(data.message);
                });

                // Modificar el estado de la Oferta(e=elegido)
                fetch(`https://backend-ecollect.herokuapp.com/api/oferta/cambiarestado/${this.idoferta}/e`).then((resp3) => {
                    return resp3.json();
                }).then((data) => {
                    // ToastsStore.success("Oferta Actualizada !!!.")
                    // console.log(data.message);
                });
                this.BuscarPublicacionById(this.props.match.params.publi_id)                
                ToastsStore.success("Cita creada con Exito !!!.")      

            }else{
                ToastsStore.warning("No se creo la Cita !!!.")
                // this.setState({ openModalAceptOferta: false });
            }
            // Si todo es correcto Cerrar Modal            
            this.setState({ openModalAceptOferta: false });
            //Ir a Mis Ofertas
            // this.props.history.push("/")
                         
        });
    }

    AbrirModalAceptarOferta = async(ofer_id) => {
        // console.log('id oferta actual : '+this.state.idoferta);
        this.idoferta = await ofer_id;
        await this.setState({
            openModalAceptOferta: true            
        });
        // console.log('id oferta: '+this.idoferta);        
    }
    CerrarModalAceptarOferta = () => {
        this.setState({ openModalAceptOferta: false });
    }

    verificarEstadoOferta=(estado)=>{
        if(estado==='e'){
            return '';
        }else{
            return'none';
        }
    }
    verificarEstadoOPublicacion=(estado)=>{
        if(estado==='e'){
            return '';
        }else{
            return'none';
        }
    }

    render() {
        if (this.state.loadPublicacion) {
            // Cargar Direccion
            // this.direccionFromCoordinate(); 
            return (
                <React.Fragment>
                    {/* Card */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>

                        <Card style={{ width: '60rem' }}>
                            <Card.Header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <label style={{ fontWeight: 'bold', marginTop: 5 }}><Button style={{ marginRight: 10 }} onClick={() => { this.props.history.push("/publicaciones") }} variant="outline-info"><i class="fas fa-chevron-left"></i></Button> Publicado por : </label>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Avatar style={{ marginLeft: 10, marginRight: 5 }}>{this.objPublicacion.t_usuario.usu_nombre.charAt(0).toUpperCase()}</Avatar>
                                    <label style={{ marginTop: 5 }}>{this.objPublicacion.t_usuario.usu_nombre}</label>
                                </div>
                            </Card.Header>
                            <Image style={{ maxWidth: 700, maxHeight: 700, alignSelf: 'center' }} src={this.objPublicacion.t_fotos[0].fot_img} fluid />

                            <ListGroup.Item style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {/* Fecha */}
                                <div >
                                    <label style={{ fontWeight: 'bold', marginTop: 2 }}>Fecha : </label>
                                    <label style={{ marginLeft: 5 }}>{this.CalcularFechaPublicacion(this.objPublicacion.publi_fecha)}</label>
                                </div>
                                {/* Precio */}
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ fontWeight: 'bold', marginTop: 5 }}>Valor Base : </label>
                                    <h3><label style={{ marginLeft: 10 }}>S/.{this.objPublicacion.publi_preciobase}</label></h3>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ fontWeight: 'bold', marginTop: 5 }}>Descripción : </label>
                                    <label style={{ marginLeft: 30 }}>{this.objPublicacion.publi_descripcion}</label>
                                    <label style={{ fontWeight: 'bold', marginTop: 5 }}>Cantidad : </label>
                                    <label style={{ marginLeft: 30 }}>{this.objPublicacion.publi_cant}</label>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <label style={{ fontWeight: 'bold' }}>Ubicación : </label>
                                        <label style={{ marginLeft: 30 }}><i style={{ marginRight: 10 }} class="fas fa-map-marker-alt"></i>{this.state.direccionPublicacion}</label>
                                    </div>
                                </div>
                            </ListGroup.Item> 
                            {/* Mapa */}
                            <ListGroup.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="outline-secondary" onClick={() => { this.setState({ showModalMapa: true }) }}>Ver Mapa</Button>
                                    <Button style={{ display: this.state.displayBtnAnularPublicacion }} variant="primary">Anular Publicación</Button>
                                    <img style={{height:50,display:this.verificarEstadoOPublicacion(this.objPublicacion.publi_estado)}} src={require('./img/finalizado.png')}></img>
                                </div>
                            </ListGroup.Item>

                        </Card>

                        <div >
                            {/* Card de Ofertas */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Card style={{ width: '25rem', display: 'flex' }}>
                                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <label style={{ marginTop: 5 }}>OFERTAS <strong style={{ marginLeft: 10 }}>{this.state.objOfertas.length}</strong></label>
                                        <Button style={{ display: this.state.displayBtnOfertar }} variant="primary" onClick={this.handleShow}>Ofertar</Button>
                                    </Card.Header>
                                </Card>
                                {
                                    // Mapeando Ofertas
                                    this.state.objOfertas.map(oferta => {
                                        return (
                                            <Card key={oferta.ofer_id} style={{ width: '25rem' }}>
                                                {/* <label style={{ fontWeight: 'bold', margin: 10 }}>Publicado por : </label> */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Avatar style={{ margin: 10 }}>{oferta.t_usuario.usu_nombre.charAt(0).toUpperCase()}</Avatar>
                                                        <div style={{ alignSefl: 'center', display: 'flex', flexDirection: 'column' }}>
                                                            <label style={{ marginTop: 5 }}>{oferta.t_usuario.usu_nombre}</label>
                                                            <small>{this.CalcularFechaPublicacion(oferta.ofer_fecha)}</small>
                                                        </div>
                                                    </div>
                                                    {/* Raiting */}
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        {/* <small style={{ fontWeight: 'bold', margin: 10 }}> </small> */}
                                                        <i class="fas fa-star fa-2x" style={{ color: '#F8C301', margin: 10 }}></i>
                                                        <label style={{ marginRight: 10, margintop: 5 }}>{oferta.t_usuario.usu_calificacion}</label>
                                                    </div>
                                                </div>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >

                                                        {/* <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}> */}
                                                        <Typography >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div>
                                                                    <label style={{ fontWeight: 'bold', marginRight: 10 }}>Monto </label>
                                                                    <label><h4>S/. {oferta.ofer_precio_oferta}</h4></label>
                                                                </div>
                                                                {/* <label>Comentario</label> */}
                                                            </div>
                                                        </Typography>
                                                        {/* </ListGroup.Item> */}

                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>{oferta.ofer_comentario}</Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Button style={{ display: this.state.displayBtnAceptarOferta }} variant="primary" onClick={() => { this.AbrirModalAceptarOferta(oferta.ofer_id) }}>Aceptar Oferta</Button>
                                                    {/* <Button variant="primary" onClick={() => { this.verOferta(oferta) }}>Ver Oferta</Button> */}
                                                    <div style={{display:this.verificarEstadoOferta(oferta.ofer_estado)}}>
                                                        <i style={{color:'#018B41',marginRight:10}} class="far fa-check-circle fa-2x"></i>
                                                        <label>Oferta Aceptada</label>
                                                    </div>                                                    
                                                </ListGroup.Item>
                                            </Card>

                                        )
                                    })
                                }
                                {/* Lista de Ofertas */}

                            </div>

                        </div>

                    </div>



                    {/* Modal Para el Mapa */}
                    <Modal
                        show={this.state.showModalMapa}
                        onHide={() => { this.setState({ showModalMapa: false }) }}
                        dialogClassName="modal-200w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Ubicación
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ height: '30em' }}>
                            <Map google={this.props.google}
                                initialCenter={{ lat: +this.objPublicacion.publi_lat, lng: +this.objPublicacion.publi_lng }}
                                zoom={17}
                            >
                                <Marker
                                    title={'Publicacion.'}
                                    name={this.state.direccionPublicacion}
                                    position={{ lat: +this.objPublicacion.publi_lat, lng: +this.objPublicacion.publi_lng }} />
                            </Map>
                        </Modal.Body>
                    </Modal>

                    {/* Modal Oferta */}

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ofertar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Formulario */}
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Valor de La Oferta</Form.Label>
                                    <Form.Control ref={this.inputValorOferta} type="number" placeholder="Ejm. 10.00" />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Ingrese un Comentario</Form.Label>
                                    <Form.Control ref={this.inputComentarioOferta} as="textarea" rows="3" />
                                </Form.Group>
                            </Form>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ display: this.state.displayBtnCrearOferta }} variant="primary" onClick={this.CrearOferta}>
                                Ofertar
                                </Button>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Modal >
                    {/* Modal Aceptar Oferta */}

                    <Dialog
                        open={this.state.openModalAceptOferta}
                        onClose={this.CerrarModalAceptarOferta}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"¿Como deseas contactar con el Ofertante?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                                <Button style={{ marginRight: 10 }} onClick={() => { this.CrearCita() }} variant="outline-secondary">
                                    Ver Información
                            </Button>
                                <Button style={{ marginLeft: 10 }} onClick={() => { this.CerrarModalAceptarOferta() }} variant="outline-secondary">
                                    Enviar Mensaje
                            </Button>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={this.CerrarModalAceptarOferta} color="primary" autoFocus>
                                Cancelar
                        </Button>
                        </DialogActions>
                    </Dialog>



                    <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} timer={5000} store={ToastsStore} />
                </React.Fragment >

            )
        } else {
            return (<div className="pagination-center" ><Spinner style={{ marginTop: 50 }} animation="border" variant="secondary" /></div>)
        }
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E')
})(Publicacion);