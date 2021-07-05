import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormControl, Form, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import "./navigation.css"

const Navigation = () => {

	const state = useSelector(state => { return { token: state.loginReducer.token } });

	return <>
		{/* <div className="App">Navigation component
			{!state.token ? <Link to='/register'>Register</Link> : ''}
			{!state.token ? <Link to='/login'>Login</Link> : ''}
			{state.token ? <Link to='/dashboard'>Dashboard</Link> : ''}
		</div> */}
		<Navbar className="colorNav" expand="lg">
			<Navbar.Brand href="#home">Terminators</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link >{!state.token ? <Link to='/register'>Register</Link> : ''}</Nav.Link>
					<Nav.Link >{!state.token ? <Link to='/login'>Login</Link> : ''}</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item >{state.token ? <Link to='/dashboard'>Dashboard</Link> : ''}</NavDropdown.Item>
						<NavDropdown.Item >Profile</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item >Favorite</NavDropdown.Item>
						<NavDropdown.Item >{state.token ? <Link to='/login'>LogOut</Link> : ''}</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="primary">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	</>;
};

export default Navigation;
