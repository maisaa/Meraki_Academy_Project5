import React from "react";
import { Route, Switch } from "react-router-dom";
//component
import SignUp from "./components/auth/signUp";
import BeforeSignUp from "./components/auth/signUp/signUp";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/register" component={BeforeSignUp} />
      <Route path="/register/:id" component={SignUp} />
    </div>
  );
};

export default App;
