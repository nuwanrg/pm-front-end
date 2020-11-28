import axios from "axios";
import authHeader from "./auth-header";
import http from "./httpService";
import { apiUrl } from "../config.json";

//const PROPERTY_URL = "http://localhost:8082/property/";
const apiEndpoint = apiUrl + "/properties";

class PropertyService {
  getPublicContent() {
    //return axios.get(API_URL + 'all');
    return axios.get(apiEndpoint);
  }
  /*
  getUserBoard() {
    return axios.get(PROPERTY_URL + "create", { headers: authHeader() });
  }

  deleteProperty(id) {
    return axios.delete("http://localhost:8082/property/{$id}");
  }*/

  /*
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }*/
}

function propertyUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function deleteProperty(propertyId) {
  console.log("deleting property");
  return http.delete(propertyUrl(propertyId));
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(propertyUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(propertyUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}

export function getGenres() {
  //let testarray = [{ id: 1, name: "Buy" }];
  return { _id: "5fc0d330b4037d871e264d8d", name: "Drama" };
  //return http.get(apiUrl + "/genres");
}
export default new PropertyService();
