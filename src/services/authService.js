import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  /*   login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })

      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  } */

  async login(username, password) {
    const { data: response } = await axios.post(API_URL + "signin", {
      username,
      password,
    });

    console.log(response);

    if (response & response.accessToken) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  }

  logout() {
    localStorage.removeItem("user");
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(signupdata) {
    console.log("In Authservice : " + signupdata);
    return axios.post(API_URL + "signup", {
      signupdata,
    });
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

export function signup(signupdata) {
  console.log("In Authservice : " + signupdata);
  return axios.post(API_URL + "signup", signupdata);
}

export default new AuthService();
