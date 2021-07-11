import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import axios from "axios";
import { setToken } from "../../../reducers/login";
import GoogleLogin from "react-google-login";
import { Form, Button, Image } from "react-bootstrap";
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
        setMessage(err.response);
      });
  };
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <>
      <div className="Login body1">
        <div className="container">
          <Form onSubmit={handleSubmit}>
            <h2 className="TextStyle">Login</h2>
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
                className="styleButton1"
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
            <Form.Label >
              {message && <div  >{message}</div>}
            </Form.Label>
          </Form>
          <div>
          <Image className="loginImage" src="https://i.ibb.co/QdMHGDn/logan-weaver-p-YQ2-ASycjg-I-unsplash.jpg" alt="logan-weaver-p-YQ2-ASycjg-I-unsplash" border="0" rounded />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// <div className="Login body1">
//       <section class="u-align-center u-clearfix u-grey-5 u-valign-middle u-section-1" id="carousel_fff8">
//       <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
//         <div class="u-layout">
//           <div class="u-layout-row">
//             <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-30 u-white u-layout-cell-1">
//               <div class="u-container-layout u-valign-middle u-container-layout-1">
//                 <h2 class="u-custom-font u-font-pt-sans u-text u-text-1">Get a demo</h2>
//                 <p class="u-large-text u-text u-text-grey-50 u-text-variant u-text-2">
//                   Amet tellus cras adipiscing enim eu turpis egestas pretium. At quis risus sed vulputate odio ut.
//                 </p>
//                 <div class="u-expanded-width u-form u-form-1">

//                 </div>
//               </div>
//             </div>
//             <div
//               class="
//                 u-align-left u-container-style u-layout-cell u-palette-4-light-2 u-right-cell u-size-30 u-layout-cell-2
//               "
//             >
//               <div
//                 class="
//                   u-container-layout
//                   u-valign-middle-lg
//                   u-valign-middle-md
//                   u-valign-middle-sm
//                   u-valign-middle-xl
//                   u-container-layout-2
//                 "
//               >
//                 <p class="u-text u-text-palette-4-dark-1 u-text-3">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//                   dolore magna aliqua. Egestas maecenas pharetra convallis posuere morbi.
//                 </p>

//                 <h4 class="u-text u-text-palette-4-base u-text-4">Mikkel Smith</h4>
//                 <h5 class="u-text u-text-palette-4-base u-text-5">Sales Manager</h5>
//                 <p class="u-text u-text-palette-4-dark-2 u-text-6">
//                   Quis viverra nibh cras pulvinar mattis. Ornare arcu dui vivamus arcu felis bibendum ut tristique.<br />
//                   <br />Image from
//                   <a
//                     href="https://freepik.com/photos/people"
//                     class="
//                       u-active-none
//                       u-border-1
//                       u-border-palette-4-base
//                       u-btn
//                       u-button-link
//                       u-button-style
//                       u-hover-none
//                       u-none
//                       u-text-palette-4-dark-2
//                       u-btn-2
//                     "
//                     >Freepik</a
//                   >
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     <footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5d2c"><div class="u-clearfix u-sheet u-sheet-1">
//         <p class="u-small-text u-text u-text-variant u-text-1">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
//       </div></footer>
//     <section class="u-backlink u-clearfix u-grey-80">
//       <a class="u-link" href="https://nicepage.com/website-templates" target="_blank">
//         <span>Web Templates</span>
//       </a>
//       <p class="u-text">
//         <span>created with</span>
//       </p>
//       <a class="u-link" href="https://nicepage.com/" target="_blank">
//         <span>Website Builder Software</span>
//       </a>. 
//     </section>
//       </div>