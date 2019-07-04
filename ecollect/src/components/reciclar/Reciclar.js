import React, { Component } from 'react'
import Carrusel from './Carrusel';
import Mapa from '../mapa/Mapa';
// Material
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ButtonMat from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            step: 0,
            categoria: [],
            loadCategoria: false
        }
        this.selecCategoria = React.createRef();
    }
    componentDidMount = async () => {
        await this.optenerCategorias();
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
        var myHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.objReciclaje)
        }
        // console.log(this.objReciclaje);
        fetch('https://backend-ecollect.herokuapp.com/api/publicacion', myHeaders)
            .then(response => { return response.json(); })
            .then(data => {
                if (data.message === 'created') {
                    this.mostrarTostadaExito();
                    setTimeout(() => {
                        // Redireccionar  a Publicaciones despues de  2 segundos
                        this.props.history.push("/dashboard");
                    }, 3000);
                } else {
                    this.mostrarTostadaFallida();
                }
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
    onChangeCategoria = (e) => {
        // console.log(e.target.value);   
        this.objReciclaje.catpro_id = e.target.value;
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

    optenerCategorias = () => {
        fetch('https://backend-ecollect.herokuapp.com/api/categoria').then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                categoria: data.content,
                loadCategoria: true
            })
        })
    }

    mostrarTostadaExito = () => {
        toast.success('La Publicacion de guardo correctamente!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
        })
    }

    mostrarTostadaFallida = () => {
        toast.error('Ocurrio un error al crear la Publicacion!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
        })
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
            <React.Fragment >
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable={false}
                    pauseOnHover={false}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '70%', height: 50, backgroundColor: '#00B96E', display: 'flex', marginBottom: 10 }}>
                        <h3 style={{ marginLeft: 10, color: 'white', alignSelf: 'center', fontWeight: '300' }}>Nueva Publicación</h3>
                    </div>
                    {/* Creando Stepers */}
                    <div style={{ width: '60rem' }}>
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
                                                className='btn-publicacion'
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
                                    <div className='mb-5' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                        {/* {
                                            this.state.loadCategoria ? (
                                                <div>
                                                    <select ref={this.selecCategoria} class="custom-select" onChange={this.onChangeCategoria}>
                                                        <option value='0'>Categoria</option>
                                                        
                                                        {
                                                            this.state.categoria.map(elem => {
                                                                return (<option value={elem.catprod_id}>{elem.catprod_nombre}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>) : (<>Cargando</>)
                                        } */}
                                        <Carrusel style={{height:'30%'}} getNombreCategoria = {this.getNombreCategoria} />
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
                                                className='btn-publicacion'
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
                                <StepContent >
                                    <div className="row mb-2 ml-4">
                                        <div className='col-md-8'>
                                            <label htmlFor="inDescripcion" className="">Descripción</label>
                                            <input style={{ backgroundColor: 'white', border: '1px solid #AAAAAA' }} type="text" className="form-control" placeholder="Ejem.: Envases de vidrio" id="inDescripcion"
                                                onChange={this.onChangeDescripcion} />
                                        </div>
                                    </div>
                                    <div className="row  ml-4">
                                        <div className="col-md-4">
                                            <label htmlFor="inCantidad">Cantidad</label>
                                            <input style={{ backgroundColor: 'white', border: '1px solid #AAAAAA' }} type="number" className="form-control" placeholder="Ejem.: 20" id="inCantidad"
                                                onChange={this.onChangeCant} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inPrecioBase" className="col-form-label">Precio Base S/.</label>
                                            <input style={{ backgroundColor: 'white', border: '1px solid #AAAAAA' }} type="number" className="form-control" placeholder="5" id="inPrecioBase"
                                                onChange={this.onChangePrecioBase} />
                                        </div>
                                        {/* <div className="col-md-4">
                                        <label htmlFor="inDeseo" className="col-form-label">Deseo</label>
                                        <select className="custom-select">
                                            <option >Selecciona aqui</option>
                                            <option value="1">Darlo</option>
                                            <option value="2">Venderlo</option>
                                        </select>
                                    </div> */}
                                    </div>
                                    <div className='row mb-5  ml-4' >
                                        <div className='col-md-8' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img style={{ maxWidth: 300, maxHeight: 300 }} alt="" id="imgReciclado" />
                                            <br />
                                            <label htmlFor="miImagen" className="btn btn-block btn-publicacion-secondary">Haga click para insertar foto de su producto</label>
                                            <input id="miImagen" type="file" accept="image/*" name="image" style={{
                                                width: "0.1px",
                                                height: "0.1px",
                                                opacity: "0",
                                                overflow: "hidden",
                                                position: "absolute",
                                                zIndex: "-1",}} capture="camera" onChange={this.handleInputChange} />
                                        </div>
                                    </div>



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
                                                className='btn-publicacion'
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
                                        <div className='col-md-12' style={{ height: 350 }}>
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
                                                className='btn-publicacion'
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
                                    <ButtonMat style={{ paddingLeft: 20, margin: 10 }} onClick={() => { this.props.history.push("/dashboard") }}>
                                        Cancelar
                            </ButtonMat>
                                </Paper>
                            </div>
                        )}
                    </div>
                </div>
                {/* stepers */}
            </React.Fragment>

        )
    }
}
