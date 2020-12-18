import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import PropertiesTable from "./propertiesTable";
//import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import ListGroup from "react-bootstrap/ListGroup";
//import { getMovies, deleteMovie } from "../services/movieService";
import { getProperties, deleteProperty } from "../services/properties.service";
//import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import auth from "../services/authService";
import { SidebarData } from "./sidebarData";

class User extends Component {
  useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(1),
    },
  }));

  state = {
    properties: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    //const { data } = await getGenres();
    const data = [
      {
        id: "myprofile",
        name: "My Profile",
      },
    ];

    const genres = [{ id: "", name: "My Ads" }, ...data];

    const { data: properties } = await getProperties();
    this.setState({ properties, genres });
  }

  handleDelete = async (property) => {
    const originalProperties = this.state.properties;
    const properties = originalProperties.filter((m) => m.id !== property.id);
    this.setState({ properties });

    try {
      await deleteProperty(property.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This property has already been deleted.");

      this.setState({ properties: originalProperties });
    }
  };

  handleLike = (property) => {
    const properties = [...this.state.properties];
    const index = properties.indexOf(property);
    properties[index] = { ...properties[index] };
    properties[index].liked = !properties[index].liked;
    this.setState({ properties });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      properties: allProperties,
    } = this.state;

    let filtered = allProperties;
    if (searchQuery)
      filtered = allProperties.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.id)
      filtered = allProperties.filter((m) => m.genre.id === selectedGenre.id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const properties = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: properties };
  };

  render() {
    //const classes = useStyles();
    const { length: count } = this.state.properties;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const user = auth.getCurrentUser();
    //const { user } = this.props;

    const { totalCount, data: properties } = this.getPagedData();

    return (
      <div>
        <div>
          <div className="row">
            <div className="col">
              {user && (
                <Link
                  to="/properties/new"
                  className="btn btn-primary"
                  style={{ marginBottom: "2px" }}
                >
                  New Property
                </Link>
              )}

              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <p>Showing {totalCount} properties in the database.</p>
              {properties.map((property) => (
                <ListGroup className="my-2" key={property.id}>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Carousel className="slider-container">
                          <Carousel.Item className="slider-item-div">
                            <img
                              className="d-block w-10"
                              src="download (1).jpg"
                              alt="First slide"
                            />
                            {/*                                 <Carousel.Caption>
                                  <h3>First slide label</h3>
                                  <p>
                                    Nulla vitae elit libero, a pharetra augue
                                    mollis interdum.
                                  </p>
                                </Carousel.Caption> */}
                          </Carousel.Item>
                          <Carousel.Item className="slider-item-div">
                            <img
                              className="d-block w-10"
                              src="download.jpg"
                              alt="First slide"
                            />
                            {/*                                 <Carousel.Caption>
                                  <h3>First slide label</h3>
                                  <p>
                                    Nulla vitae elit libero, a pharetra augue
                                    mollis interdum.
                                  </p>
                                </Carousel.Caption> */}
                          </Carousel.Item>
                        </Carousel>
                      </Col>
                      <Col>{property.title}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}

              {/*               <PropertiesTable
                properties={properties}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              /> */}
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
