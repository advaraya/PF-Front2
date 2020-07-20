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
import actualizarAd from "./../../services/ServicioActualizarAd";

class ActualizarAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IdAnuncio: props.match.params.IdAnuncio,
      result: {},
    };
  }

  async componentDidMount() {
    await this.actualizarAd();
  }

  // Hacer lo mismo que en detalle anuncio, traerme el anuncio.
  // Crear un formulario con los datos del anuncio
  //que no se me olvide ponerle id del anuncio

  async actualizarAd(IdAnuncio) {
    // var miCookie = localStorage.getItem("cookie-login");
    //if (miCookie === undefined) {
    //  alert("Oooop looks like you are not logged");
    // } else {
    let anuncioResponse;
    try {
      anuncioResponse = await actualizarAd(this.state.IdAnuncio);

      if (anuncioResponse.data) {
        this.setState({
          IdAnuncio: this.state.IdAnuncio,
          result: anuncioResponse.data.result,
        });
      }
    } catch (error) {
      alert("Oooop something whent wrong");
    }
    //}
  }

  render() {
    return (
      <div className="container">
        <h1>Update Ad</h1>
        <div className="row">
          <p>Name of the Ad:{anuncio.nombre}</p>
        </div>
        <div className="row">
          <p>Description:{anuncio.descripcion}</p>
        </div>
        <div className="row">
          <p>Action:{anuncio.venta}</p>
        </div>
        <div className="row">
          <p>Price:{anuncio.precio}</p>
        </div>
        <div className="row">
          <p>Photo:{anuncio.foto}</p>
        </div>
        <div className="row">
          <p>Tags:{anuncio.tags}</p>
        </div>

        <button
          type="submit"
          className="btn_1 rounded full-width add_top_30"
          value="Submit"
        >
          Actualizar datos
        </button>
      </div>
    );
  }
}
export default ActualizarAd;
