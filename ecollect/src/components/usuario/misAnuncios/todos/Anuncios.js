import React, { Component } from 'react'
import './Anuncios.css';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'

import { withRouter } from 'react-router-dom';
var moment = require('moment');

class Anuncios extends Component {

    constructor(props) {
        super(props);

        // this.obtenerUsuario();
    }

    handleClick = (e) => {
        //console.log("Holy, I'm Button");
        // console.log(e);
        let { anuncio } = this.props
        //console.log(anuncio);

        // this.setState({
        //     publi_estado:'0',
        //     cargado:true
        // })
        // console.log(this.state);

        // , { publi_estado: 0 }
        axios.put(`https://backend-ecollect.herokuapp.com/api/publicacion/cambiarEstado/${anuncio.publi_id}/a`).then(res => {
            //console.log(res);

        })
    }

    publicationTime = (date) => {
        let dateThisMoment = moment(date);
        let dateNow = moment(new Date());
        let difference = dateNow.diff(dateThisMoment, 'día')
        if (difference > 0) {
            return ` ${difference} hace días`;
        } else {
            let difference = dateNow.diff(dateThisMoment, 'horas')
            if (difference > 0) {
                return `${difference} hace horas`;
            } else {
                return `hace algunos minutos`;
            }
        }

    }
    CalcularFechaPublicacion = (fecha) => {
        let fecha1 = moment(fecha);
        let hoy = moment(new Date());
        let diferencia = hoy.diff(fecha1, 'day')
        if (diferencia > 0) {
            return `Hace ${diferencia} días.`;
        } else {
            let diferencia = hoy.diff(fecha1, 'hours')
            if (diferencia > 0) {
                return `Hace ${diferencia} horas.`;
            } else {
                return `Hace unos minutos.`;
            }
        }
    }
    irAPublicacion = (idpublicacion) => {
        // console.log("idpublicacion "+idpublicacion);
        // console.log(this.props);        
        this.props.history.push(`/dashboard/publicacion/${idpublicacion}`);
    }


    render() {
        let { anuncio } = this.props
        // console.log(anuncio);

        return (

            <React.Fragment>
                <Card style={{ width: "100%" }}>
                    <Card.Body>
                        <Row>
                            <Col sm={12}>
                                <Card.Title> Publicación: #{anuncio.publi_id} </Card.Title>
                                <hr />
                                <Row>
                                    <Col md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Card.Img style={{ maxHeight: 200, marginBottom: 10 }} src={anuncio.t_fotos[0].fot_img} />
                                        <button className="btn btn-publicacion " onClick={() => {this.irAPublicacion(anuncio.publi_id)}}>Ver publicación</button>
                                    </Col>
                                    <Col md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Form.Label> <Form.Label style={{ fontWeight: 'bold', marginRight: 10 }}>Descripción:</Form.Label>{anuncio.publi_descripcion}</Form.Label>
                                        <Form.Label ><Form.Label style={{ fontWeight: 'bold', marginRight: 10 }}> Fecha de Publicación:</Form.Label> {this.CalcularFechaPublicacion(anuncio.publi_fecha)} </Form.Label>
                                        <Form.Label ><Form.Label style={{ fontWeight: 'bold', marginRight: 10 }}> Estado: </Form.Label>{anuncio.publi_estado == 'p' ?
                                            (<>Publicado <i class="fas fa-check-double"></i></>) : (<>Finalizada<i class="fas fa-check-circle"></i></>)}</Form.Label>
                                        {/* <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Teléfono: </Form.Label> {oferta.usu_telefono} </Form.Label>                                                     */}
                                    </Col>
                                </Row>                                
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </React.Fragment>
        )
    }
}

export default withRouter(Anuncios);