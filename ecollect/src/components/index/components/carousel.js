import React, { Component } from 'react';
import './../index.css'

export default class Carousel extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="impacto">
                    <h2 class="text-center font-dark f-weight font-sub">Queremos tener un gran impacto en la población</h2>
                    <div id="carouselExampleIndicators" class="carousel slide c1-contenido " data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner " >
                            <div class="carousel-item  active " >
                                <div class="container c1-cont " style={{border:'1px solid #CACACA',borderRadius:10}}>
                                    <div class=" row ">
                                        <div class=" col-md-6 justify-content-center ">
                                            <div id="carruselImg1" class="carousel-img" ></div>
                                        </div>
                                        <div class=" col-md-6 justify-content-center text-justify">
                                            {/* CONTENIDO 1 */}
                                            <br />
                                            <h1 style={{color:'#1DB954',alignSelf:'center'}}>¿Qué es Ecollect?</h1>
                                            <br />
                                            <p style={{padding:20,color:'#1C1C1C'}}>Es una aplicacion que facilita la recogida de productos reciclables de diferentes
                                                hogares, ademas de dar un intercambio monetario para las personas que quieran
                                                reciclar en sus hogares.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item ">
                                <div class="container c1-cont" style={{border:'1px solid #CACACA',borderRadius:10}}>
                                    <div class="row ">
                                        <div class=" col-md-6 justify-content-center ">
                                            <div id="carruselImg2" className="carousel-img"></div>
                                        </div>
                                        <div class=" col-md-6 justify-content-center text-justify">
                                            {/* CONTENIDO 2 */}
                                            <br />
                                            <h1 style={{color:'#1DB954'}}>¿Por qué elegirnos?</h1>
                                            <br />
                                            <p style={{padding:20,color:'#1C1C1C'}}>Porque te ofrecemos un servicio de calidad con el cual tú podras ayudar al planeta mediante el reciclaje y ademas
                                                facilitamos la labor de los que recolectan este tipo de residuos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item ">
                                <div class="container c1-cont" style={{border:'1px solid #CACACA',borderRadius:10}}>

                                    <div class="row ">
                                        <div class=" col-md-6 justify-content-center ">
                                            <div id="carruselImg3" className="carousel-img" ></div>
                                        </div>
                                        <div class=" col-md-6 justify-content-center text-justify">
                                            {/* CONTENIDO 3 */}
                                            <br />
                                            <h1 style={{color:'#1DB954'}}>¿Qué gano yo usando ecollect?</h1>
                                            <br />
                                            <p style={{padding:20,color:'#1C1C1C'}}>La oportunidad de ganar dinero al reciclar y ayudar al planeta, ademas de ofrecerte ser
                                                parte de los muchos recolectores que reunen este tipo de residuos para su posterior
                                                entrega y tratamiento para reutilizarse.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true" ></span>
                            <span class="sr-only" >Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}
