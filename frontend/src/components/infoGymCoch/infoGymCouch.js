import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGymOrCoach } from "./../../reducers/infoGymCoch";
import { useHistory, useParams } from "react-router-dom";

// import {}

const GymAndCouch = ({ id }) => {
  // const decoratedOnClick = useAccordionToggle(eventKey, onClick);
  const history = useHistory();
  const role = useParams().id;
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      GymOrCouch: state.infoGymCochReducer.GymOrCouch,
    };
  });

  const getSportByType1 = () => {
    const roleId = role;
    const type = localStorage.getItem("type");
    axios.get(`http://localhost:5000/usersInfo/${role}`).then((result) => {
      console.log("result.data", result.data[0]);
      dispatch(setGymOrCoach(result.data));
    });
  };

  useEffect(async () => {
    getSportByType1();
  }, []);
  return (
    <div className="GymCooch">
      <img src={state.GymOrCouch && state.GymOrCouch[0].image}></img>
      First Name : <button>{state.GymOrCouch && state.GymOrCouch[0].firstName}</button>
      <button>add to favorite </button>
      Description : <p>{state.GymOrCouch && state.GymOrCouch[0].firstName}</p>
      <button>video call</button>
      <button>chat</button>
      <div>post</div>
    </div>
  );
};

export default GymAndCouch;
