import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
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

  return (
    <div>
      <h3>signUp</h3>
      <input type="button" value="user" onClick={stateForSignUp}></input>
      <input type="button" value="gym" onClick={stateForSignUp}></input>
      <input type="button" value="couch" onClick={stateForSignUp}></input>
    </div>
  );
};
export default BeforeSignUp;
