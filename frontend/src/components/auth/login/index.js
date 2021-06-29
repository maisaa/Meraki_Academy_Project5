import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { setToken } from '../../../reducers/login';

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // const state = useSelector((state) => { return { token: state.loginReducer.token } });
    useEffect(() => {
        saveToken(localStorage.getItem('token'));
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    //this function to handle the submitted form
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', { email, password })
            .then((result) => {
                if (result.status === 200) {
                    saveToken(result.data);
                    setLoggedIn(true);
                    history.push('/dashboard');
                }
            })
            .catch((err) => {
                setMessage(err.response.data);
            })
    }
    //this function to logout user and clear the localStorage
    function logout() {
        setLoggedIn(false);
        localStorage.clear();
    }
    //this function to save the token in the localStorage
    function saveToken(token) {
        const user = jwt.decode(token);
        if (user) {
            dispatch(setToken(token));
            setUserId(user.userId);
            localStorage.setItem('token', token)
        }
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

