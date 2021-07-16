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
              <div className="editPost">
                {state.posts.map((elem, i) => (
                  <Form
                    key={i}
                    onSubmit={(e) => {
                      e.preventDefault();
                      savePost(elem, e.target.post.value, e.target.photo.value, e.target.video.value);
                    }}
                  >
                    <h2 className="h222"> edit Post </h2>
                    <Form.Group size="lg" controlId="formPost">
                      <Form.Label>
                        post :
                        <Form.Control type="text" name="post" className="input1" defaultValue={elem.post} />
                      </Form.Label>{" "}
                    </Form.Group>
                    <Form.Group size="lg" controlId="formPhoto">
                      <Form.Label>
                        url photo :
                        <Form.Control type="text" name="photo" className="input1" defaultValue={elem.photo} />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group size="lg" controlId="formVideo">
                      <Form.Label>
                        url video:
                        <Form.Control type="text" name="video" className="input1" defaultValue={elem.video} />{" "}
                      </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Button className="styleButton2" className="marg1" size="lg" variant="outline-dark" type="submit">
                        Save changes
                      </Button>
                    </Form.Group>
                    <div className="tostMassage1">
                      <Form.Label>{message && <div>{message}</div>}</Form.Label>
                    </div>
                  </Form>
                ))}
              </div>
            ) : (
              <div className="edit12">
                {state.posts.map((elem, i) => (
                  <div key={i}>
                    <p className="p111">
                      <b> your post: </b>
                      {elem.post}
                    </p>
                    <div className="flot12">
                      <img src={elem.photo} alt="post" height="400" width="600" />
                    </div>

                    <div className="flot123">
                      <video width="320" height="240" controls className="video">
                        <source src={elem.video} type="video/mp4" />
                      </video>
                      <button onClick={editPost} value={elem.post_id} className="btnPost">
                        edit post
                      </button>
                      <button onClick={popup} className="btnPost">
                        deleted post
                      </button>
                      <button onClick={returnToAllPost} className="btnPost">
                        return to all Post
                      </button>
                      {message && <div> {message} </div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="popupb2">
          <div className="popup1">
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
                <div className="flot2">
                  <button className="btnDel1">deleted Post</button>
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
                <div className="flot3">
                  <button className="btnCan1">cancel</button>
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
