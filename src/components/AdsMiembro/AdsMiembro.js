import React from "react";
import { render } from "@testing-library/react";
import listadoAnuncios from "./../../services/ServicioListado";
import listadoTags from "./../../services/ServicioTags";
import adsMiembro from "./../../services/AdsMiembro";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";

class AdsMiembro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: props.match.params.username,
      isAuth:
        localStorage.getItem("cookie-login") === props.match.params.username,
    };
  }
  // Cambiar todos los anuncios por usuario
  async componentDidMount() {
    await this.adsMiembro(this.state.usuario);
  }

  async adsMiembro(usuario) {
    let adsMiembroResponse;
    try {
      adsMiembroResponse = await adsMiembro(usuario);
      if (adsMiembroResponse.data.success) {
        this.setState({
          usuario: adsMiembroResponse.data.results,
        });
      }
    } catch (error) {
      alert("Oooop looks like you are not logged");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>{anuncio.username}</h1>
        </div>
        {this.state.anuncios.map((anuncio) => {
          return (
            <div className="container-card">
              <div className="card">
                <img src={anuncio.foto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{anuncio.nombre}</h5>
                  <p>
                    <span className="badge badge-pill badge-success">
                      {anuncio.tags}
                    </span>
                  </p>
                  <Link
                    to={`/ad-details/${anuncio._id}`}
                    className="btn btn-primary"
                  >
                    Ver más
                  </Link>

                  {this.state.isAuth && (
                    <div>
                      Botones le pongo un onlcick con funcion y llamo al
                      servicio borrar
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AdsMiembro;
