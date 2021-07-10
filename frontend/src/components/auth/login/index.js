import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import axios from "axios";
import { setToken } from "../../../reducers/login";
import GoogleLogin from "react-google-login";
import { Form, Button } from "react-bootstrap";
import "./login.css";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      user: state.loginReducer.user,
      loggedIn: state.loginReducer.loggedIn,
      sports: state.sportReducer.sports,
    };
  });

  const loginWithGoogle = (response) => {
    //go data base and save the response if the response
    // exists login directly if not signup this user
    // in data base and put the role_id is 2 like user
    localStorage.setItem("token", response.accessToken);
    dispatch(setToken({ token: response.accessToken, loggedIn: true }));
    history.push("/");
  };

  useEffect(() => {
    loggedOut();
  }, []);

  const loggedOut = () => {
    localStorage.clear();
    dispatch(setToken({ token: "", user: {}, loggedIn: false }));
  };
  //this function to handle the submitted form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log("result", result);
        if (result) {
          const user = jwt.decode(result.data);
          dispatch(setToken({ token: result.data, user, loggedIn: true }));
          localStorage.setItem("token", result.data);
          setMessage("The user has been loggedIn successfully ");
          setTimeout(function () {
            history.push("/dashboard");
          }, 2000);
        } else {
          setMessage("Error happened while login, please try again");
        }
      })
      .catch((err) => {
        setMessage("The Email Or password is incorrect");
      });
  };
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <>
      <div className="Login body1">
        <div className="styleLogin">
          <Form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Form.Group size="lg" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group size="lg" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Button
                size="lg"
                variant="dark"
                type="submit"
                className="pointer marg styleButton1"
              >
                Login
              </Button>
            </Form.Group>
            <GoogleLogin
              clientId="701876201185-nj6jqs8eqjrehl98410phe5vu3spjfgb.apps.googleusercontent.com"
              buttonText="login with google"
              onSuccess={loginWithGoogle}
              onFailure={loginWithGoogle}
              cookiePolicy={"single_host_origin"}
              className="pointer marg styleButton1"
            />
            <Form.Label>{message && <div>{message}</div>}</Form.Label>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
