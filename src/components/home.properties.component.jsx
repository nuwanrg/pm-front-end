import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PropertiesTable from "./propertiesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
//import { getMovies, deleteMovie } from "../services/movieService";
import { getProperties, deleteProperty } from "../services/properties.service";
//import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import auth from "../services/authService";

class Properties extends Component {
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
    const { length: count } = this.state.properties;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const user = auth.getCurrentUser();
    //const { user } = this.props;

    const { totalCount, data: properties } = this.getPagedData();

    return (
      <div>
        <div>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="ads" title="My Ads">
              <div className="row">
                {/*         <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div> */}
                <div className="col">
                  {user && (
                    <Link
                      to="/properties/new"
                      className="btn btn-primary"
                      style={{ marginBottom: 20 }}
                    >
                      New Property
                    </Link>
                  )}
                  <p>Showing {totalCount} properties in the database.</p>
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                  <PropertiesTable
                    properties={properties}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                  />
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="My Profile">
              <h1 />
            </Tab>
            <Tab eventKey="contact" title="Inquiries">
              <h1 />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Properties;
