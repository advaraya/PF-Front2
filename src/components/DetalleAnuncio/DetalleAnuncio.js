import React from "react";
import { render } from "@testing-library/react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import getDetalleAnuncio from "../../services/ServicioDetalleAnuncio.js";
import CompartirPost from "../CompartirPost/CompartirPost";

class Ad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlAnuncio: props.match.params.urlAnuncio,
      result: {
        /*
        tags: ["lifestyle"],
        _id: "5d3a0a5f9bd7ed2ece463ab4",
        name: "PS4Pro",
        description: "Compro PS4 Pro con menos de 1 año de uso",
        price: 200.99,
        type: "buy",
        photo: "/images/anuncios/ps4pro.jpg",
        __v: 0,
        createdAt: "2019-07-25T20:00:31.944Z",
        updatedAt: "2019-07-25T20:00:31.945Z",
        username:"Tengo que meterlo en node",
        */
      },
    };
  }
  async componentDidMount() {
    await this.adDetail();
  }

  async adDetail() {
    /*var miCookie = localStorage.getItem("cookie-login");
    if (miCookie === undefined) {
      alert("Oooop looks like you are not logged");
    } else {*/
    let anunciosDetalle;
    try {
      anunciosDetalle = await getDetalleAnuncio(this.state.urlAnuncio);
    } catch (error) {}
    if (anunciosDetalle.data.result) {
      console.log(anunciosDetalle.data);
      this.setState({
        urlAnuncio: this.state.urlAnuncio,
        result: anunciosDetalle.data.result,
      });
    }

    console.log(this.state);
    //}
  }
  render() {
    return (
      <div>
        <div className="container-DetallAd">
          <div className="row">
            <div className="col-6">
              <h2>NOMBRE DEL PRODUCTO: {this.state.result.nombre}</h2>
              <p>DESCRIPCIÓN: {this.state.result.descripcion}</p>
              <p>PRECIO: {this.state.result.precio} €</p>
              <p>TIPO: {this.state.result.venta}</p>
              <p>Autor: {this.state.result.username}</p>
              <p>
                TAGS:
                <span className="badge badge-pill badge-success">
                  {this.state.result.tags}
                </span>
              </p>
            </div>
            <div className="col-6">
              <figure className="figure">
                <img src={this.state.result.foto} className="img-fluid" />
              </figure>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <Link to="/listing">Volver al listado de anuncios</Link>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <CompartirPost
            urlAnuncio={this.state.urlAnuncio}
            nombreAnuncio={this.state.result.name}
            descripcionAnuncio={this.state.result.description}
          />
        </div>
      </div>
    );
  }
}

export default Ad;
