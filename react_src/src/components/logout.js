import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router";

class Logout extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          pastille:[]
      }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/logout')
    .then((response) => {
      // handle success
      console.log('logout!!!!!!!!!!!!!!!!!!!!!!!!')
      if (response.data.redirect == '/') {
        return window.location = "/login"
      }
    })
  }

  render() {
    return 'logout page';
  }
}

export default withRouter(Logout);