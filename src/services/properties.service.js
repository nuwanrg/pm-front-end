import axios from "axios";
import authHeader from "./auth-header";
import http from "./httpService";
import { apiUrl } from "../config.json";

//const PROPERTY_URL = "http://localhost:8082/property/";
const apiEndpoint = apiUrl + "/properties/";

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

export function getProperties() {
  return http.get(apiEndpoint);
}

export function getProperty(propertyId) {
  return http.get(propertyUrl(propertyId));
}

export function saveProperty(property) {
  //console.log("saveMovie movie._id: " + movie._id);
  if (property.id) {
    console.log("SAVE PROPERTY inif property: " + JSON.stringify(property));
    const body = { ...property };
    //delete body.id;
    return http.put(propertyUrl(property.id), body);
  }
  console.log("SAVE PROPERTY OUTif property: " + JSON.stringify(property));
  console.log("apiEndpoint: " + apiEndpoint);
  return http.post(apiEndpoint, property);
}

export function getGenres() {
  //let testarray = [{ id: 1, name: "Buy" }];
  return { id: "5fc0d330b4037d871e264d8d", name: "Drama" };
  //return http.get(apiUrl + "/genres");
}
export default new PropertyService();
