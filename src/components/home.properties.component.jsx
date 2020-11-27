import React, { Component } from "react";

import PropertyService from "../services/properties.service";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        { id: "", title: "Title test", price: "", category: "", errorMsg: "" },
      ],
    };
  }

  componentDidMount() {
    PropertyService.getPublicContent().then(
      (response) => {
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
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="container">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <FormControl
                  type="text"
                  placeholder=" another Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className="container">
          <ul>
            {this.state.list.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
