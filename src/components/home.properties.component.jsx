import React, { Component } from "react";

import PropertyService from "../services/properties.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Title test",
      price: "",
      category: "",
      errorMsg:""
    };
  }

  componentDidMount() {
    PropertyService.getPublicContent().then(
      response => {
        this.setState({
          category: response.data.category,
          title: response.data.title
        });
      },
      error => {
        this.setState({
          errorMsg:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.title}</h3>
          <h3>{this.state.errorMsg}</h3>
          
        </header>
      </div>
    );
  }
}
