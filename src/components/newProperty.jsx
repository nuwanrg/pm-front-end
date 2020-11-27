import React, { Component } from "react";
import { borders } from "@material-ui/system";

class NewProperty extends Component {
  state = {};

  render() {
    return (
      <div>
        <h3>Create New Selling Property</h3>
        <form>
          <div className="form-group" border={1}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input id="price" type="text" className="form-control" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewProperty;
