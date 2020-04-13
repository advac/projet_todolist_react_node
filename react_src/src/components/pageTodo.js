import React, { Component } from "react";
import Pastille from "./pastille";
import axios from 'axios';
import { withRouter } from "react-router";

class PageTodo extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          pastille:[]
      }
  }

  componentDidMount() {
    let id = this.props.match.params.id
    axios.get('http://localhost:3001/todo/' + id)
    .then((response) => {
      // handle success
      console.log('pagetodo response', response.data)
      this.setState({pastille: response.data}) 
    })
    .catch((error) =>{
      // handle error
      console.log('ERROR ', error);
    })
    .finally(()=>{
      console.log('finally')
    })
  }

  render() {
    console.log('todo: ', this.state.pastille)
    return (
      <Pastille pastille={this.state.pastille} />
    );
  }
}

export default withRouter(PageTodo);