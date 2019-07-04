import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'

var moment = require('moment')
export default class MisOfertas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ofertas: [{}],
            load:false
        }
        this.idActual = JSON.parse(localStorage.getItem('usuario-ecollect')).id;
    }

    componentDidMount() {
        fetch(`https://backend-ecollect.herokuapp.com/api/oferta/misofertas/${this.idActual}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.content);
                this.setState({
                    ofertas: data.content,
                    load:true
                });
            });
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
        this.props.history.replace(`/dashboard/publicacion/${idpublicacion}`);
    }

    render() {
        if(this.state.load){
            return (
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{width:'70%',height:50,backgroundColor:'#00B96E',display:'flex'}}>
                                    <h3 style={{marginLeft:10,color:'white',alignSelf:'center',fontWeight:'300'}}>Mis Ofertas</h3>                                    
                                </div>
                    {this.state.ofertas.map((oferta) => {
                        return (
                            
                                
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <Row>
                                        <Col sm={9}>
                                            <Card.Title> Publicación: #{oferta.publi_id} </Card.Title>
                                            <hr />
                                            <Row>
                                                <Col md={6} style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                                    <Card.Img style={{maxHeight:200,marginBottom:10}} src={oferta.publi_foto} />
                                                    <button className="btn btn-publicacion " onClick={() => { this.irAPublicacion(oferta.publi_id) }}>Ver publicación</button>
                                                </Col>
                                                <Col md={6} style={{display:'flex',flexDirection:'column'}}>
                                                    <Form.Label> <Form.Label style={{fontWeight:'bold',marginRight:10}}>Publicado Por:</Form.Label>{oferta.usu_nombre}</Form.Label> 
                                                    <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Fecha de Publicación:</Form.Label> {this.CalcularFechaPublicacion(oferta.publi_fecha)} </Form.Label>
                                                    <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Estado: </Form.Label>{oferta.publi_estado=='p'?
                                                    (<>Publicado <i class="fas fa-check-double"></i></>):(<>Finalizada<i class="fas fa-check-circle"></i></>)}</Form.Label>                                                    
                                                    <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Teléfono: </Form.Label> {oferta.usu_telefono} </Form.Label>                                                    
                                                </Col>
                                            </Row>                                      
                                        </Col>
                                        <Col sm={3}>
                                            <Card.Title>Oferta</Card.Title>
                                            <hr />
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                            <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Fecha: </Form.Label>{this.CalcularFechaPublicacion(oferta.ofer_fecha)} </Form.Label>
                                            <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Monto de Oferta:</Form.Label> S/.{oferta.ofer_precio_oferta} </Form.Label>
                                            <Form.Label ><Form.Label style={{fontWeight:'bold',marginRight:10}}> Estado: </Form.Label>{oferta.ofer_estado=='a'?(<>Activa <i class="far fa-clock"></i></>):(<> Aceptada <i class="fas fa-check"></i></>)} </Form.Label>
                                            </div>                                            
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>                            
                        );
                    })}
                </div>
            )
        }else
        {
            return(<div className="pagination-center" ><Spinner style={{marginTop:50, color:'green' }} animation="border" variant="secondary" /></div>)
        }
        
    }
}