import React, { Component } from "react";
import PageWithHeader from "./pageWithHeader";
import "../css/toDoList.css";
import moon from "../images/moon.png";
import {Link} from 'react-router-dom';

class ToDoList extends Component {

  render() {
    console.log('todolist: ', this.props.pastilles)
    return (
      <PageWithHeader>
        <div className="toDoListPage">
          <ul>
            {this.props.pastilles.map((tache, index) => {
              return (
                <Link 
                  key={tache._id} 
                  to={"/pastille/" + tache._id} 
                  className="linkto"
                >
                  <li id={index} key={tache._id}>
                    <div>
                      <h2>{tache.title}</h2>
                      <p className="dateFin">{tache.dateFin}</p>
                    </div>
                    <p>{tache.description.substring(0,70)}...</p>
                  </li>
                </Link>
                
                  );
              })}
          </ul>
          <img className="moon" src={moon} alt="la lune"></img>
        </div>
      </PageWithHeader>
    );
  }
}

export default ToDoList;
