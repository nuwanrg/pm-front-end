import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getProperty, saveProperty } from "../services/properties.service";
import { getGenres } from "../services/fakeGenreService";

class PropertyForm extends Form {
  state = {
    data: {
      title: "",
      category: "",
      username: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    category: Joi.string().required().label("Category"),
    //username: "",
  };

  async populateGenres() {
    //const genres = getGenres();
    const genres = [
      {
        _id: "5fc0d307b4037d871e264d8c",
        name: "SELL",
      },
    ];

    this.setState({ genres });
  }

  async populateProperty() {
    try {
      const propertyId = this.props.match.params.id; //match
      console.log("propertyId: " + propertyId);
      if (propertyId === "new") return;

      const { data: property } = await getProperty(propertyId);
      console.log("populate property: " + JSON.stringify(property));
      this.setState({ data: this.mapToViewModel(property) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    const user = this.props.currentUser.username;
    console.log("json " + JSON.stringify(user));
    this.setState({ data: { username: user } });
    console.log("json data " + JSON.stringify(this.state.data));

    await this.populateGenres();
    await this.populateProperty();

    console.log("testlog genres: " + this.state.genres);
  }

  mapToViewModel(property) {
    return {
      id: property.id,
      title: property.title,
    };
  }

  doSubmit = async () => {
    console.log("json data " + JSON.stringify(this.state.data));

    await saveProperty(this.state.data);

    this.props.history.push("/properties");
  };

  render() {
    return (
      <div>
        {/* <h1>{this.data.username}</h1> */}
        <h1>POST NEW PROPERTY</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("category", "Category", this.state.genres)}
          <div className="form-group multi-preview">
            {(this.fileArray || []).map((url) => (
              <img src={url} alt="..." />
            ))}
          </div>

          <div className="form-group">
            <input
              type="file"
              className="form-control"
              onChange={this.uploadMultipleFiles}
              multiple
            />
          </div>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={this.uploadFiles}
          >
            Upload
          </button>
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PropertyForm;
