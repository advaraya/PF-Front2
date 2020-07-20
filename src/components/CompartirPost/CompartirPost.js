import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

class CompartirPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlAnuncio: props.urlAnuncio,
      nombre: props.nombreAnuncio,
      descripcion: props.descripcionAnuncio,
    };
  }
  render() {
    return (
      <div>
        <FacebookShareButton
          url={`http://localhost:3000/ad-details/${this.props.urlAnuncio}`}
          quote={`${this.props.nombre} - ${this.props.descripcion}`}
        >
          <FacebookIcon round size={32} />
        </FacebookShareButton>
        <TwitterShareButton
          url={this.props.urlAnuncio}
          title={this.props.nombre}
        >
          <TwitterIcon round size={32} />
        </TwitterShareButton>
      </div>
    );
  }
}

export default CompartirPost;

/* Fuentes: 

https://github.com/nygardk/react-share#readme
https://www.npmjs.com/package/react-share
https://www.novasapiens.cl/posts/botones-de-compartir-con-redes-sociales-en-gatsby-js

*/
