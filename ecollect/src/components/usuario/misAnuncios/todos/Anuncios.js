import React, { Component } from 'react'
import './Anuncios.css';
import axios from 'axios';
var moment = require('moment');

export default class Anuncios extends Component {

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

    render() {
        let { anuncio } = this.props

        return (

            <React.Fragment>
                <div className="row m-4">
                    {/* col-lg-3 */}
                    {/* col-xs-12 col-sm-3 col-sm-push-9 */}
                    {/* container-fluid */}
                    <div className="wrapper  col-lg-3" style={{height:'100px'}}>
                        {/* <ImageA src={this.src}/>  */}
                        {/* <img class="img-responsive" src={'http://localhost:3700/api/getImagesByName/' + anuncio.t_fotos[0].fot_img} alt="" /> */}
                        <img class="img-responsive" src={anuncio.t_fotos[0].fot_img} alt="" />
                        {/* <img style="height: 200px; width: 100%; display: block;" src="" alt="Card image"> */}

                    </div>

                    <div className="col-lg-9">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active" style={{backgroundColor:'green', height:'100%'}}>
                            <div className="d-flex w-100 justify-content-between" >
                                <h5 className="mb-1">Descripción</h5>
                                <small>{this.publicationTime(anuncio.publi_fecha)}</small>
                            </div>
                            <p className="mb-1" style={{color:'white'}}>{anuncio.publi_descripcion}</p>
                            {/* Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit. */}
                            <small>{anuncio.publi_titu}</small>
                            {/* Donec id elit non mi porta. */}
                        </a>
                        {/* style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);" */}
                        {/* <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <button type="button" onClick={this.handleClickDelete} class="btn btn-outline-primary">Executed</button>


                            <button type="button" onClick={this.handleClick} class="btn btn-outline-primary">Marcar como Ejecutado</button>

                            <button type="button" className="btn btn-info">Setting</button>
                            <div className="btn-group" role="group">
                                <button id="btnGroupDrop3" type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop3" x-placement="bottom-start" >
                                    <a className="dropdown-item" href="#">Editar</a>
                                    <a className="dropdown-item" href="#">Finalizar</a>
                                </div>
                            </div>

                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
