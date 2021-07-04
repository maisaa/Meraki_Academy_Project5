import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllGymOrCoach } from "./../../reducers/gym&couch";
import { useHistory, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

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
    axios
      .get(`http://localhost:5000/usersByRole?roleId=${roleId}&type=${type}`)
      .then((result) => {
        dispatch(setAllGymOrCoach(result.data, role));
      });
  };

  useEffect(async () => {
    getSportByType();
  }, []);
  return (
    <div className="GymOrCooch">
      <p></p>
      <div></div>
      {state.allGymOrCouch &&
        state.allGymOrCouch.map((ele, i) => {
          return (
            <div key={i}>
              <img
                src={ele.image}
                onClick={() => {
                  history.push(`/info/${ele.user_id}`);
                }}
              ></img>
              Name: <p>{ele.firstName}</p>
              Rate: <p>{ele.rate}</p>
            </div>
          );
        })}
    </div>
  );
};

export default GymAndCouch;
