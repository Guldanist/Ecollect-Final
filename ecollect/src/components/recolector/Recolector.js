import React, { Component } from 'react'

import {BrowserRouter,Switch,Route } from 'react-router-dom';
// Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Spinner from 'react-bootstrap/Spinner'

import './Recolector.css';
import Pagination from "react-js-pagination";
var moment = require('moment')



export default class Recolector extends Component {

  itemsCountPerPage = 12;
  totalItemsCount = 0
  pageRangeDisplayed = 10;
  cambioDatos=false;

  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      loadCategorias: false,
      publicaciones: [],
      loadPublicaciones: false,
      paginador: {
        activePage: 1
      }
    }
    this.selectorCategorias = React.createRef();
    this.inputBusqueda = React.createRef();

  }
  async componentDidMount() {
    await this.getCategorias();
    await this.getPublicaciones();
    // await this.setTotalRegistros();
    // await this.BuscarPublicacionFiltro();
  }

  getCategorias = () => {
    // Obteniendo Categorias    
    fetch('https://backend-ecollect.herokuapp.com/api/categoria').then((respuesta) => {
      return respuesta.json();
    }).then((data) => {
      if (data.content.length > 0) {
        this.setState({
          loadCategorias: true,
          categorias: data.content
        });
      }

    });
  }
  setTotalRegistros = () => {
    fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/count/${'p'}`).then((respuesta) => {
      return respuesta.json();
    }).then((data) => {
      if (data.count) {
        this.totalItemsCount = data.count;
      }
    });
  }

  getPublicaciones = async () => {
    await this.setTotalRegistros();
    // Obtener el total de items en base de datos
    // console.log(this.state.paginador.totalItemsCount);

    // Obteniendo Las publicaciones
    // fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/${'p'} `).then((respuesta) => {

    let url = '';
    fetch(`https://backend-ecollect.herokuapp.com/api/publicacion/${'p'}/${this.itemsCountPerPage}/${this.state.paginador.activePage}`).then((respuesta) => {
      return respuesta.json();
    }).then((data) => {
      if (data.content.length > 0) {
        this.setState({
          publicaciones: data.content,
          loadPublicaciones: true
        });
      }
    });
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



  BuscarPublicacionFiltro = async() => {
    await this.setTotalRegistros();
    let url = "";
    if(this.cambioDatos){
      this.cambioDatos=false;
      await this.setState({
        paginador: {
          activePage: 1
        }
      });
    }
    if (this.selectorCategorias.current.value > 0 && this.inputBusqueda.current.value !== "") {
      // console.log('Buuscar por categoria y nombre');      
      url = `https://backend-ecollect.herokuapp.com/api/publicacion/buscarByNombreyCatProd/${this.inputBusqueda.current.value}/${this.selectorCategorias.current.value}/${'p'}/${this.itemsCountPerPage}/${this.state.paginador.activePage}`;
    } else {
      if (this.selectorCategorias.current.value == 0 && this.inputBusqueda.current.value == "") {
        // console.log('Buscar todos');
        url = `https://backend-ecollect.herokuapp.com/api/publicacion/${'p'}/${this.itemsCountPerPage}/${this.state.paginador.activePage}`;
      }
      else {
        if (this.selectorCategorias.current.value > 0) {
          // console.log('Buscar  solo por categoria');
          url = `https://backend-ecollect.herokuapp.com/api/publicacion/buscarByIdCatProd/${this.selectorCategorias.current.value}/${'p'}/${this.itemsCountPerPage}/${this.state.paginador.activePage}`;          

        } else {
          // console.log('Buscar solo por nombre');
          url = `https://backend-ecollect.herokuapp.com/api/publicacion/buscarByNombre/${this.inputBusqueda.current.value}/${'p'}/${this.itemsCountPerPage}/${this.state.paginador.activePage}`;
        }
      }
    }
    // Consumir la api de acuerdo a la seleccion
    // console.log(url);
    fetch(url).then((respuesta) => {
      return respuesta.json();
    }).then((data) => {
      if (data) {
        this.totalItemsCount = data.count;
        this.setState({
          publicaciones: data.content
        })
      }
    });
  }

  CambioPagina = async (pageNumber) => {
    // console.log(this.state);
    if (pageNumber) {
      await this.setState({
        paginador: {
          activePage: pageNumber
        }
      });
      // traer data
      this.BuscarPublicacionFiltro();
    }
  }

  agregarPublicacion=()=>{
    console.log('Abrir formulario Crear Publicacion');
    this.props.history.push(`${this.props.match.url}/reciclar`)    
  }
  irAPublicacion=(idpublicacion)=>{
    this.props.history.replace(`${this.props.match.url}/Publicacion/${idpublicacion}`);
  }
  ReiniciarActivePage=(event)=>{
    this.cambioDatos=true;    
  }
  render() {

    if (this.state.loadCategorias && this.state.loadPublicaciones) {
      return (
        <div className="contenedor-recolector ">
          <div class="row justify-content-center header-recolector">
            {/* dropdownlist categorias */}
            <div class="">
              <select ref={this.selectorCategorias} onChange={this.ReiniciarActivePage} class=" form-control form-control-md form-control-borderless">
                <option value='0'>Categoria</option>
                {/* Mapeando Categorias */}
                {
                  this.state.categorias.map(elem => {
                    return (<option value={elem.catprod_id}>{elem.catprod_nombre}</option>)
                  })
                }
              </select>
            </div>
            {/* Barra de busqueda */}
            <div class="col-8 col-md-7 col-lg-6">
              <div class="card-body row no-gutters align-items-center ">  
                  <i class="fas fa-search h4 text-body mr-2 mt-2"></i>
                  <input style={{minWidth:150,width:300}} ref={this.inputBusqueda} onChange={this.ReiniciarActivePage} class="form-control form-control-md form-control-borderless" type="search" placeholder="Busqueda" />
                  <button class="btn btn-md ml-2 mt-2 btn-publicacion" type="submit" onClick={this.BuscarPublicacionFiltro}>Buscar</button>
                
              </div>
            </div>
          </div>
          <hr class="my-1" />


          <div className="contenedorcards">
            {/* cards1 */}
            {
              this.state.publicaciones.map(publi => {
                // console.log(publi);                
                // let imagen;
                // imagen=this.TraerImagen(publi.publi_id)
                return (
                  <div class="card" key={publi.publi_id}>
                    {/* <img src="https://www.sctech.edu/wp-content/plugins/ajax-search-pro/img/default.jpg" alt="" /> */}
                    <img className="imagen-publicacion" src={publi.t_fotos[0].fot_img} alt="" />
                    <div class="card-footer text-muted" >
                      {/* <h5 className="text-dark">Titulo de la Publicación..</h5> */}
                      <div className="footer-precio" >
                        <h4 className="mt-2 mb-2" >S/. {publi.publi_preciobase}</h4>
                      </div>
                      <div className="flex-card-footer">
                        <span >{this.CalcularFechaPublicacion(publi.publi_fecha)}</span>
                        <button className='btn btn-publicacion'   onClick={()=>{this.irAPublicacion(publi.publi_id)}}>Ver</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
          <hr class="my-4" />

          {/* Paginador Inferior */}
          <div className="pagination-center">
            <Pagination
              innerClass="pagination"
              activeClass="pagination-active"
              itemClass="pagination-item"
              activePage={this.state.paginador.activePage}
              itemsCountPerPage={this.itemsCountPerPage}
              totalItemsCount={this.totalItemsCount}
              pageRangeDisplayed={this.pageRangeDisplayed}
              onChange={this.CambioPagina}
            />
          </div>

          {/* Boton flotante Agregar */}
          <Fab id="btnflotantePublicacion" color="primary" aria-label="Add" style={{position:"fixed",bottom:'50px',right:'50px'}} onClick={this.agregarPublicacion}>
            <AddIcon />
          </Fab>

        </div>
      )
    } else {
      return (<div className="pagination-center" ><Spinner style={{marginTop:50, color:'green' }} animation="border" variant="secondary" /></div>)
    }

  }
}
