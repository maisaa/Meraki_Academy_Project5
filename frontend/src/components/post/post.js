import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setPost, AddPost } from "./../../reducers/post";

const Post = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [post, setPost2] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [state1, setState1] = useState([]);
  const [sport_id, setSport_id] = useState(0);
  const [message, setMessage] = useState("");
  const [addNew, setAddNew] = useState(false);
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

  async function addNewPost() {
    try {
      const newPost = {
        post,
        photo,
        video,
        sport_id,
        poster_id: userId,
      };
      console.log("....new post ....", newPost);
      if (!post) {
        setMessage("Please write a text");
      } else {
        await axios
          .post("http://localhost:5000/posts", newPost)
          .then((response) => {
            if (response) {
              dispatch(AddPost(response.data));
              setMessage("The post has been successfully added");
            } else {
              setMessage("Error happened while add post, please try again");
            }
          });
      }
    } catch (error) {
      setMessage("Error 404 happened while add post, please try again");
      throw error;
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    addNewPost();
    setTimeout(() => {
      setAddNew(false);
    }, 2000);
  };

  const getAllPost = () => {
    axios
      .get(`http://localhost:5000/posts/all/${userId}`)
      .then((res) => {
        dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/all/${userId}`).then((result) => {
      dispatch(setPost(result.data));
    });
  }, []);

  const viewPost = (e) => {
    axios
      .get(`http://localhost:5000/posts/${e.target.value}`)
      .then((result) => {
        dispatch(setPost(result.data));
        history.push(`/post`);
      });
  };

 

  const SportType = () => {
    axios.get("http://localhost:5000/sports").then((response) => {
      setState1(response.data);
    });
  };


  useEffect(() => {
    getAllPost();
  }, [addNew]);

  return (
    <div className="App">
      {addNew ? (
        <div>
          <form onSubmit={handelSubmit}>
            <h3> Add post </h3>
            <label>
              <input
                type="text"
                placeholder="post here"
                onChange={(e) => setPost2(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Url photo here"
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Url video here"
                onChange={(e) => setVideo(e.target.value)}
              />
            </label>
            <label>
              <select
                type="select"
                onClick={async (e) => {
                  SportType();
                  await setSport_id(e.target.value);
                }}
              >
                {}
                {state1.map((ele, i) => {
                  return (
                    <option value={ele.sport_id} key={i}>
                      {ele.type}
                    </option>
                  );
                })}
              </select>
            </label>
            <div>
              <button>add post</button>
            </div>
            <div>{message && <div> {message} </div>}</div>
          </form>
        </div>
      ) : (
        <div> <button onClick={()=>{setAddNew(true)}}> Add + </button> </div>
      )}
      <div>
        {state.posts.map((elem, i) => (
          <div key={i}>
            <p>post :{elem.post}</p>
            <img src={elem.photo} height="100" width="100" /> <br />
            <video width="320" height="240" controls>
              <source src={elem.video} type="video/mp4" />
            </video>
            <button onClick={viewPost} value={elem.post_id}>
              {" "}
              view post{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
