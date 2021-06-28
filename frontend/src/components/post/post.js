import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setPost } from './../../reducers/post';

const Post = (props) => {
    const dispatch = useDispatch();
    const state =useSelector();
    useEffect(()=>{});
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .get("http://localhost:5000/posts/all/:id")
          .then((result) => {
            if (result.status === 200) {
              
            }
          })
          .catch((err) => {
            setMessage(err.response.data);
          });
      };
  return <>
  <div>
      <h1> post </h1>
  </div>
  </>;
};

export default Post;