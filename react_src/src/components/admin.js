import React, { Component } from "react";
import "../css/admin.css";
import PageWithHeader from "./pageWithHeader";
import ToDoForm from "./toDoForm";

class Admin extends Component {
  render() {
    return (
      <PageWithHeader>
      <div className="adminRender">
          <ToDoForm
            onPastilleSend={pastille => {
              this.props.addPastille(pastille);
            }} 
            users={this.props.users}
          />
      </div>
      </PageWithHeader>
    );
  }
}

export default Admin;
