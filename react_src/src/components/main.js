import React, { Component } from "react";

import ToDoList from "./toDoList";
import Admin from "./admin";
import Login from "./login";
import Register from "./register";
import PageTodo from "./pageTodo";
import Logout from "./logout";
import axios from 'axios';
import {Switch, Route} from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      pastilles: []
    };

    this.addPastille = this.addPastille.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:3001/user', {withCredentials: true})
    .then((response) => {
      // handle success
      this.setState({users: response.data})
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    axios.get('http://localhost:3001/todo', {withCredentials: true})
    .then((response) => {
      // handle success
      this.setState({pastilles: response.data})
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  setUsers = users => {
    console.log("Main setUser", users);
    this.setState({ users: users });
  };

  addUser = user => {
    let users = [...this.state.users, user];
    this.setState({ users: users });
  };

  addPastille = pastille => {
    let pastilles = [...this.state.pastilles, pastille];
    this.setState({ pastilles: pastilles });
  };

  render() {
    console.log('main', this.state.pastilles)
    return (
      <Switch>
            <Route 
              path="/login" 
              component={() => {
                return <Login 
                          users={this.state.users} 
                          addUser={this.addUser} 
                        />
            }} />
            <Route
              path="/register"
              component={() => {
                return <Register
                          users={this.state.users}
                        />
            }} />
            <Route 
              path="/todoList" 
              component={() => {
                return <ToDoList 
                          users={this.state.users} 
                          addPastille={this.addPastille} 
                          pastilles={this.state.pastilles} 
                        />
            }} />
            <Route 
              path="/pastille/:id" 
              component={() => {
                return <PageTodo 
                          pastilles={this.state.pastilles} 
                        />
            }} />
            <Route 
              path="/admin" 
              component={() => {
                return <Admin 
                          users={this.state.users} 
                          addPastille={this.addPastille} />
            }} />
            <Route 
              path="/logout" 
              component={() => {
                return <Logout />
            }} />
      </Switch>
    );
  }
}

export default Main;
