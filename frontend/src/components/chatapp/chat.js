import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const romeID = useParams().gym + useParams().user;
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      GymOrCouch: state.infoGymCochReducer.GymOrCouch,
      allPosts: state.infoGymCochReducer.allPosts,
      comments: state.commentsReducer.comments,
    };
  });

  /////socket io
  socket.on("receive_message_private", (data) => {
    setMessageList([...messageList, data]);
  });

  const connectToRoom = () => {
    const romeId = Number(romeID);
    socket.emit("join_room", romeId); //raise event
  };

  const sendMessage = () => {
    const romeId = Number(romeID);
    const user = jwt.decode(state.token);
    const messageContent = {
      romeId,
      content: {
        author: user.firstName,
        message,
      },
    };

    socket.emit("send_message_private", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  useEffect(() => {
    connectToRoom();
  }, []);

  //////////////////////////// end socket io ...

  return (
    <div className="chat">
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
  );
}

export default Chat;
