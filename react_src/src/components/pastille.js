import React, { Component } from "react";
import "../css/pastille.css";
import PageWithHeader from "./pageWithHeader";

class Pastille extends Component {

  render() {
    console.log('Pastille: ', this.props.pastille);
    return (
      <PageWithHeader>
        <div className="pastille">
          <h1 className="title">{this.props.pastille.title}</h1>
          <div className="info">
            <div className="info-header">
              <div className="label">
                <p>Label</p>
                <p className="labelName">{this.props.pastille.label}</p>
              </div>
              <div className="date">
                <p>Date debut</p>
                <p>{this.props.pastille.dateDebut}</p>
              </div>
              <div className="date">
                <p>Date fin</p>
                <p>{this.props.pastille.dateFin}</p>
              </div>
            </div>
            <div className="description">
              <p>Description</p>
              <p>{this.props.pastille.description}</p>
            </div>
            <div className="pj">
              <p>Piéces jointes</p>
              <div>{this.props.pastille.files}</div>
            </div>
            <div className="step">
              <p>Etapes</p>
              <ul className="stepList">
                <li>{this.props.pastille.steps}</li>
              </ul>
            </div>
          </div>

          <div className="members">
            <h2>Membres</h2>
            <ul className="userList">
              <li>{this.props.pastille.addedUsers}</li>
            </ul>
          </div>
        </div>
      </PageWithHeader>
    );
  }
}

export default Pastille;
