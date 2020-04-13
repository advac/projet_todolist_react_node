import React from "react";
import "./style.css";

import Main from "./components/main";
import { BrowserRouter } from "react-router-dom";

import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        repeatPassword: ""
      }
    };
  }

  insertNewList = () => {
    axios.post('http://localhost:3001/todo')
    .then((res) => {
      console.log('request successful', res);
    })
    .catch((err) => {
      console.log('request failed', err);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Main
          onRegister={user => {
            this.setState({ users: user });
          }}
          user={this.state.users}
        />
      </BrowserRouter>
      
    );
  }
}
