import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { Button, Media, Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import "./signUp.css";
import SignUp from "./index";

const BeforeSignUp = () => {
  const [state, setState] = useState("");
  const history = useHistory();
  localStorage.setItem("status", state);

  const stateForSignUp = async (e) => {
    await setState(e.target.value);
    history.push(`/register/${e.target.value}`);
  };

  const stateForSignUpImages = async (e) => {
    await setState(e.target.alt);
    history.push(`/register/${e.target.alt}`);
  };

  return (
    <div className=" classImage">
      <div className="SignUpSelect">
        <h2 className="RegisterSelectSignUp"> SignUp </h2>
        <Container>
          <Row className="RegisterSelect">
            <Col xs={6} md={4}>
              <Media>
                <img
                  width={64}
                  height={64}
                  className="mr-3 pointer"
                  src="https://i.ibb.co/8YPsDH5/man-1.png"
                  alt="user"
                  rounded
                  onClick={stateForSignUpImages}
                />
              </Media>
            </Col>
            <Col xs={6} md={4}>
              <Media>
                <img
                  width={64}
                  height={64}
                  className="mr-3 pointer"
                  src="https://i.ibb.co/f2twS8g/coach.png"
                  alt="coach"
                  rounded
                  onClick={stateForSignUpImages}
                />
              </Media>
            </Col>
            <Col xs={6} md={4}>
              <Media>
                <img
                  width={64}
                  height={64}
                  className="mr-3 pointer"
                  src="https://i.ibb.co/MCfGZv2/gym-2.pnggit "
                  alt="gym"
                  rounded
                  onClick={stateForSignUpImages}
                />
              </Media>
            </Col>
          </Row>
          <Row className="RegisterSelect">
            <Col xs={6} md={4}>
              <Media>
                <Media.Body>
                  <Button className="marg pointer styleButton2" variant="dark" type="button" value="user" onClick={stateForSignUp}>User</Button>
                </Media.Body>
              </Media>
            </Col>
            <Col xs={6} md={4}>
              <Media>
                <Media.Body>
                  <Button className="marg pointer styleButton2" variant="dark" type="button" value="coach" onClick={stateForSignUp}>Coach</Button>
                </Media.Body>
              </Media>
            </Col>
            <Col xs={6} md={4}>
              <Media>
                <Media.Body>
                  <Button className="marg pointer styleButton2" variant="dark" type="button" value="gym" onClick={stateForSignUp}>Gym</Button>
                </Media.Body>
              </Media>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default BeforeSignUp;
