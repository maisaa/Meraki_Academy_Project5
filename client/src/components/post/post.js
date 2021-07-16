import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setPost, AddPost } from "./../../reducers/post";
import "./post.css";
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
        await axios.post("/posts", newPost).then((response) => {
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
      .get(`/posts/all/${userId}`)
      .then((res) => {
        dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`/posts/all/${userId}`).then((result) => {
      dispatch(setPost(result.data));
    });
  }, []);

  const viewPost = (e) => {
    axios.get(`/posts/${e.target.value}`).then((result) => {
      dispatch(setPost(result.data));
      history.push(`/post`);
    });
  };

  const SportType = () => {
    axios.get("/sports").then((response) => {
      setState1(response.data);
    });
  };

  useEffect(() => {
    getAllPost();
  }, [addNew]);

  return (
    <div className="App1212">
      {addNew ? (
        <div className="allAddPost">
        <div className="addPost">
          <Form onSubmit={handelSubmit}>
            <h3> Add post </h3>
            <Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="post here"
                onChange={(e) => setPost2(e.target.value)}
              />
            </Form.Label>

            <Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Url photo here"
                onChange={(e) => setPhoto(e.target.value)}
              />
            </Form.Label>

            <Form.Label>
              <Form.Control
                className="input"
                type="text"
                placeholder="Url video here"
                onChange={(e) => setVideo(e.target.value)}
              />
            </Form.Label>

            <Form.Label>
              <select
                className="input select"
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
            </Form.Label>

            <div>
              <Button className="styleButton12 marg3"  size="lg" variant="outline-dark" type="submit">
                add Post
              </Button>
            </div>
            <div className="tostMassage3">
              <Form.Label>{message && <div>{message}</div>}</Form.Label>
            </div>
          </Form>
        </div>
        <div>
        <img src="https://i.ibb.co/LQ1P3yD/dmitrii-vaccinium-By-UAo3-Rp-A6c-unsplash.jpg" className="imageAddPosts" />
        </div>
      </div>
      ) : (
        <div className="divbtn1">
          {" "}
          <button
            onClick={() => {
              setAddNew(true);
            }}
            className="bntStart "
          >
            click to add post
          </button>
        </div>
      )}
      <div className="post12">
        {state.posts.map((elem, i) => (
          <div key={i} class="card1Post"> 
              <img src={elem.photo} className="imagePosts" />
              <p className="p11">{elem.post}</p>
              <div className="divButtonViewPost">
              <Button onClick={viewPost} value={elem.post_id} className="styleButton12"  variant="outline-dark">
                view 
              </Button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
