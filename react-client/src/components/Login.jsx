import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Header from "./header.jsx";

const MyInput = styled(TextField)({
  color: "#0A194F",
  width: 400,
  margin: "35px 35px 50px 50px",
});

const MyButton = styled(Button)({
  width: 100,
  margin: "auto",
  backgroundColor: "#0A194F",
  color: "#F9FBE7",
});

const Mypaper = styled(Paper)({
  width: 515,
  height: 480,
  margin: "100px",
});

var MyBox = styled(Box)({
  backgroundColor: "#0A194F",
});

let formUsernameIsValid = false;
let formPasswordIsValid = false;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
    };
  }

  //method to prevent users from login if they didn't write their username
  handleUsername(event) {
    this.setState({ username: event.target.value });
    if (this.state.username !== undefined) formUsernameIsValid = true;
  }

  //method to prevent users from login if they didn't write their password
  handlePassword(event) {
    this.setState({ password: event.target.value });
    if (this.state.password !== undefined) formPasswordIsValid = true;
  }

  //getting (retrieving) user's data from the server (token)
  loginHandler(token) {
    $.ajax({
      url: "/posts",
      method: "GET",
      data: { token },
      contentType: "application/json",
      success: function (data) {
        console.log("get req/login sent successfully!");
        if (formUsernameIsValid && formPasswordIsValid) {
          window.location = "http://localhost:3000/profile";
        }
      },
      error: function (err) {
        console.log(err, "get req/login failed!");
      },
    });
  }

  handleClick() {
    this.onSubmit(this.state.value);
    this.handleSubmit(this.state.value);
    console.log(this.state, "handleClickkkkkkk");
  }

  validate() {
    let usernameError = "";
    let passwordError = "";
    if (!this.state.username) {
      usernameError =
        "Please fill your username and try to make it less than 20 characters!";
    }
    if (!this.state.password) {
      passwordError =
        "Please enter your password and try to make it more than 8 characters!";
    }
    if (usernameError || passwordError) {
      this.setState({ usernameError, passwordError });
      return false;
    }
    return true;
  };

  handleSubmit(event) {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
    }
  };

    //send user's data along with the request to the server where we can verify users ans store tokens in their local storage
    onSubmit() {
      var cred = { username: this.state.username, password: this.state.password };
      var that = this;
      $.ajax({
        url: "/login",
        method: "POST",
        data: JSON.stringify(cred),
        contentType: "application/json",
        success: function (data) {
          console.log("POST req/handleClick sent successfully!");
          localStorage.setItem("token", data);
          that.loginHandler(data);
        },
        error: function (err) {
          console.log(err, "POST req/handleClick failed!");
        },
      });
    }

  //render the login form
  render() {
    return (
      <MyBox>
        <div>
          <Header />
          <Grid
            alignItems="center"
            alignContent="center"
            container
            direction="row"
            justify="center"
            alignItems="center"
            justify="center"
          >
            <Mypaper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://scontent.famm9-1.fna.fbcdn.net/v/t1.0-9/144436222_942272606579939_9019314260912267252_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_eui2=AeHJK8uAV-ooiHusZuJY9wC37qkhcc9zS1zuqSFxz3NLXN3OYeTQy567Hjg1L9Ujuu5NIgwT_cGJgCxPtoZiR1pN&_nc_ohc=Qgiw0GzAIGMAX_y6sck&_nc_ht=scontent.famm9-1.fna&oh=cabc7749e45cd36325d989900fa93688&oe=603AB14D"
                  width="150"
                  height="70"
                ></img>
              </div>
              <form>
                <MyInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleUsername.bind(this)}
                />
                <div style={{ color: "red" }}>{this.state.usernameError}</div>
                <MyInput
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword.bind(this)}
                />
                <div style={{ color: "red" }}>{this.state.passwordError}</div>
                <Link href="/signup">
                  <Typography style={{ margin: "10px 30px 40px 50px" }}>
                    Create account?..
                  </Typography>
                </Link>
                <MyButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.handleClick.bind(this)}
                >
                  Log In
                </MyButton>
                <br></br>
              </form>
            </Mypaper>
          </Grid>
          <Typography
            style={{ backgroundColor: "#F9FBE7", color: "#0A194F" }}
            align="center"
            variant="subtitle1"
            color="inherit"
          >
            &copy;{new Date().getFullYear()} CarSooq | All right reserved |
            Terms Of Service | Privacy
          </Typography>
        </div>
      </MyBox>
    );
  }
}
