/** @format */

import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  async login(username, password) {
    const promise = await axios.post(API_URL + "signin", {
      username,
      password,
    });
    localStorage.setItem("user", JSON.stringify(promise.data));
    const { data: user } = promise;

    console.log("user");
    console.log(user.username);
    return user;

    /*.then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });*/
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password, userType) {
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(userType); //newly

    const promise = await axios.post(API_URL + "signup", {
      username,
      email,
      password,
      userType, //newly
    });
    console.log("promise");
    console.log(promise);
  }

  resetPassword(email) {
    return axios.post(API_URL + "resetPassword", {
      email,
    });
  }

  changePassword(token, password) {
    return axios.post(API_URL + "savePassword", {
      token,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
