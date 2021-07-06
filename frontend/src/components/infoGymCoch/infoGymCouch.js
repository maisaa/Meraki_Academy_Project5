import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGymOrCoach, setGymOrCoachPost } from "./../../reducers/infoGymCoch";
import { AddComment, setComment } from "./../../reducers/commints";
import { useHistory, useParams } from "react-router-dom";

// import {}

const GymAndCouchInfo = ({ id }) => {
  const [comments, setAComments] = useState("");
  // const decoratedOnClick = useAccordionToggle(eventKey, onClick);
  const history = useHistory();
  const role = useParams().id;
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      GymOrCouch: state.infoGymCochReducer.GymOrCouch,
      allPosts: state.infoGymCochReducer.allPosts,
      comments: state.commentsReducer.comments,
    };
  });

  const getSportByType = () => {
    axios.get(`http://localhost:5000/usersInfo/${role}`).then((result) => {
      dispatch(setGymOrCoach(result.data));
     
    });
  };
  const getAllPosts = () => {
    axios.get(`http://localhost:5000/usersPost1/${role}`).then((result) => {
      // console.log("result.data2", result.data);
      dispatch(setGymOrCoachPost(result.data));
      result.data.map((ele) => {
        axios.get(`http://localhost:5000/comments/${ele.post_id}/`).then((result) => {
          result.data.map((elm) => {
            dispatch(setComment([{ postID: ele.post_id, comment: elm.comment, firstName: elm.firstName }]));
          });
        });
      });
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
            return (
              <div>
                <p>{ele.post}</p>
                <p>
                  Comments :{" "}
                  {state.comments &&
                    state.comments.map((elem) => {
                      if (elem[0].postID === ele.post_id) {
                        return (
                          <div>
                            <p>{elem[0].firstName}</p>
                            <p>{elem[0].comment}</p>
                          </div>
                        );
                      }
                    })}
                </p>
                <input
                  onChange={(e) => {
                    setAComments(e.target.value);
                  }}
                  placeholder="comment here"
                ></input>
                <button
                  onClick={() => {
                    dispatch(
                      AddComment([
                        {
                          postID: ele.post_id,
                          comment: comments,
                          // firstName: elm.firstName,
                        },
                      ])
                    );
                  }}
                >
                  add commints
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GymAndCouchInfo;
