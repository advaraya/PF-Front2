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
import registro from "../../services/ServicioRegistro";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleChangeEmail(event) {
    console.log(event.target.value);
    this.setState({
      username: this.state.username,
      password: this.state.password,
      email: event.target.value,
    });
  }
  handleChangePassword(event) {
    console.log(event.target.value);
    this.setState({
      username: this.state.username,
      email: this.state.email,
      password: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    var result = await registro(
      this.state.username,
      this.state.email,
      this.state.password
    );
    if (result.data.success) {
      return this.props.history.push("/login");
    } else {
      alert("Something went wrong, please try again");
    }
  }

  render() {
    return (
      <div id="login">
        <body id="register_bg">
          <aside>
            <figure>
              <a href="#">
                <img
                  src="img/logo.png"
                  width="165"
                  height="35"
                  alt=""
                  className="logo_sticky"
                />
              </a>
            </figure>
            <h3>Sign in</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername"
                  aria-describedby="emailHelp"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <i className="ti-user"></i>
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
                <i className="icon_mail_alt"></i>
              </div>
              <div className="form-group">
                <label>Your password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
                <i className="icon_lock_alt"></i>
              </div>
              <button
                type="submit"
                className="btn_1 rounded full-width add_top_30"
                value="Submit"
              >
                Submit
              </button>
            </form>
            <Link to="/login" className="enlace">
              Already have an acccount? Login
            </Link>
          </aside>
        </body>
      </div>
    );
  }
}

export default Signin;
