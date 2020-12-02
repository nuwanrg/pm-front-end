import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Properties from "./components/home.properties.component";
import PropertyForm from "./components/propertyForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Profile from "./components/profile.component";
import User from "./components/user";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ResetPassword from "./components/resetPassword";
import ChangePassword from "./components/changePassword";
import LandingPageComponent from "./components/landingPage/landingpageComponent";
import AuthService from "./services/authService";
import Axios from "axios";

//Handling unexpected errors globally
Axios.interceptors.response.use(null, (error) => {
  console.log("INTERCEPTOR CALLED");
});

class App extends Component {
  logOut = this.logOut.bind(this);

  state = {
    currentUser: {
      username: "",
    },
    showModeratorBoard: false,
    showAdminBoard: false,
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            PropertyMonkey
          </Link>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                Buy
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                Rent
              </Link>
            </li>

            {/*}
            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                Apartments
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                Houses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                New Projects
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                Find Agent
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                News
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                More
              </Link>
            </li>
*/}
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/", "/home"]}
              component={LandingPageComponent}
            />
            <Route exact path={["/", "/properties"]} component={Properties} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route
              path="/user"
              render={(props) => (
                <User {...props} user={this.state.currentUser} />
              )}
            />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/changePassword/:token" component={ChangePassword} />
            <ProtectedRoute
              path="/properties/:id"
              render={(props) => (
                <PropertyForm {...props} currentUser={this.state.currentUser} />
              )}
            />

            <Route
              path="/properties"
              render={(props) => (
                <Properties {...props} user={this.state.currentUser} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
