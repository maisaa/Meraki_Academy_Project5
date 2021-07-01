import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setPost  } from "./../../reducers/post";

const Post = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
    };
  });
  const user = jwt.decode(state.token);
  let userID;
  if (user) {
    userID = user.userId;
  }
  const [userId, setUserId] = useState(userID);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/all/${userId}`).then((result) => {
      dispatch(setPost(result.data));
      // console.log("....result.....", result.data);
    });
  }, []);

  const viewPost = (e)=>{
    axios.get(`http://localhost:5000/posts/${e.target.value}`).then((result) =>{
      dispatch(setPost(result.data));
      history.push(`/post`);
    })
  }
  
  return (
    <div className="App">
      <div>
        {state.posts.map((elem, i) => (
          <div key={i}>
            <p>post :{elem.post}</p>
            <img src={elem.photo} height="100" width="100" /> <br />
            <video width="320" height="240" controls>
              <source src={elem.video} type="video/mp4" />
            </video>
            <button onClick={viewPost} value={elem.post_id}> view post </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
