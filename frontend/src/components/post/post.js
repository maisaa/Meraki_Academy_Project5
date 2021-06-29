import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setPost } from './../../reducers/post';

const Post = (props) => {
    const dispatch = useDispatch();
    const state =useSelector(state => {
      return{
        token: state.loginReducer.token,
        posts: state.postsReducer.posts,
      }
    });
    useEffect(() => {
      axios.get("http://localhost:5000/posts/all/1")
        .then((result) => {
          dispatch(setPost(result.data));
        });
    }, []);
    return <div className="App"> 
		<h2>post</h2>
		<div>{state.posts.map((elem, i) => (
			<div key={i}>
				<p >post :{elem.post}</p>
				<img  src={elem.photo} height="100" width="100" /> <br/>	
        <video width="320" height="240" controls>
        <source src={elem.video} type="video/mp4"/>
        </video>
			</div>
		))}</div>
	</div>;
};

export default Post;