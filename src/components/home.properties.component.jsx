import React, { Component } from "react";

import PropertyService from "../services/properties.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
      {id:"",
      title: "Title test",
      price: "",
      category: "",
      errorMsg:""},
      ]
    };
  }


  componentDidMount() {
    PropertyService.getPublicContent().then(
      response => {
        this.setState({ list: response.data });
      }
      // ,
      // error => {
      //   this.setState({
      //     errorMsg:
      //       (error.response && error.response.data) ||
      //       error.message ||
      //       error.toString()
      //   });
      // }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Properties</h3>
          </header>

          <div>
        <ul>
          {this.state.list.map(item => (
            <li key={item.id}>
              {item.title} 
              <button
                type="button"
                onClick={() => this.onRemoveItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      </div>

      
    );
  }
}
