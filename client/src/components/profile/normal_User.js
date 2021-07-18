import React, { cloneElement, useEffect, useState } from "react";

import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { decode } from "jsonwebtoken";

import { useHistory } from "react-router-dom";
import "./normalUser.css";
import { setProfile, updateProfile, deleteProfile } from "./../../reducers/profile";
import { setFavorite, deleteFavorite } from "./../../reducers/favorite";
const User = () => {
  const [state1, setState1] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      profile: state.profileReducers.profile,
      favorite: state.favoriteReducer.favorite,
    };
  });
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteProfile, setDeleteProfile] = useState(true);
  const user = decode(localStorage.getItem("token"));
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    axios
      .get(`/users/${user.userId}`)
      .then((res) => {
        console.log(res, "respons");
        dispatch(setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editProfile = (e) => {
    setEdit(true);
  };

  useEffect(() => {
    getProfile();
  }, [edit]);

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    getAllPost();
  }, [state1]);

  const getAllPost = () => {
    axios.get(`/favorite/${user.userId}`).then((result) => {
      dispatch(setFavorite(result.data));
      console.log(result.data);
    });
  };
  const saveProfile = async (elem, firstName, lastName, image, phone, age) => {
    await axios.put(`/users/${elem.user_id}`, {
      firstName,
      lastName,
      image,
      phone,
      age,
    });
    setMessage("save  edit profile");
    setTimeout(() => {
      setEdit(false);
    }, 1000);
    setDeleteProfile(true);
  };
  const deleteProfilea = async (elem) => {
    await axios.put(`/user/${elem.user_id}`);
    setMessage("delete Profile");
    setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
  };
  const popup = () => {
    setDeleteProfile(false);
    setMessage("Are you sure you want to delete your profile");
  };
  const cancel = async (elem) => {
    setDeleteProfile(true);
    setMessage("");
    await axios.get(`/user/${elem.user_id}`);
  };

  return (
    <>
    <div className="marginTopProfile">
      <div className="gridProfileStyle1">
      <div className="myProfileInUserProfileDev">
      {deleteProfile ? (
        <div>
          {edit ? (
            <div className="editProfileUserStyle12">
              {state.profile.map((elem, i) => (
                <div>
                  <Form
                    key={i}
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveProfile(
                        elem,
                        e.target.firstName.value,
                        e.target.lastName.value,
                        e.target.image.value,
                        e.target.phone.value,
                        e.target.age.value
                        );
                      }}
                      >
                    <div className="nameLabelUser123"> Edit Profile </div>
                    <Form.Group size="lg" controlId="formImage">
                      <Form.Label className="desLabelUser123">
                        Image 
                        <Form.Control type="text" name="image" defaultValue={elem.image} className="marginFormControlUserProfile1" />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formFirstName">
                      <Form.Label className="desLabelUser123">
                        First Name 
                        <Form.Control type="text" name="firstName"  defaultValue={elem.firstName} className="marginFormControlUserProfile1" />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formLastName">
                      <Form.Label className="desLabelUser123">
                        Last Name 
                        <Form.Control type="text" name="lastName"  defaultValue={elem.lastName} className="marginFormControlUserProfile1" />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formPhone">
                      <Form.Label className="desLabelUser123">
                        Phone 
                        <Form.Control type="text" name="phone"  defaultValue={elem.phone} className="marginFormControlUserProfile1"/>
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formAge">
                      <Form.Label className="desLabelUser123">
                        Age 
                        <Form.Control type="text" name="age"  defaultValue={elem.age} className="marginFormControlUserProfile1" />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Button  size="lg" variant="outline-dark" type="submit" className="buttonSaveEditProfileUser1">
                        Save Changes
                      </Button>
                    </Form.Group>

                    <div className="styleMessageProfileSave1">
                      <Form.Label>{message && <div>{message}</div>}</Form.Label>
                    </div>
                  </Form>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {state.profile.map((elem, i) => (
                <div key={i}>
                  <div>
                    <img src={elem.image} className="ImageProfileUserStyle"/>
                    <div>
                      <div>
                    <div className="nameLabelUser1">{elem.firstName} Profile</div>
                      </div>
                      <div className="desLabelUser1">
                        <div>
                          {elem.firstName} {elem.lastName}
                        </div>
                        <div>
                          Tel : {elem.phone}
                        </div>
                        <div>Age : {elem.age}
                        </div>
                      </div>
                    </div>
                    <div className="styleButtonProfile5">
                      <Button className="ButtonProfileUser1" variant="outline-dark" onClick={editProfile} value={elem.user_id}>
                        Edit 
                      </Button>
                      <Button className="ButtonProfileUser2" variant="outline-dark" onClick={popup} value={elem.user_id}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
          <div style={{color: "white"}}>
            <div className="nameLabelDeleteProfileUser1">Delete profile</div>
            {message && <div className="messageDeleteProfile1"> {message} </div>}
            {state.profile.map((elem, i) => (
              <form
              key={i}
              onSubmit={(e) => {
                e.preventDefault();
                deleteProfilea(elem);
              }}
              >
               
                  <button className="ButtonDeleteProfileUser1" variant="outline-dark">Delete</button>
              </form>
            ))}
            {state.profile.map((elem, i) => (
              <form
              key={i}
              onSubmit={(e) => {
                e.preventDefault();
                cancel(elem);
              }}
              >
                  <button className="ButtonDeleteProfileUser12" variant="outline-dark">Cancel</button>
              </form>
            ))}
          </div>
      )}
      </div>
      <div className="myPostInUserProfileDev">
                    <div className="nameLabelPostFavUser1">My Favourite Posts</div>
                    <div className="scrollUserProfile1">
                    {state.favorite &&
                      state.favorite.map((elem, i) => (
                        <div key={i} className="gridPostFavUserProfile">
                          <div>
                            <img src={elem.photo} className="imagePostFavUser1"/>
                          </div>
                          <div>
                            <div className="textPostFavUserProfile12">{elem.post}</div>
                            <Button
                            variant="outline-dark"
                            className="buttonDeletePostFavUser1"
                              onClick={() => {
                                const postId = elem.post_id;
                                const user = decode(state.token);
                                const userId = user.userId;
                                axios.put("/favorite", {
                                  postId,
                                  userId,
                                });
                                dispatch(deleteFavorite(postId));
                                setState1(!state);
                              }}
                              >
                              Remove 
                            </Button>
                          </div>
                        </div>
                      ))}
                      </div>
                  </div>
      </div>
      </div>
    </>
  );
};

export default User;
