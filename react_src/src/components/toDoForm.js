import React, { Component } from "react";
import "../css/form.css";
import ListMembers from "./listMembers";
import axios from "axios";

class ToDoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      label: "",
      description: "",
      dateDebut: "",
      dateFin: "",
      files: "",
      step: "",
      steps: [],
      addedUsers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(files) {
    console.log(files);
  }

  handleSubmit(event) {
    alert("Formulaire envoyé");
    this.props.onPastilleSend(this.state);

    axios.post('http://localhost:3001/todo', this.state)
    .then((res) => {
      console.log('request successful', res);
    })
    .catch((err) => {
      console.log('request failed', err);
    })
  }

  removeStep(i) {
    // remove the inside of the element
    let newSteps = [...this.state.steps, this.state.step];
    newSteps.splice(i, 1);
    this.setState({ steps: newSteps });
    // remove the element
    let step = document.getElementById(i);
    step.parentNode.removeChild(step);
  }

  handleAddedUsers = (usersValue) => {
    this.setState({ addedUsers: usersValue });
  }

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(e);
        }}
      >
        <label>
          <span>Titre</span>
          <input
            name="title"
            type="text"
            placeholder="Entrer le Titre"
            value={this.state.title}
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
        </label>
        <label>
          <span>Label</span>
          <select
            value={this.state.label}
            onChange={e => {
              this.setState({ label: e.target.value });
            }}
          >
            <option value="choose">Choisir un label</option>
            <option value="Digital">Digital</option>
            <option value="Graphisme">Graphisme</option>
            <option value="Marketing">Marketing</option>
          </select>
        </label>
        <label>
          <span>Description</span>
          <textarea
            name="description"
            placeholder="Entrer une description"
            value={this.state.description}
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
          />
        </label>
        <div>
          <label>
            <span>Date debut</span>
            <input
              type="date"
              className="dateDebut"
              onChange={e => {
                this.setState({ dateDebut: e.target.value });
              }}
            />
          </label>
          <label>
            <span>Date fin</span>
            <input
              type="date"
              className="dateFin"
              onChange={e => {
                this.setState({ dateFin: e.target.value });
              }}
            />
          </label>
        </div>
        <label>
          <span>Ajouter des fichiers</span>
          <input
            type="file"
            onChange={e => this.handleChange(e.target.files)}
          />
        </label>
        <label>
          <span>Ajouter des étapes</span>
          <div>
            <input
              className="step"
              name="step"
              type="text"
              placeholder="ajouter une étape"
              value={this.state.step}
              onChange={e => {
                this.setState({ step: e.target.value });
              }}
            />
            <button
              className="addStep"
              type="button"
              onClick={() => {
                let newSteps = [...this.state.steps, this.state.step];
                this.setState({ steps: newSteps, step: "" });
              }}
            >
              Ajouter
            </button>
          </div>
        </label>
        <ul>
          {this.state.steps.map((step, i) => {
            return (
              <li id={i} key={i}>
                <span>{step}</span>

                <button
                  type="button"
                  className="stepButton"
                  onClick={() => this.removeStep(i)}
                >
                  Supprimer
                </button>
              </li>
            );
          })}
        </ul>
        <ListMembers users={this.props.users} onUserChecked={this.handleAddedUsers} />
        <input className="envoyer" type="submit" value="Envoyer" />
      </form>
    );
  }
}

export default ToDoForm;
