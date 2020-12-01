import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { getProperties, deleteProperty } from "../services/properties.service";

export default class BoardUser extends Component {
  state = {
    properties: [],
  };

  async componentDidMount() {
    /* const { user } = this.props;
    console.log("in comp mount: " + user.username); */
    const { user } = this.props;
    this.setState({ user });

    const { data: properties } = await axios.get(
      "http://localhost:8082/api/properties/"
    );
    this.setState({ properties });
  }

  handleDelete = async (property) => {
    const originalProperties = this.state.properties;
    const properties = this.state.properties.filter(
      (m) => m.id !== property.id
    );
    this.setState({ properties });

    try {
      await deleteProperty(property.id);
      /* await axios.delete(
        "a http://localhost:8082/property/delete/" + property.id + 23
      );*/
    } catch (ex) {
      //Expected errors
      if (ex.response && ex.response.status === 401) {
        alert("This Property has already been deleted!");
      } else {
        //Unexpected errors
        alert("Something failed while deleting a Property!");
        this.setState({ properties: originalProperties });
      }
    }
    console.log(property.id);
  };

  render() {
    //props
    // const { user } = this.props;

    //console.log("in render: " + user);

    const count = this.state.properties.length;
    if (count === 0) return <p>There are no properties to list.</p>;
    return (
      <React.Fragment>
        <h1>{this.props.user.username}</h1>
        <p>Showing {count} properties.</p>
        {
          /* user && */ <Link
            to="/properties/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Property
          </Link>
        }
        <Table striped hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.properties.map((property) => (
              <tr key={property.id}>
                <td>
                  <Link to="/properties/new">{property.title}</Link>
                </td>
                <td>{property.type}</td>
                <td>
                  <Button>Update</Button>
                </td>
                <td>
                  <Button
                    onClick={() => this.handleDelete(property)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
