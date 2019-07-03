import React, { Component } from 'react';
import './../index.css'

export default class Pilares extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container pilares text-center justify-content-center mb-5">
                    <h2 className="subir mb-3">Elígenos por estas razones</h2>

                    <div className="row">
                        <div className="col-md-4 justify-content-center">
                            <div className="p-card">
                                <div className="card-body">
                                    <div id="pilar1" className="card-body-img"></div>
                                    <p className="p-card-text mt-2">Recoleccion de residuos</p>
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-4 justify-content-center">
                            <div className="p-card" >
                                <div className="card-body">
                                    <div id="pilar2" className="card-body-img"></div>
                                    <p className="p-card-text mt-2">Seguridad</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 justify-content-center">
                            <div className="p-card" >
                                <div className="card-body">
                                    <div id="pilar3" className="card-body-img"></div>
                                    <p className="p-card-text mt-2">Calidad</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
