import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setSports } from '../../reducers/sports';

const Dashboard = () => {
	const state = useSelector(state => { return { token: state.loginReducer.token, sports: state.sportReducer.sports } })
	const dispatch = useDispatch();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		axios.get("http://localhost:5000/sports")
			.then((result) => {
				dispatch(setSports(result.data));
			});
		const user = jwt.decode(state.token);
		if (user) {
			setUserId(user.userId);
		}
	}, []);

	return <div className="App"> 
		<h2>Dashboard</h2>
		<h3>All sports</h3>
		<div>{state.sports.map((elem, i) => (
			<div key={i}>
				<p >Sport type:{elem.type}</p>
				<p >Sport type:{elem.description}</p>
				<img  src={elem.photo} alt={elem.type} height="100" width="100" />	
			</div>
		))}</div>
	</div>;
};

export default Dashboard;
