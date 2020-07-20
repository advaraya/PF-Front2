import React from "react";
import { render } from "@testing-library/react";
import listadoAnuncios from "./../../services/ServicioListado";
import listadoTags from "./../../services/ServicioTags";
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
    let name = "";
    this.state = {
      anuncios: [],
      filters: { name: name, tag: "", venta: "", min: "", max: "" },
      tags: [],
    };
    this.listarTags();
    this.listarAnuncios(this.state.filters);
  }
  async listarAnuncios(filters) {
    //var miCookie = localStorage.getItem("cookie-login");
    //if (miCookie === undefined) {
    //  alert("Oooop looks like you are not logged");
    // } else {
    let anunciosResponse;
    try {
      anunciosResponse = await listadoAnuncios(filters);
      if (anunciosResponse.data.success) {
        this.setState({
          anuncios: anunciosResponse.data.results,
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
      if (mistag.data.success) {
        this.setState({
          anuncios: this.state.anuncios,
          tags: mistag.data.results,
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
          <h2>Listing Ads</h2>
        </div>
        <div className="row">
          <div className="col-4">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Looking for something?"
                onChange={(e) => {
                  console.log(e.target.value);
                  var f = { ...this.state.filters };
                  f.name = e.target.value;
                  this.setState({
                    anuncios: this.state.anuncios,
                    filters: f,
                    tags: this.state.tags,
                  });
                }}
                value={this.state.filters.name}
              />
              <button
                type="button"
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={async () => {
                  await this.listarAnuncios(this.state.filters);
                }}
              >
                Search
              </button>
            </form>
          </div>
          <div className="col-6">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="MinPrice"
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
                className="form-control mr-sm-2"
                type="text"
                placeholder="MaxPrice"
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
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={async () => {
                  await this.listarAnuncios(this.state.filters);
                }}
              >
                Search
              </button>
            </form>
          </div>
          <div className="col-lg-1">
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
          <div className="col-1">
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
            <div className="container margin_60_35">
              <div className="strip list_view">
                <div className="row no-gutters">
                  <div className="col-lg-5">
                    <figure>
                      <a href="#">
                        <img src={anuncio.photo} class="img-fluid" alt="" />
                        <div class="read_more">
                          <span>
                            <Link
                              to={`/ad-details/${anuncio.url}`}
                              className="btn btn-primary"
                            >
                              See more
                            </Link>
                          </span>
                        </div>
                      </a>
                      <small>{/*{anuncio.username}*/}</small>
                    </figure>
                  </div>
                  <div class="col-lg-7">
                    <div className="wrapper">
                      <a href="#0" class="wish_bt"></a>
                      <h3>
                        <a href="#">{anuncio.name}</a>
                      </h3>
                      <p>{anuncio.description}</p>
                    </div>
                    <ul>
                      <li>
                        <span className="loc_open">{anuncio.tags}</span>
                      </li>
                      <li>
                        <div className="score">
                          <span>{anuncio.price}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-center add_top_60">
                <a href="#0" className="btn_1 rounded">
                  Load more
                </a>
              </p>
            </div>
            /*<div className="container-card">
              <div className="card">
                <img src={anuncio.photo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{anuncio.name}</h5>
                  <p>
                    <span className="badge badge-pill badge-success">
                      {anuncio.tags}
                    </span>
                  </p>
                  <Link
                    to={`/ad-details/${anuncio._id}`}
                    className="btn btn-primary"
                  >
                    See more
                  </Link>
                </div>
              </div>
          // </div>*/
          );
        })}
      </div>
    );
  }
}

export default Listing;
