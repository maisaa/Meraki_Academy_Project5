import React, { cloneElement, useEffect, useState } from "react";
// import Modal from "react-bootstrap/Modal";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  setProfile,
  updateProfile,
  deleteProfile,
} from "./../../reducers/profile";
import { decode } from "jsonwebtoken";
import "./normalUser.css";

const Profile = () => {
  const [myChats, setMyChats] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      profile: state.profileReducers.profile,
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
      .get(`http://localhost:5000/users/${user.userId}`)
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editProfile = (e) => {
    axios
      .put(`http://localhost:5000/users/${e.target.value}`)
      .then((result) => {});
    setEdit(true);
  };

  const myChat = async () => {
    const allMyChats = await axios.post("http://localhost:5000/myChats", {
      userId: user.userId,
    });
    console.log(allMyChats);
    //set all chate
  };

  useEffect(() => {
    myChat();
  }, []);

  useEffect(() => {
    getProfile();
  }, [edit]);

  const saveProfile = async (elem, firstName, lastName, image, phone, age) => {
    await axios.put(`http://localhost:5000/users/${elem.user_id}`, {
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
    await axios.put(`http://localhost:5000/user/${elem.user_id}`);
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
    await axios.get(`http://localhost:5000/user/${elem.user_id}`);
  };
  return (
    <>
      {deleteProfile ? (
        <div>
          {edit ? (
            <div className="edit_padding">
              {state.profile.map((elem, i) => (
                <div className="edit">
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
                    <h2> edit profile </h2>
                    <Form.Group size="lg" controlId="formImage">
                      <Form.Label>
                        image:
                        <Form.Control
                          type="text"
                          name="image"
                          className="input"
                          defaultValue={elem.image}
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formFirstName">
                      <Form.Label>
                        firstName :
                        <Form.Control
                          type="text"
                          name="firstName"
                          className="input"
                          defaultValue={elem.firstName}
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formLastName">
                      <Form.Label>
                        lastName :
                        <Form.Control
                          type="text"
                          name="lastName"
                          className="input"
                          defaultValue={elem.lastName}
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group size="lg" controlId="formPhone">
                      <Form.Label>
                        phone:
                        <Form.Control
                          type="text"
                          name="phone"
                          className="input"
                          defaultValue={elem.phone}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group size="lg" controlId="formAge">
                      <Form.Label>
                        age:
                        <Form.Control
                          type="text"
                          name="age"
                          className="input"
                          defaultValue={elem.age}
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Button
                        className="styleButton1"
                        className="marg"
                        size="lg"
                        variant="outline-dark"
                        type="submit"
                      >
                        Save changes
                      </Button>
                    </Form.Group>

                    <div className="tostMassage">
                      <Form.Label>{message && <div>{message}</div>}</Form.Label>
                    </div>
                  </Form>
                </div>

              ))}
            </div>
          ) : (
            <div className="imageProfileCoachStyle1 body123">
              {state.profile.map((elem, i) => {})}
              {state.profile.map((elem, i) => (
                <div key={i}>
                  <div className="body">
                    <h1 className="herderProfile">{elem.firstName} Profile</h1>
                    <div className="container12Profile">
                      <div className="divImg">
                        <img
                          src={elem.image}
                          height="100"
                          width="100"
                          className="psImg"
                        />{" "}
                        <br />
                      </div>
                      <div className="Info">
                        <p>
                          <b>firstName : </b> {elem.firstName}
                        </p>
                        <p>
                          <b> lastName : </b>
                          {elem.lastName}
                        </p>

                        <p>
                          {" "}
                          <b>phone : </b>
                          {elem.phone}
                        </p>

                        <p>
                          {" "}
                          <b>age :</b> {elem.age}
                        </p>
                      </div>
                    </div>
                    <div className="divbtn">
                      <button
                        onClick={editProfile}
                        value={elem.user_id}
                        className="btn1"
                      >
                        Edit 
                      </button>
                      <button
                        onClick={popup}
                        value={elem.user_id}
                        className="btn1"
                      >
                        Deleted 
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="popup">
          <h1>delete profile</h1>
          {message && <div> {message} </div>}
          {state.profile.map((elem, i) => (
            <form
              key={i}
              onSubmit={(e) => {
                e.preventDefault();
                deleteProfilea(elem);
              }}
            >
              <br />
              <div className="flot1">
                <button className="btnDel">deleted Profile</button>
              </div>
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
              <div className="flot2">
                <button className="btnCan">cancel</button>
                <br />
              </div>
            </form>
          ))}
        </div>
      )}
    </>
  );
};

export default Profile;
