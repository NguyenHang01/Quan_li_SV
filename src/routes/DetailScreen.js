import React, { Component } from "react";

class DetailScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    render(){
        return(
            <div>
                <h1>Trang detail </h1>
                <h1>{ this.props.match.params.id}</h1>
            </div>
        )
    }
}

export default DetailScreen;
