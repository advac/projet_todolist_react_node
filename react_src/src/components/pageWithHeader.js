import React, { Component } from "react";
import Header from "./header";

class PageWithHeader extends Component {
    render(){
        return(
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}

export default PageWithHeader;

