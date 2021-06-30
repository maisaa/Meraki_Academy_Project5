import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setPost } from "../../reducers/post";

const ViewPost = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
    };
  });
  useEffect(() => {
    setPost();
  }, []);

  const editPost = (e) => {
    axios
      .put(`http://localhost:5000/posts/${e.target.value}`)
      .then((result) => {});
    setEdit(true);
  };

  const savePost = async (elem, post, photo, video) => {
    await axios.put(`http://localhost:5000/posts/${elem.post_id}`, {
      post,
      photo,
      video,
      sport_id: elem.sport_id,
      poster_id: elem.poster_id,
      postId: elem.post_id,
    });
    setMessage('save edit');
    setTimeout(() => {
        history.push("/posts");
    }, 1000);
  };
  return (
    <>
      {edit ? (
        <div>
          {state.posts.map((elem, i) => (
            <form
              key={i}
              onSubmit={(e) => {
                e.preventDefault();
                savePost(
                  elem,
                  e.target.post.value,
                  e.target.photo.value,
                  e.target.video.value
                );
              }}
            >
              <label>
                post :
                <input type="text" name="post" defaultValue={elem.post} />
              </label>{" "}
              <br />
              <label>
                url photo :
                <input
                  type="text"
                  name="photo"
                  defaultValue={elem.photo}
                />{" "}
              </label>{" "}
              <br />
              <label>
                url video:
                <input
                  type="text"
                  name="video"
                  defaultValue={elem.video}
                />{" "}
              </label>
              <br />
              <button>save post</button>
              {message && <div> {message} </div>}
            </form>
          ))}
        </div>
      ) : (
        <div>
          {state.posts.map((elem, i) => (
            <div key={i}>
              <p> post : {elem.post}</p>
              <img src={elem.photo} height="100" width="100" /> <br />
              <video width="320" height="240" controls>
                <source src={elem.video} type="video/mp4" />
              </video>
              <button onClick={editPost} value={elem.post_id}>
                {" "}
                edit post{" "}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewPost;
