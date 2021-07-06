import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch111 } from "./../../reducers/search";
import axios from "axios";
import { FormControl, Form, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "./navigation.css";

const Navigation = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return { token: state.loginReducer.token };
  });

  const searchFun = async () => {
    const searchedGym = await axios.post("http://localhost:5000/search", {
      firstName: search,
    });
    if (searchedGym.data[0]) {
      dispatch(setSearch111(searchedGym.data));
      history.push("/search");
    } else {
      history.push("/search");
    }
  };

  return (
    <>  
      <Navbar className="colorNav fixedNav" expand="lg">
        <Navbar.Brand href="#home">Terminators</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>{!state.token ? <Link to="/register">Register</Link> : ""}</Nav.Link>
            <Nav.Link>{!state.token ? <Link to="/login">Login</Link> : ""}</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>{state.token ? <Link to="/dashboard">Dashboard</Link> : ""}</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Favorite</NavDropdown.Item>
              <NavDropdown.Item>{state.token ? <Link to="/login">LogOut</Link> : ""}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button onClick={searchFun} variant="primary">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
