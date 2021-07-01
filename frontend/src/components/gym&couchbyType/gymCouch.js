import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllGymOrCoach } from "./../../reducers/gym&couch";

import { useParams } from "react-router-dom";
const GymAndCouch = ({ id }) => {
  const ll = useParams().id;
  console.log("ll", ll);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      allGymOrCouch: state.GymOrCouchReducer.allGymOrCouch,
    };
  });
  useEffect(async () => {
    const allUsers = await axios.get("http://localhost:5000/users");
    console.log("allUsers", allUsers.data);
    dispatch(setAllGymOrCoach(allUsers.data));
  }, []);
  return (
    <div className="Gym">
      {state.allGymOrCouch.map((ele, i) => {
        return (
          <div key={i}>
            <p>{ele.firstName}</p>
            <p>{ele.user_id}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GymAndCouch;
