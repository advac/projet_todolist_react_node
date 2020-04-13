import React, { Component } from "react";
import "../css/form.css";
import "../css/login.css";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorLogin: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
      axios.post("http://localhost:3001/login", {
        email: this.state.email,
        password: this.state.password
      },{ withCredentials: true 
      })
      .then(function (response) {
        if (response.data.redirect == '/todoList') {
          window.location = "/todoList"
        }
      })
      
  }

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(this.state);
          this.handleLogin(e);
        }}
      >
        <label>
          <span>Email</span>
          <input
            type="text"
            name="name"
            placeholder="Saisir email"
            value={this.state.email}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
        </label>
        <label>
          <span>Mot de passe</span>
          <input
            type="password"
            name="password"
            placeholder="Saisir mot de passe"
            value={this.state.password}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
        </label>
        <input className="loginButton" type="submit" value="SE CONNECTER" />
        <Link to={"/register"}>
          <input className="registerButton" type="button" value="CREER UN COMPTE"/>
        </Link>
        {/* Affiche le message d'erreur si email ou mdp faux */}
        <div>{this.state.errorLogin}</div>
      </form>
    );
  }
}

export default Login;
