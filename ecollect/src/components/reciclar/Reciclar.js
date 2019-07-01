import React, { Component } from 'react'
import Carrusel from './Carrusel';
import Mapa from '../mapa/Mapa';


import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Snackbar from '@material-ui/core/Snackbar';


// Material
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ButtonMat from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class Reciclar extends Component {
    lista = ['Vigencia', 'Categoria', 'Producto', 'Ubicacion'];

    objReciclaje = {
        publi_lat: '',
        publi_lng: '',
        publi_estado: 'p',
        publi_fecha: '',
        usu_id: '',
        publi_tiempo_oferta: '',
        publi_cant: '',
        publi_descripcion: '',
        catpro_id: '',
        foto_img: '',
        publi_preciobase: ''
    }


    constructor(props) {
        super(props)
        this.state = {
            nombreCategoria: '',
            open: false,
            step: 0
        }

    }

    handleClick = () => {
        // setOpen(true);
        this.setState({ open: true });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // setOpen(false);
        this.setState({ open: false });
    }

    handleInputChange = (event) => {
        var sImagen;
        var image = event.target.files[0];
        var pattern = /image-*/;
        //var reader = new FileReader();
        if (!image.type.match(pattern)) {
            console.error('File is not an image');
            return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('imgReciclado').setAttribute('src', e.target.result);
            sImagen = e.target.result;
            this.objReciclaje.foto_img = sImagen;
        }
        reader.readAsDataURL(image);
    }

    obtenerCoord = (dataMapa) => {
        this.objReciclaje.publi_lat = '' + dataMapa.lat;
        this.objReciclaje.publi_lng = '' + dataMapa.lng;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let usuario = JSON.parse(localStorage.getItem('usuario-ecollect'));
        // Falta completar estos campos
        this.objReciclaje.publi_fecha = new Date();
        this.objReciclaje.usu_id = usuario.id;
        // 

        var myHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.objReciclaje)
        }
        console.log(this.objReciclaje);
        fetch('https://backend-ecollect.herokuapp.com/api/publicacion', myHeaders)
            .then(response => { return response.json(); })
            .then(data => {
                // console.log(data);
                this.handleClick();
            })
    }

    onChangeEstado = (e) => {
        this.objReciclaje.publi_estado = e.currentTarget.value;
    }

    onChangeTiempoOferta = (e) => {
        this.objReciclaje.publi_tiempo_oferta = e.target.value;
    }

    onChangeCant = (e) => {
        this.objReciclaje.publi_cant = e.target.value;
    }

    onChangePrecioBase = (e) => {
        this.objReciclaje.publi_preciobase = e.target.value;
    }

    onChangeDescripcion = (e) => {
        this.objReciclaje.publi_descripcion = e.target.value;
    }

    getNombreCategoria = (nombre, id) => {
        this.setState({
            nombreCategoria: nombre,
        });
        this.objReciclaje.catpro_id = id;
    }
    // Funciones de Step
    handleNext = () => {
        let valor = this.state.step + 1;
        this.setState({ step: valor });
        // setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    handleBack = () => {
        let valor = this.state.step - 1;
        this.setState({ step: valor });
        // setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    render() {
        const estilo = {
            card: {
                width: '100%',
                //height: '50rem',
                //position: 'absolute'
            },
            img: {
                height: '65%',
                width: '80%',
                //position: 'absolute'

            },
            tabs: {
                width: '100%',
                height: '100%',
                //position: 'absolute'
                // overflowY:'scroll'
            }

        }
        return (
            <React.Fragment>
                {/* Creando Stepers */}
                <div >
                    <Stepper activeStep={this.state.step} orientation="vertical">
                        {/* {this.lista.map((label, index) => ( */}
                        {/* step 1 */}
                        <Step >
                            <StepLabel >{this.lista[0]}</StepLabel>
                            <StepContent>
                                <div className="col-md-6 mb-5">
                                    <label htmlFor="inTiempoVigencia" className="col-form-label">Tiempo Vigencia</label>
                                    <select className="custom-select" id="inTiempoVigencia" onChange={this.onChangeTiempoOferta} required >
                                        <option >Selecciona aqui</option>
                                        <option value="7">1 semana</option>
                                        <option value="14">2 semanas</option>
                                        <option value="30">1 mes</option>
                                        <option value="60">2 meses</option>
                                    </select>
                                </div>
                                {/* <Typography>Contenido  aqui</Typography> */}

                                {/* Botones */}
                                <div >
                                    <div>
                                        <ButtonMat
                                            disabled={this.state.step === 0}
                                            onClick={this.handleBack}
                                        >
                                            Atras
                                            </ButtonMat>

                                        <ButtonMat
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                        >
                                            {this.state.step === this.lista.length - 1 ? 'Finalizar' : 'Siguiente'}
                                        </ButtonMat>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                        {/* step 2 */}
                        <Step >
                            <StepLabel>{this.lista[1]}</StepLabel>
                            <StepContent>
                                <div className='mb-5'>
                                    <Carrusel getNombreCategoria={this.getNombreCategoria} />
                                </div>
                                {/* <Typography>Contenido  aqui</Typography> */}
                                <div >
                                    <div>
                                        <ButtonMat
                                            disabled={this.state.step === 0}
                                            onClick={this.handleBack}
                                        >
                                            Atras
                                            </ButtonMat>

                                        <ButtonMat
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                        >
                                            {this.state.step === this.lista.length - 1 ? 'Finalizar' : 'Siguiente'}
                                        </ButtonMat>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                        {/* step 3 */}
                        <Step >
                            <StepLabel>{this.lista[2]}</StepLabel>
                            <StepContent>
                                <div className="row mb-2">
                                    <div className='col-md6'>
                                        <label htmlFor="inDescripcion" className="col-form-label">Descripcion</label>
                                        <input type="text" className="form-control" placeholder="Ejem.: Envases de vidrio" id="inDescripcion"
                                            onChange={this.onChangeDescripcion} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-4">
                                        <label htmlFor="inCantidad" className="col-form-label">Cantidad</label>
                                        <input type="number" className="form-control" placeholder="Ejem.: 20" id="inCantidad"
                                            onChange={this.onChangeCant} />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inPrecioBase" className="col-form-label">Precio Base S/.</label>
                                        <input type="number" className="form-control" placeholder="5" id="inPrecioBase"
                                            onChange={this.onChangePrecioBase} />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inDeseo" className="col-form-label">Deseo</label>
                                        <select className="custom-select">
                                            <option >Selecciona aqui</option>
                                            <option value="1">Darlo</option>
                                            <option value="2">Venderlo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-5'>
                                    <img alt="" id="imgReciclado" style={estilo.img} />
                                    <br />
                                    <input type="file" accept="image/*" name="image" onChange={this.handleInputChange} />
                                </div>
                                {/* <Typography>Contenido  aqui</Typography> */}

                                <div >
                                    <div>
                                        <ButtonMat
                                            disabled={this.state.step === 0}
                                            onClick={this.handleBack}
                                        >
                                            Atras
                                            </ButtonMat>

                                        <ButtonMat
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                        >
                                            {this.state.step === this.lista.length - 1 ? 'Finalizar' : 'Siguiente'}
                                        </ButtonMat>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                        {/* step 4 */}
                        <Step >
                            <StepLabel>{this.lista[3]}</StepLabel>
                            <StepContent>

                                <div className='row mb-5'>
                                    <div className='col-md-12' style={{height: 350}}>
                                        <Mapa enviarCoord={this.obtenerCoord} />
                                    </div>
                                </div>
                                {/* <Typography>Contenido  aqui</Typography> */}
                                <div >
                                    <div>
                                        <ButtonMat
                                            disabled={this.state.step === 0}
                                            onClick={this.handleBack}
                                        >
                                            Atras
                                            </ButtonMat>

                                        <ButtonMat
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                        >
                                            {this.state.step === this.lista.length - 1 ? 'Finalizar' : 'Siguiente'}
                                        </ButtonMat>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                        {/* // ))} */}
                    </Stepper>
                    {this.state.step === this.lista.length && (
                        <div >
                            <Paper square elevation={0}>
                                <Typography style={{ paddingLeft: 20 }}>Ha completado todos los datos para realizar una publicacion.</Typography>
                                <ButtonMat style={{ paddingLeft: 20, margin: 10 }} onClick={this.handleSubmit}>
                                    Publicar
                            </ButtonMat>
                                <ButtonMat style={{ paddingLeft: 20, margin: 10 }} onClick={() => { this.props.history.push("/publicaciones")}}>
                                    Cancelar
                            </ButtonMat>
                            </Paper>
                        </div>
                    )}
                </div>

                {/* stepers */}




                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                    <Container>
                        <Row>
                            <Col>

                                <div className="card mb-3" style={estilo.card}>
                                    <div className="card-header">Reciclar</div>
                                    <div className="card-body">
                                        <h4 className="card-title">Publica tu Reciclaje</h4>

                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="inTiempoVigencia" className="col-form-label">Tiempo Vigencia</label>
                                                <select className="custom-select" id="inTiempoVigencia" onChange={this.onChangeTiempoOferta} required >
                                                    <option >Selecciona aqui</option>
                                                    <option value="1 semana">1 semana</option>
                                                    <option value="2 semanas">2 semanas</option>
                                                    <option value="1 mes">1 mes</option>
                                                    <option value="2 meses">2 meses</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inEstado" className="col-form-label">Estado</label>
                                                <div className="form-check">
                                                    <label className="form-check-label mr-5">
                                                        <input name="optionsRadios" className="form-check-input" id="optionsRadios1" type="radio" defaultChecked value="p" 
                                                            onChange={this.onChangeEstado}/>
                                                        Activo
                                                    </label>
                                                    <label className="form-check-label">
                                                        <input name="optionsRadios" className="form-check-input" id="optionsRadios2" type="radio" value="a"
                                                            onChange={this.onChangeEstado} />
                                                        No Activo
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                            <Row>
                                                <Col sm={3}>
                                                    <Nav variant="pills" className="flex-column">
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="first">Categoria</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="second">Producto</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Col>
                                                <Col sm={9}>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">
                                                            <Carrusel getNombreCategoria={this.getNombreCategoria} />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="second">

                                                            <label htmlFor="inDescripcion" className="col-form-label">Descripcion</label>
                                                            <input type="text" className="form-control" placeholder="Ejem.: Envases de vidrio" id="inDescripcion"
                                                                onChange={this.onChangeDescripcion} />

                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label htmlFor="inCantidad" className="col-form-label">Cantidad</label>
                                                                    <input type="number" className="form-control" placeholder="Ejem.: 20" id="inCantidad"
                                                                        onChange={this.onChangeCant} />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label htmlFor="inPrecioBase" className="col-form-label">Precio Base S/.</label>
                                                                    <input type="number" className="form-control" placeholder="5" id="inPrecioBase"
                                                                        onChange={this.onChangePrecioBase} />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label htmlFor="inDeseo" className="col-form-label">Deseo</label>
                                                                    <select className="custom-select">
                                                                        <option >Selecciona aqui</option>
                                                                        <option value="1">Darlo</option>
                                                                        <option value="2">Venderlo</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <br />

                                                            <img alt="" id="imgReciclado" style={estilo.img} />
                                                            <br />
                                                            <input type="file" accept="image/*" name="image" onChange={this.handleInputChange} />

                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>




                                    </div>

                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#categoria">Categoria</a></li>
                                        <li className="breadcrumb-item active">{this.state.nombreCategoria}</li>
                                    </ol>

                                </div>

                            </Col>

                        </Row>



                        <Row>
                            <Col style={{ height: 450 }}>
                                <Mapa enviarCoord={this.obtenerCoord} />
                            </Col>
                        </Row>



                        <Row style={{ marginTop: 25 }}>
                            <Col>
                                <button type="submit" className="btn btn-primary">Publicar</button>
                                <button className="btn btn-danger" type="button">Cancelar</button>
                            </Col>
                        </Row>
                    </Container>



                </form>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Se registró su Publicación exitosamente.</span>}

                />

            </React.Fragment>

        )
    }
}
