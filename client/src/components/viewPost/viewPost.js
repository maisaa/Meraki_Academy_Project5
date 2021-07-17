import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { setPost, deletePost } from "../../reducers/post";
import { Form, Button, Modal } from "react-bootstrap";
import "./viewPost.css";
const ViewPost = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [deletePost, setDeletePost] = useState(true);
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
    axios.put(`/posts/${e.target.value}`).then((result) => {});
    setEdit(true);
  };

  const savePost = async (elem, post, photo, video) => {
    await axios.put(`/posts/${elem.post_id}`, {
      post,
      photo,
      video,
      sport_id: elem.sport_id,
      poster_id: elem.poster_id,
      postId: elem.post_id,
    });
    setMessage("save edit");
    setTimeout(() => {
      history.push("/posts");
    }, 1000);
    setDeletePost(true);
  };

  const deletePosta = async (elem) => {
    await axios.put(`/post/${elem.post_id}`);
    setMessage("delete post");
    setTimeout(() => {
      history.push("/posts");
    }, 1000);
  };

  const popup = () => {
    setDeletePost(false);
    setMessage("are you sure you want to delete this post");
  };

  const cancel = async (elem) => {
    setDeletePost(true);
    setMessage("");
    await axios.get(`/posts/${elem.post_id}`);
  };

  const returnToAllPost = () => {
    history.push("/posts");
  };

  return (
    <>
      {deletePost ? (
        <>
          <div className="app12">
            {" "}
            {edit ? (
              <div className="allEditEditPostStyle1">
                <div className="editEditPostStyle5"> 
                {state.posts.map((elem, i) => (
                  <Form
                    key={i}
                    onSubmit={(e) => {
                      e.preventDefault();
                      savePost(
                        elem,
                        e.target.post.value,
                        e.target.photo.value,
                      );
                    }}
                  >
                    <h2> edit Post </h2>
                    <Form.Group size="lg" controlId="formPost">
                      <Form.Label>
                        post :
                        <Form.Control
                          type="text"
                          name="post"
                          defaultValue={elem.post}
                        />
                      </Form.Label>{" "}
                    </Form.Group>
                    <Form.Group size="lg" controlId="formPhoto">
                      <Form.Label>
                        url photo :
                        <Form.Control
                          type="text"
                          name="photo"
                          defaultValue={elem.photo}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Button
                        size="lg"
                        variant="outline-dark"
                        type="submit"
                        className="buttonStyleEditPost3 margButton"
                      >
                        Save changes
                      </Button>
                    </Form.Group>
                    <div>
                      <Form.Label>{message && <div>{message}</div>}</Form.Label>
                    </div>
                  </Form>
                ))}
                </div>
                <div className="editImageEditPostStyle5"> 
                <img src="https://i.ibb.co/FK473Rs/alexander-redl-d3b-Ymn-Z0ank-unsplash-1.jpg" alt="post" className="sizeImageEditEditPostStyle6"/>
                </div>
              </div>
            ) : (
              <div className="topEditPostStyle1">
                {state.posts.map((elem, i) => (
                  <div key={i} className="editPostStyle1">
                    <div className="ImageEditPostStyle1">
                      <img src={elem.photo} alt="post" className="sizeImageEditPostStyle1"/>
                    </div>
                    <div className="TextEditPostStyle1">
                      <div className="titleEditPostStyle4"> 
                        Post
                      </div>
                      <div className="textPostEditPostStyle1">{elem.post}</div>
                      <div>
                        <div className="buttonStyleEditPost2">
                        <Button onClick={editPost} variant="outline-dark" value={elem.post_id} className="buttonStyleEditPost3">
                          Edit 
                        </Button>
                        <Button onClick={popup} variant="outline-dark" className="buttonStyleEditPost3">Deleted </Button>
                        <Button onClick={returnToAllPost} variant="outline-dark" className="buttonStyleEditPost3">
                          Cancel
                        </Button>
                        </div>
                        {message && <div> {message} </div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="popupb2">
          <div className="popup1 justifyText1">
            <h1>Delete Post</h1>
            {message && <div className="msg"> {message} </div>}
            {state.posts.map((elem, i) => (
              <form
                key={i}
                onSubmit={(e) => {
                  e.preventDefault();
                  deletePosta(elem);
                }}
              >
                <div className="buttonStylePadding">
                  <button  variant="outline-dark" className="buttonStyleEditPost32">Deleted</button>
                </div>
              </form>
            ))}
            {state.posts.map((elem, i) => (
              <form
                key={i}
                onSubmit={(e) => {
                  e.preventDefault();
                  cancel(elem);
                }}
              >
                <div className="buttonStylePadding">
                  <button variant="outline-dark" className="buttonStyleEditPost32">Cancel</button>
                  <br />
                </div>
              </form>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPost;
