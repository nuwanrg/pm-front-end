/** @format */

import React, { Component, useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { isEmail } from "validator";
import Link from "@material-ui/core/Link";
//import { register } from "../services/authService";
import "../App.css";

import AuthService from "../services/authService";
import { render } from "react-dom";

const required = (value) => {
  //alert(value.selection)

  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const selectionType = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Need selected one filed!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

// const ToggleButtonExample = (val) => {
//   const [value, setValue] = useState(["1"," 2"]);

//   /*
//    * The second argument that will be passed to
//    * `handleChange` from `ToggleButtonGroup`
//    * is the SyntheticEvent object, but we are
//    * not using it in this example so we will omit it.
//    */
//   const handleChange = (val) => setValue(val);

//   return (
//     <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} >
//       <ToggleButton

//         id="ROLE_USER"
//         key="buy"
//         variant="outline-success"
//         value="buy"
//        // checked={value}

//       >

//         Buy Properties
//       </ToggleButton>
//       <ToggleButton

//         key="sell"
//         id="ROLE_AGENT"
//         variant="outline-success"
//         value="sell"
//         //checked={value}

//       >
//         Sell Properties
//       </ToggleButton>
//     </ToggleButtonGroup>
//   );
// };

//

//const ToggleButtonExample = () => {

export default class Register extends Component {
  /*constructor(props) {
     super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this); */

  state = {
    username: "",
    email: "",
    password: "",
    userType: "", //buyer seller
    roles: ["ROLE_USER"],
    successful: false,
    message: "",
    response: "",
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  onChangeUserType = (e) => {
    this.setState({
      userType: e.currentTarget.value,
    });
  };

  handleRegister = async (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      try {
        const res = await AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password,
          this.state.userType
        );
        console.log("Register response: test");
        this.setState({ response: res.data });
        console.log(
          "Register response: " + JSON.stringify(this.state.response)
        );
      } catch (ex) {
        //Expected errors
        if (ex.response && ex.response.status === 400) {
          console.log(ex.response.data.message);
          this.setState({
            successful: false,
            message: ex.response.data.message,
          });
          //alert("This Property has already been deleted!");
        } else {
          //Unexpected errors
          alert("Server Error!");
        }
      }
      /*       .then(
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
      ); */
    }
  };

  render() {
    const { userType } = this.state;
    const radios = [
      { name: "Buy Properties", value: "buy" },
      { name: "Sell Properties", value: "sell" },
    ];

    return (
      <div className='col-md-12'>
        <div className='card card-container'>
          <img
            src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
            alt='profile-img'
            className='profile-img-card'
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}>
            {!this.state.successful && (
              <div>
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <Input
                    type='text'
                    className='form-control'
                    name='username'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <Input
                    type='text'
                    className='form-control'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <Input
                    type='password'
                    className='form-control'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <Input
                    type='password'
                    className='form-control'
                    name='confirmPassword'
                    value={this.state.confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className='form-group'>
                  <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        type='radio'
                        variant='outline-success'
                        value={radio.value}
                        checked={userType === radio.value}
                        onChange={(e) => this.onChangeUserType(e)}
                        validations={[selectionType]}>
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>

                <div className='form-group'>
                  <button className='btn btn-primary btn-block'>Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className='form-group'>
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role='alert'>
                  {this.state.message}
                </div>
                <div>
                  <Link href='/login' variant='body2'>
                    Login
                  </Link>
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
