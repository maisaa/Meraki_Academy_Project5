import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { CardDeck, Card, Button } from "react-bootstrap";
import axios from "axios";
import "./signUp.css";
import SignUp from "./index";

const BeforeSignUp = () => {
  const [state, setState] = useState("");
  const history = useHistory();
  localStorage.setItem("status", state);

  const stateForSignUpImages = async (e) => {
    await setState(e.target.alt);
    history.push(`/register/${e.target.alt}`);
  };

  return (
    <div className="classImage">
      <div className="SignUpSelect">
        <p className="RegisterSelectSignUp"> Now you can join us </p>
        <CardDeck className='CardDeckMarg'>
          <Card>
            <Card.Img variant="top" className="imageCard pointer" src="https://i.ibb.co/gZ5vWbM/running.png" alt="user"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body>
              <Card.Title>User</Card.Title>
              <Card.Text>
                register with us to get the pest experience from our professional coaches and private subscriptions from top Gyms.
              </Card.Text>
              <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">+1500 Users</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" className="imageCard pointer" src="https://i.ibb.co/gZ5vWbM/running.png" alt="coach"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body>
              <Card.Title>Coach</Card.Title>
              <Card.Text>
                join our team of the top professional coaches and enjoy the flexibility of working hours.
              </Card.Text>
              <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">+100 Coaches</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" className="imageCard pointer" src="https://i.ibb.co/gZ5vWbM/running.png" alt="gym"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body>
              <Card.Title>Gym</Card.Title>
              <Card.Text>
                .
              </Card.Text>
              <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">+10 Gyms</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    </div>
  );
};
export default BeforeSignUp;
