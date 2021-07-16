import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllGymOrCoach } from "./../../reducers/gym&couch";
import { useHistory, useParams } from "react-router-dom";
import { setSports } from "./../../reducers/sports";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import "./gym.css";
import img66 from "../sport/images/1.jpeg";
// import {}

const GymAndCouch = ({ id }) => {
  // const decoratedOnClick = useAccordionToggle(eventKey, onClick);
  const history = useHistory();
  const role = useParams().id;
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      allGymOrCouch: state.GymOrCouchReducer.allGymOrCouch,
    };
  });

  const getSportByType = () => {
    const roleId = role;
    const type = localStorage.getItem("type");
    axios.get(`/usersByRolee?roleId=${roleId}&type=${type}`).then((result) => {
      dispatch(setAllGymOrCoach(result.data, role));
    });
  };

  useEffect(() => {
    getSportByType();
  }, []);

  return (
    <section className="hero-section">
      <div className="card1-grid">
        {state.allGymOrCouch &&
          state.allGymOrCouch.map((ele, i) => {
            const divStyle = {
              backgroundImage: `url(${ele.image})`,
            };
            return (
              <Link class="card1" href="#">
                <div
                  onClick={() => {
                    history.push(`/info/${ele.user_id}`);
                  }}
                  class="card1__background"
                  style={divStyle}
                ></div>
                <div class="card1__content">
                  {/* <h3 class="card1__category">Rate : {ele.rate} /5</h3> */}
                  <h3 class="card1__heading"> {ele.firstName}</h3>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default GymAndCouch;
