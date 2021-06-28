import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
      const newUser = { firstName, lastName, age, country, email, password, role_id, sport_id };
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
    <div className="register">
      {role === "user" ? (
        <div className="main">
          <form className="Profile" onSubmit={handelSubmit}>
            <h3 className="nameProfile"> SignUp </h3>
            <div>
              <input type="text" placeholder="First Name here" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <input type="text" placeholder="Last Name here" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <input type="Number" placeholder="Age here" onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <input type="text" placeholder="Country here" onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
              <input type="text" placeholder="Email here" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" placeholder="Password here" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <button className="button4">SignUp</button>
            </div>
            <div>{message && <div> {message} </div>}</div>
            <div></div>
          </form>
        </div>
      ) : role === "gym" || "couch" ? (
        <div>
          {" "}
          <div className="main">
            <form className="Profile" onSubmit={handelSubmit}>
              <h3 className="nameProfile"> SignUp </h3>
              <div>
                <input type="text" placeholder="First Name here" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <input type="text" placeholder="Last Name here" onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div>
                <input type="Number" placeholder="Age here" onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <input type="text" placeholder="Country here" onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div>
                <input type="text" placeholder="Email here" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <input type="password" placeholder="Password here" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <select
                  type="select"
                  onClick={async (e) => {
                    SportType();
                    await setSport_id(e.target.value);
                  }}
                >
                  {}
                  {state1.map((ele) => {
                    return <option value={ele.sport_id}>{ele.type}</option>;
                  })}
                </select>
              </div>
              <div>
                <button className="button4">SignUp</button>
              </div>
              <div>{message && <div> {message} </div>}</div>
              <div></div>
            </form>
          </div>
        </div>
      ) : (
        <div>none</div>
      )}
    </div>
  );
};

export default SignUp;
