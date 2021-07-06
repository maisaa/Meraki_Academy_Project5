import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGymOrCoach, setGymOrCoachPost } from "./../../reducers/infoGymCoch";
import { AddComment, setComment } from "./../../reducers/commints";
import { useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";
import jwt from "jsonwebtoken";
let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);
//gymInfo
const GymAndCouchInfo = ({ id }) => {
  const [comments, setAComments] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
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
  /////socket io
  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  const connectToRoom = () => {
    //role = rome number
    socket.emit("join_room", role); //raise event
  };

  const sendMessage = () => {
    const user = jwt.decode(state.token);
    const messageContent = {
      role,
      content: {
        author: user.firstName,
        message,
      },
    };

    socket.emit("send_message", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  const addToFav = async () => {
    const postId = "";
  };

  //////////////////////////// end socket io ...
  useEffect(() => {
    getSportByType();
    getAllPosts();
    connectToRoom();
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
                All Posts :{" "}
                <button
                  onClick={async () => {
                    const user = jwt.decode(state.token);
                    const userID = user.userId;
                    const postID = ele.post_id;
                    const a = await axios.post("http://localhost:5000/favorite", {
                      userID,
                      postID,
                    });
                    console.log("a", a);
                  }}
                >
                  add to fav
                </button>
              </div>
            );
          })}
      </div>
      <br></br>
      <br></br>
      {messageList.map((ele, i) => {
        return (
          <h3 key={i}>
            {ele.author} {ele.message}
          </h3>
        );
      })}
      <textarea type="text" placeholder="Write your message here ..." onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GymAndCouchInfo;
