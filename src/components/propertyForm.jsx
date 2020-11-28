import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/properties.service";
import { getGenres } from "../services/fakeGenreService";

class PropertyForm extends Form {
  state = {
    data: {
      title: "",
      test: "",
      genreId: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    test: Joi.string().required().label("Test"),
    genreId: Joi.string().required().label("Genre"),
  };

  async populateGenres() {
    const genres = getGenres();

    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();

    console.log("testlog genres: " + this.state.genres);
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("test", "Test")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PropertyForm;
