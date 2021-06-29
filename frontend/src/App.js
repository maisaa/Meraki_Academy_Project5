import React from "react";
import { Route, Switch } from "react-router-dom";

//component
import SignUp from "./components/auth/signUp";
import BeforeSignUp from "./components/auth/signUp/signUp";
import Login from './components/auth/login/index';
import Navigation from './components/navigation/index';
import Dashboard from './components/dashboard/index';

const App = () => {

	return (
		<div className="App">
			<Navigation />
			<Route exact path="/register" component={BeforeSignUp} />
			<Route path="/register/:id" component={SignUp} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/dashboard" component={Dashboard} />
		</div>
	);
};

export default App;
