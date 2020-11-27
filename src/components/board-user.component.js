import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export default class BoardUser extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(
      "http://localhost:8082/property/all"
    );
    this.setState({ posts });
  }

  handleDelete = (movie) => {
    console.log(movie.id);
  };

  render() {
    return (
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
          {this.state.posts.map((property) => (
            <tr>
              <td>
                <Link>{property.title}</Link>
              </td>
              <td>{property.type}</td>
              <td>
                <Button
                  onClick={this.handleDelete(property)}
                  variant="outline-danger"
                >
                  Update
                </Button>
              </td>
              <td>
                <Button onClick={this.handleDelete} variant="outline-danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
