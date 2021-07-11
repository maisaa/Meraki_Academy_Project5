import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import "./signUp.css";

const SignUp = ({ id }) => {
  const role = useParams().id;
  const history = useHistory();
  let role_id;
  role === "user" ? (role_id = 2) : role === "gym" ? (role_id = 3) : (role_id = 4);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sport_id, setSport_id] = useState(0);
  const [state1, setState1] = useState([]);
  const state = localStorage.getItem("status");

  async function addNewUser() {
    try {
      const newUser = {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role_id,
        sport_id,
      };
      //client validation
      if (!firstName || !lastName || !country || !age || !email || !password) {
        setMessage("Please fill all the info");
      } else {
        await axios.post("http://localhost:5000/register", newUser).then((response) => {
          if (response) {
            setMessage("The user has been created successfully ");
            setTimeout(function () {
              history.push("/login");
            }, 2000);
          } else {
            setMessage("Error happened while register, please try again");
          }
        });
      }
    } catch (error) {
      setMessage("Error 5000 happened while register, please try again");
      throw error;
    }
  }
  const handelSubmit = (e) => {
    e.preventDefault();
    addNewUser();
  };

  const SportType = () => {
    axios.get("http://localhost:5000/sports").then((response) => {
      setState1(response.data);
    });
  };
  return (

    <div className="SignUp body1">
      {role === "user" ? (
        <div className="SignUpUser " >
          <Form onSubmit={handelSubmit}>
            <h2 > SignUp </h2>
            <Form.Group size="lg" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="Number" placeholder="Enter Age" name="age" onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter Country" name="Country" onChange={(e) => setCountry(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Button className="marg styleButton2" size="lg" variant="dark" type="submit" >
                SignUp
              </Button>
            </Form.Group>
            <div className="tostMassage" >
              <Form.Label >
                {message && <div  >{message}</div>}
              </Form.Label>
            </div>
          </Form>
        </div>
      ) : role === "gym" || "couch" ? (
        <div className="SignUpGymCoach">
          <Form onSubmit={handelSubmit}>
            <h2 > SignUp </h2>
            <Form.Group size="lg" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="Number" placeholder="Enter Age" name="age" onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter Country" name="Country" onChange={(e) => setCountry(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group size="lg" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Sport Type select</Form.Label>
              <Form.Control as="select" onClick={async (e) => { SportType(); await setSport_id(e.target.value); }}>
                {state1.map((ele, i) => { return <option key={i} value={ele.sport_id}>{ele.type}</option>; })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button className="marg styleButton2" size="lg" variant="dark" type="submit" >
                SignUp
              </Button>
            </Form.Group>
            <Form.Label >
              {message && <div  >{message}</div>}
            </Form.Label>
            <div></div>
          </Form>
        </div>
      ) : (
        <div>none</div>
      )}
    </div>
  );
};

export default SignUp;
