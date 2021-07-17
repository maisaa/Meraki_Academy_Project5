import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGymOrCoach, setGymOrCoachPost } from "./../../reducers/infoGymCoch";
import { AddComment, setComment } from "./../../reducers/commints";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import io from "socket.io-client";
import jwt, { decode } from "jsonwebtoken";
import "./infoGymCoch.css";
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
  const user = decode(state.token);
  console.log("usdddddddddddddder", user);

  const getSportByType = () => {
    axios.get(`/usersInfo/${role}`).then((result) => {
      dispatch(setGymOrCoach(result.data));
    });
  };
  const getAllPosts = () => {
    axios.get(`/usersPost1/${role}`).then((result) => {
      dispatch(setGymOrCoachPost(result.data));
      result.data.map((ele) => {
        axios.get(`/comments/${ele.post_id}/`).then((result) => {
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
    console.log("messageContent", messageContent);
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
      <div className="hamish"></div>
      <div className="devDes">
        <div>
          <img className="ImgCoachGym" src={state.GymOrCouch && state.GymOrCouch[0].image} alt=""></img>
        </div>
        <div className="buttonLeft">
          <Button className="styleButton12" variant="outline-dark">
            <a href="http://localhost:3032/">video</a>
          </Button>
          <Button
            className="styleButton12"
            variant="outline-dark"
            onClick={async () => {
              const user = await jwt.decode(state.token);
              history.push(`/chat/${role}/${user.userId}`);
            }}
          >
            chat
          </Button>
        </div>
        <div></div>
        <div className="NameLabel">
          {state.GymOrCouch && state.GymOrCouch[0].firstName + `  ` + state.GymOrCouch[0].lastName}
        </div>
        <div className="DesLabel">{state.GymOrCouch && state.GymOrCouch[0].description}</div>
      </div>

      <div className="devPosts">
        <div>
          {state.allPosts &&
            state.allPosts.map((ele) => {
              return (
                <div className="postPhotoInfoPage">
                  <div>
                    <img alt="postPhoto" src={ele.photo} height="150" width="100%" />
                    <Button
                      className="styleButton12  favButton"
                      variant="outline-dark"
                      onClick={async () => {
                        const user = jwt.decode(state.token);
                        const userID = user.userId;
                        const postID = ele.post_id;
                        const a = await axios.post("/favorite", {
                          userID,
                          postID,
                        });
                      }}
                    >
                      Add to favorite
                    </Button>
                  </div>
                  <div className="colPostAndComments">
                    <div className="row1Post">
                      <p>{ele.post}</p>
                    </div>
                    <div className="row2Comments">
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
                    </div>
                    <input
                      value={comments}
                      onChange={(e) => {
                        setAComments(e.target.value);
                      }}
                      placeholder="Comment here"
                    ></input>
                    <button
                      onClick={async () => {
                        dispatch(
                          AddComment([
                            {
                              postID: ele.post_id,
                              comment: comments,
                              firstName: user.firstName,
                            },
                          ])
                        );
                        setAComments("");
                        await axios.post("/comments", {
                          comment: comments,
                          post_id: ele.post_id,
                          commenter_id: user.userId,
                        });
                      }}
                    >
                      add commints
                    </button>
                    All Posts :{" "}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="devChat">
        {messageList.map((ele, i) => {
          console.log("ele", ele);
          return (
            <h3 key={i}>
              {ele.author} {ele.message}
            </h3>
          );
        })}
        <textarea type="text" placeholder="Write your message here ..." onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="haish"></div>
    </div>
  );
};

export default GymAndCouchInfo;
