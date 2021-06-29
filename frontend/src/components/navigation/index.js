import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {

	const state = useSelector(state => { return { token: state.loginReducer.token } });

	return <div className="App">Navigation component
		{!state.token ? <Link to='/register'>Register</Link>: ''}
        {!state.token ? <Link to='/login'>Login</Link>: ''}
		{state.token ? <Link to='/dashboard'>Dashboard</Link>: ''}
		
	</div>;
};

export default Navigation;
