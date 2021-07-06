import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSports, getSport } from '../../reducers/sports';
import { setToken } from '../../reducers/login';
import { useHistory } from "react-router-dom";
import {Carousel } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import './dashboard.css'

const Dashboard = () => {
	const [type, setType] = useState("");
	const history = useHistory();
	localStorage.setItem("type", type);

	const state = useSelector(state => {
		return {
			token: state.loginReducer.token,
			user: state.loginReducer.user,
			loggedIn: state.loginReducer.loggedIn,
			sports: state.sportReducer.sports
		}
	})
	const dispatch = useDispatch();
	useEffect(() => {
		getAllSports();
		saveToken(localStorage.getItem('token'));
	}, []);

	function saveToken(token) {
		const user = jwt.decode(token);
		console.log('token decoded', user)
		if (user) {
			dispatch(setToken({ token, user, loggedIn: true }));
		}
	}

	const getAllSports = () => {
		axios.get("http://localhost:5000/sports")
			.then((result) => {
				if (result.length !== 0) {
					dispatch(setSports(result.data));
				} else {
					return 'No Sports are found'
				}
			}).catch((err) => {
				throw err;
			});
	}

	const getSportByType = (e) => {
		axios.get(`http://localhost:5000/sport/${e.target.value}`)
			.then((result) => {
				setType(e.target.value);
				dispatch(setSports(result.data));
				history.push(`/sports`);
				console.log("result.data....dashboard....", result.data)
			})
	}

	// you could see the state by 
	console.log('úser', state)
	return <>
		<Carousel fade>
			<Carousel.Item>
				<img
					className="d-block w-100 imgH"
					src= 'https://www.davidlloyd.co.uk/cms/images/softwire-david-lloyd/image/upload/f_auto/v1/Tennis/tennis-hero.jpg'
					alt="Tennis"
				/>
				<Carousel.Caption>
					<h3>Tennis</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 imgH"
					src="https://www.tributeboxing.com.au/uploads/slideshow/1536301415qkedwof37eb8x3o8qejg0s80h2s4kd.jpg"
					alt="Boxing"
				/>
				<Carousel.Caption>
					<h3>Boxing</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 imgH"
					src="https://www.runtastic.com/blog/wp-content/uploads/2018/05/thumbnail_1200x800-1-1024x683.jpg"
					alt="Running"
				/>
				<Carousel.Caption>
					<h3>Running</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 imgH"
					src="https://www1.health.gov.au/internet/main/publishing.nsf/AttachmentsByTitle/sport-national-integrity-of-sport-unit-carousel-images/$FILE/10612%20Sport%20images19.jpg"
					alt="Swimming"
				/>
				<Carousel.Caption>
					<h3>Swimming</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 imgH"
					src="https://www.polar.com/sites/default/files/static/categories/team_sports-desktop.jpg"
					alt="Football"
				/>
				<Carousel.Caption>
					<h3>Football</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 imgH"
					src="https://www.polar.com/sites/default/files/static/categories/team_sports-desktop.jpg"
					alt="Football"
				/>
				<Carousel.Caption>
					<h3>Football</h3>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
		<div className="App">
			<h2>Dashboard  for user with Id (  {state.user.userId} )</h2>
			<h3>All sports</h3>
			<div>{state.sports.map((elem, i) => (
				<div key={i}>
					<p >Sport type:{elem.type}</p>
					<p >Sport type:{elem.description}</p>
					<img src={elem.photo} alt={elem.type} height="100" width="100" />
					<input type="button" value={elem.type} onClick={getSportByType}></input>
				</div>
			))}</div>
		</div> 
	</>;
};

export default Dashboard;

