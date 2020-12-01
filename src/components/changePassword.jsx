import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/authService";
import { useParams } from "react-router";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);

    this.state = {
      password: "",
      newPassword: "",
      successful: false,
      message: "",
      token: this.props.match.params.token,
    };
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }

  componentDidMount() {
    console.log(this.props);
    /*this.setState({
      token:"4fa12490-eb9f-47ca-9526-26a5934b9bbe", //TODO 
      message: "response.data.message",
      successful: false
    });

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    ;*/
  }

  handleChangePassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.changePassword(this.state.token, this.state.password).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleChangePassword}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="token">Token</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="token"
                    value={this.state.token}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">Confirm New Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.onChangeNewPassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
