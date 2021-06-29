import React from "react";
import { Route, Switch } from "react-router-dom";

//component
import SignUp from "./components/auth/signUp";
import BeforeSignUp from "./components/auth/signUp/signUp";
import Login from "./components/auth/login/index";
import Members from "./components/members/members";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/register" component={BeforeSignUp} />
      <Route path="/register/:id" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/allMembers" component={Members} />
    </div>
  );
};

export default App;
