import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
//import Like from "./common/like";

class PropertiesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (property) => (
        <Link to={`/properties/${property.id}`}>{property.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    /*     {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    }, */
  ];

  deleteColumn = {
    key: "delete",
    content: (property) => (
      <button
        onClick={() => this.props.onDelete(property)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    console.log(JSON.stringify(user));
    if (user /* && user.isAdmin */) this.columns.push(this.deleteColumn);
  }

  render() {
    const { properties, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={properties}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PropertiesTable;
