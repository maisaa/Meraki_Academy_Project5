import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGymOrCoach, setGymOrCoachPost } from "./../../reducers/infoGymCoch";
import { useHistory, useParams } from "react-router-dom";

// import {}

const GymAndCouch = ({ id }) => {
  // const decoratedOnClick = useAccordionToggle(eventKey, onClick);
  const history = useHistory();
  const role = useParams().id;
  console.log("role", role);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      GymOrCouch: state.infoGymCochReducer.GymOrCouch,
      allPosts: state.infoGymCochReducer.allPosts,
    };
  });

  const getSportByType = () => {
    axios.get(`http://localhost:5000/usersInfo/${role}`).then((result) => {
      console.log("result.data", result.data[0]);
      dispatch(setGymOrCoach(result.data));
    });
  };
  const getAllPosts = () => {
    axios.get(`http://localhost:5000/usersPost1/${role}`).then((result) => {
      console.log("result.data2", result.data);
      dispatch(setGymOrCoachPost(result.data));
    });
  };

  useEffect(async () => {
    getSportByType();
    getAllPosts();
  }, []);
  return (
    <div className="GymCooch">
      <img src={state.GymOrCouch && state.GymOrCouch[0].image}></img>
      First Name : <p>{state.GymOrCouch && state.GymOrCouch[0].firstName}</p>
      <p>add to favorite </p>
      description : <p>{state.GymOrCouch && state.GymOrCouch[0].description}</p>
      <button>video call</button>
      <button>chat</button>
      <div>
        All Posts :{" "}
        {state.allPosts &&
          state.allPosts.map((ele) => {
            return <p>{ele.post}</p>;
          })}
      </div>
    </div>
  );
};

export default GymAndCouch;
