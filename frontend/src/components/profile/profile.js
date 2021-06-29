import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  setProfile,
  updateProfile,
  deleteProfile,
} from "./../../reducers/profile";

import { useDispatch, useSelector } from "react-redux";

const profile = () => {
  
const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      profile: state.profileReducers.profile,
    };
  });


  useEffect(() => {
    getProfile();
    deleteprofile();
     updateprofile();
  }, []);

  
  const getProfile = () => {
    const user = decode(localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const updateprofile = () => {
    axios
      .put(`http://localhost:5000/users/:id`)
      .then((res) => {
        dispatch(updateProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });














      
  };


  const deleteprofile = () => {
    axios
      .delete(`http://localhost:5000/users/:id`)
      .then((res) => {
        dispatch(deleteProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };












};
