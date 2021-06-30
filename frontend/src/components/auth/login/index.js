import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { setToken } from '../../../reducers/login';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    //this function to handle the submitted form
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', { email, password })
            .then((result) => {
                if (result) {
                    const user = jwt.decode(result.data);
                    dispatch(setToken({ token: result.data, user, loggedIn: true }))
                    localStorage.setItem('token', result.data);
                    setMessage("The user has been loggedIn successfully ");
                    setTimeout(function () {
                        history.push('/dashboard');
                    }, 2000);
                } else {
                    setMessage("Error happened while login, please try again");
                }
            })
            .catch((err) => {
                setMessage(err.response);
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="email here"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password here"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <div>{message}</div>}
        </>
    );
}

export default Login;

