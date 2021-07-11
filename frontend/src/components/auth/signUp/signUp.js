import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
      <div className="SignUpSelect">
        <h2 className="RegisterSelectSignUp"> Join us </h2>
        <CardDeck className='CardDeckMarg'>
          <Card>
            <Card.Img variant="top" className="imageCard pointer" src="https://i.ibb.co/2SjTSgD/man-2.png" alt="user"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body>
              <Card.Title>User</Card.Title>
              <Card.Text>
                register with us to get the pest experience from our professional coaches and private subscriptions from top Gyms.
              </Card.Text>
              {/* <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button> */}
            </Card.Body>
            <Card.Footer>
            <Button variant="outline-dark" className="buttonStyleHome " onClick={stateForSignUpImages}>join </Button>
              <small className="text-muted textLeft">+1500 Users</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" className="imageCard pointer c" src="https://i.ibb.co/sKdMB2g/coach-1.png" alt="coach"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body>
              <Card.Title>Coach</Card.Title>
              <Card.Text>
                join our team of the top professional coaches and enjoy the flexibility of working hours.
              </Card.Text>
              {/* <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button> */}
            </Card.Body>
            <Card.Footer>
              <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button>
              <small className="text-muted textLeft">+100 Coaches</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" className="imageCard pointer c" src="https://i.ibb.co/Bz92vLs/gym-3.png" alt="gym"
              rounded
              onClick={stateForSignUpImages} />
            <Card.Body>
              <Card.Title>Gym</Card.Title>
              <Card.Text>
                register with us as a gym to join the best group of top professional Gyms. And get our marketing services. 
              </Card.Text>
              {/* <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button> */}
            </Card.Body>
            <Card.Footer>
            <Button variant="outline-dark" className="buttonStyleHome" onClick={stateForSignUpImages}>join </Button>
              <small className="text-muted textLeft">+10 Gyms</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
  );
};
export default BeforeSignUp;
