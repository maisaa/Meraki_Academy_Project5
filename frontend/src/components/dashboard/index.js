import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSports, getSport } from "../../reducers/sports";
import { setToken } from "../../reducers/login";
import { useHistory } from "react-router-dom";
import Footer from "./../footer/index";
import { Carousel, Card, Button, Row, Col } from "react-bootstrap";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./dashboard.css";
import Images from "./../image/image";

const Dashboard = () => {
  const [type, setType] = useState("");
  const history = useHistory();
  localStorage.setItem("type", type);
  const icons = ["https://i.ibb.co/CK5npv6/humanpictos.png",
    "https://i.ibb.co/QM6f5gN/gloves.png",
    "https://i.ibb.co/XyLbknY/tennis.png",
    "https://i.ibb.co/gZ5vWbM/running.png",
    "https://i.ibb.co/Q9JrL0D/pilates.png",
    "https://i.ibb.co/StYs4M5/pilates-1.png"];

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      user: state.loginReducer.user,
      loggedIn: state.loginReducer.loggedIn,
      sports: state.sportReducer.sports,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getAllSports();
    saveToken(localStorage.getItem("token"));
  }, []);

  function saveToken(token) {
    const user = jwt.decode(token);
    console.log("token decoded", user);
    if (user) {
      dispatch(setToken({ token, user, loggedIn: true }));
    }
  }

  const getAllSports = () => {
    axios
      .get("http://localhost:5000/sports")
      .then((result) => {
        if (result.length !== 0) {
          dispatch(setSports(result.data));
        } else {
          return "No Sports are found";
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const getSportByType = (e) => {
    axios.get(`http://localhost:5000/sport/${e.target.id}`).then((result) => {
      setType(e.target.id);
      dispatch(setSports(result.data));
      history.push(`/sports`);
      console.log("result.data....dashboard....", result.data);
    });
  };

  const getSportByTypeImage = (e) => {
    axios.get(`http://localhost:5000/sport/${e.target.alt}`).then((result) => {
      setType(e.target.alt);
      dispatch(setSports(result.data));
      history.push(`/sports`);
      console.log("result.data....dashboard....", result.data);
    });
  };


  // you could see the state by
  console.log("úser", state);
  return (
    <>
      <Images />
      <div className="borderStyleAll">
        <div className="bigTittle2"> m o v e d  &nbsp; &nbsp; c l u b</div>
        <div className="bigTittle">REACH YOUR GOALS‎</div>
        <div className="borderStyleT"></div>
      </div>
      <div className="padd">
        <Row md={3} className="g-4" style={{ padding: "0rem", margin: "2rem" }}>
          {state.sports.map((elem, i) => (
            <Col>
              <Card
                style={{ width: "28rem", margin: "2rem", height: "25rem" }}
                className="newMarg"
              >
                <Card.Img
                  variant="top"
                  src={icons[i]}
                  alt={elem.type}
                  className="imageCard pointer"
                  onClick={getSportByTypeImage}
                />
                <Card.Body>
                  <Card.Title
                    id={elem.type}
                    onClick={getSportByType}
                    className="pointer boldStyle"
                  >
                    {elem.type}
                  </Card.Title>
                  <Card.Text className="descriptionStyle">
                    {elem.description}
                  </Card.Text>
                  <Button variant="outline-dark" className="buttonStyleHome"  onClick={getSportByType}>more </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />

      {/* <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 imgH"
            src="https://www.davidlloyd.co.uk/cms/images/softwire-david-lloyd/image/upload/f_auto/v1/Tennis/tennis-hero.jpg"
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
            src="https://cdn.workgreat.orchardroad.org/wp-content/uploads/2018/04/Battle-Ropes-900x450.jpg"
            alt="Gym"
          />
          <Carousel.Caption>
            <h3>Gym</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
    </>
  );
};

export default Dashboard;
