import React, { Component } from "react";
import "../css/header.css";
import homelogo from "../images/home.png";
import person from "../images/person.png";
import {Link} from "react-router-dom";

class Header extends Component {
    render(){
        let bool = false;
        return(
            <header>
                <div>
                    <Link to={"/todoList"}>
                        <img className="homeLogo" src={homelogo} alt="home logo" />
                    </Link>
                </div>
                <h1>Moon List</h1>
                <div onClick={() => {
                    let popup = document.getElementById("logPopup");
                    if (bool === false)
                    {
                        popup.style.display = "block";
                        bool = true;
                    }
                    else
                    {
                        popup.style.display = "none";
                        bool = false;
                    }
                }}>
                    <img className="person" src={person} alt="person logo" />
                </div>
                <div id="logPopup">
                    <Link to={"/admin"} className="popuplink">
                        <span>Admin</span>
                    </Link>
                    <Link to={"/logout"} className="logout">
                        <span>Logout</span>
                    </Link>
                </div>
            </header>
        )
    }
}

export default Header;

