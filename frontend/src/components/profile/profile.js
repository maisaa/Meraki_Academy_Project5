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
const [profile, setprofile] = useState(" ");
const [update_profile, setupdate_profile] = useState(" ")
const [delete_profile, setdelete_profile] = useState(" ")

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    updateprofile();
  }, []);

  useEffect(() => {
    deleteprofile();
  }, []);



  const getProfile = () => {
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
