import React, { Component } from 'react'

export default class Comentarios extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="container comentarios mt-5">
                    <h2 class="text-center font-dark font-sub f-weight">Lo que dicen de nosotros</h2>
                    <div class="row rcomentarios">
                        <div class="col-md-4">
                        <div class="comentsall">
                        <p>Esta aplicación me ayudo a ver que varias cosas que botaba al tacho y
                            podian reciclarse y sin embargo yo no lo hacia porque no sabia donde llevar estos objetos.</p>
                        
                        </div>
                        <div class="usuarios">
                        <div class="testimonial">
                        </div>
                        <div class="user-name font-bold ">
                            <h4>Camila Barrientos Chang</h4>
                        </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="comentsall">
                        <p>Con esta aplicación se me ha hecho mucho mas facil hacer mis recorridos por la ciudad recolectando
                            cosas reciclables ya que antes solia andar sin rumbo hasta encontrar a alguien que quiera darme
                            sus objetos reciclables.</p>
                        </div>
                        <div class="usuarios">
                        <div class="testimonial2">
                        </div>
                        <div class="user-name font-bold ">
                            <h4>Luis Torres Rodriguez</h4>
                        </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="comentsall">
                        <p>De haber sabido que podía ganar dinero reciclando de una manera tan fácil hubiera empezado mucho antes,
                            ya que consumo bastantes productos cuyos envases son reciclables.</p>
                        
                        </div>
                        <div class="usuarios">
                        <div class="testimonial3">
                        </div>
                        <div class="user-name font-bold ">
                            <h4>Jorge Dávila Malpeca</h4>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
