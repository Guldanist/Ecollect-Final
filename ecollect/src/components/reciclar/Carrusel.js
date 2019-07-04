import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'


export default class Carrusel extends Component {

    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            categoria: [],
            index: 0,
            direction: null,
        }

    }

    componentDidMount() {
        fetch('https://backend-ecollect.herokuapp.com/api/categoria').then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                categoria: data.content,
            })
        })
    }

    handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction,
        });
        let nombre = this.state.categoria[selectedIndex].catprod_nombre;
        let id = this.state.categoria[selectedIndex].catprod_id;
        this.props.getNombreCategoria(nombre,id)
    }

    render() {
        const { index, direction } = this.state;
        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                interval={null}
                style={{display:'flex',alignItems:'center',alignContent:'center',width:400}}>

                {
                    this.state.categoria.map((cat, i) => {
                        // return (<CarruselItem categoria={cat} key={i} />)
                        return (<Carousel.Item key={i} >
                                    <img
                                    className="d-block"
                                    src={cat.catprod_foto}
                                    alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3 style={{color:'white'}}>{cat.catprod_nombre}</h3>
                                        <p>{cat.catprod_descripcion}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>)
                    })
                }

                
            </Carousel>
        )
    }
}
