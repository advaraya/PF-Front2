import React from "react";
import { render } from "@testing-library/react";
import listadoAnuncios from "./../../services/ServicioListado";
import listadoTags from "./../../services/ServicioTags";
//import adsMiembro from "./../../services/AdsMiembro";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";

class Listing extends React.Component {
  constructor(props) {
    super(props);
    let nombre = "";
    this.state = {
      anuncios: [],
      filters: {
        nombre: nombre,
        tag: "",
        venta: "",
        min: "",
        max: "",
        date: "",
      },
      tags: [],
    };
  }

  async componentDidMount() {
    //await this.adsMiembro();
    await this.listarTags();
    await this.listarAnuncios(this.state.filters);
  }

  async listarAnuncios(filters) {
    // var miCookie = localStorage.getItem("cookie-login");
    //if (miCookie === undefined) {
    //  alert("Oooop looks like you are not logged");
    // } else {
    let anunciosResponse;
    try {
      anunciosResponse = await listadoAnuncios(filters);
      if (anunciosResponse.data.ok) {
        this.setState({
          anuncios: anunciosResponse.data.result.rows,
          filters: filters,
          tags: this.state.tags,
        });
      }
    } catch (error) {
      alert("Oooop looks like you are not logged");
    }
    //}
  }

  async listarTags() {
    let mistag;
    try {
      mistag = await listadoTags();
      if (mistag.data.ok) {
        this.setState({
          anuncios: this.state.anuncios,
          tags: mistag.data.allowedTags,
          filters: this.state.filters,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Listing Ads</h1>
        </div>
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              placeholder="What are you looking for..."
              onChange={(e) => {
                console.log(e.target.value);
                var f = { ...this.state.filters };
                f.nombre = e.target.value;
                this.setState({
                  anuncios: this.state.anuncios,
                  filters: f,
                  tags: this.state.tags,
                });
              }}
              value={this.state.filters.nombre}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={async () => {
                await this.listarAnuncios(this.state.filters);
              }}
            >
              Buscar
            </button>
          </div>
          <div className="col-5">
            <p>Range of price</p>
            <input
              type="text"
              placeholder="min"
              onChange={(e) => {
                console.log(e.target.value);
                var f = { ...this.state.filters };
                f.min = e.target.value;
                this.setState({
                  anuncios: this.state.anuncios,
                  filters: f,
                  tags: this.state.tags,
                });
              }}
            />
            <input
              type="text"
              placeholder="max"
              onChange={(e) => {
                console.log(e.target.value);
                var f = { ...this.state.filters };
                f.max = e.target.value;
                this.setState({
                  anuncios: this.state.anuncios,
                  filters: f,
                  tags: this.state.tags,
                });
              }}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={async () => {
                await this.listarAnuncios(this.state.filters);
              }}
            >
              Buscar
            </button>
          </div>
          <div className="col-2">
            <select
              onChange={async (e) => {
                var f = { ...this.state.filters };
                if (e.target.value == "all") {
                  f.tag = "";
                } else {
                  f.tag = e.target.value;
                }
                await this.listarAnuncios(f);
              }}
            >
              <option value="all">All tags</option>
              {this.state.tags.map((tag) => {
                if (tag !== null) {
                  return <option>{tag}</option>;
                }
              })}
            </select>
          </div>
          <div className="col-2">
            <select
              onChange={async (e) => {
                var f = { ...this.state.filters };
                if (e.target.value == "all") {
                  f.venta = "";
                } else {
                  if (e.target.value == "venta") {
                    f.venta = true;
                  } else {
                    f.venta = false;
                  }
                }
                await this.listarAnuncios(f);
              }}
            >
              <option value="all">Tipo</option>
              <option value="venta">Sell</option>
              <option value="compra">Buy</option>
            </select>
          </div>
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
                  <p>
                    <span className="badge badge-pill badge-success">
                      {anuncio.precio}€
                    </span>
                  </p>
                  <p>{anuncio.descripcion}</p>
                  <p>
                    <Link
                      to={`/ads-member/${anuncio.username}`}
                      className="btn btn-primary"
                    >
                      {anuncio.username}
                    </Link>
                  </p>
                  <p>
                    <span className="badge badge-pill badge-success">
                      {anuncio.venta === true ? (
                        <span>venta</span>
                      ) : (
                        <span>Compra</span>
                      )}
                    </span>
                  </p>
                  <Link
                    to={`/ad-details/${anuncio.url}`}
                    className="btn btn-primary"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Listing;
