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
      <div className="allDevStyleGymProfile1">
        <div className="imageProfileGym1">
          {deleteProfile ? (
            <div>
              {edit ? (
                <div> <img src="https://i.ibb.co/z6FsTmw/nathan-dumlao-IFme2-F6e-Q2-E-unsplash.jpg" className="imageSizeProfileGym14" /> </div>
              ) : (
                <div>
                  {state.profile.map((elem, i) => {})}
                  {state.profile.map((elem, i) => (
                    <div key={i}>
                      <img src={elem.image} className="imageSizeProfileGym1" />
                      <div>
                        <Button
                          variant="outline-dark"
                          className="buttonEditProfileGym1"
                          onClick={editProfile}
                          value={elem.user_id}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-dark"
                          className="buttonDeleteProfileGym1"
                          onClick={popup}
                          value={elem.user_id}
                        >
                          Deleted
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div> <img src="https://i.ibb.co/z6FsTmw/nathan-dumlao-IFme2-F6e-Q2-E-unsplash.jpg" className="imageSizeProfileGym14" /> </div>
            )}
        </div>
        <div className="infoProfileGym1">
          {deleteProfile ? (
            <div>
              {edit ? (
                <div>
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
                        <div className="nameLabelUser1234"> Edit Profile </div>
                        <Form.Group size="lg" controlId="formImage">
                          <Form.Label className="desLabelUser1234">
                            Image
                            <Form.Control
                              type="text"
                              name="image"
                              defaultValue={elem.image}
                              className="marginFormControlUserProfile14"
                            />
                          </Form.Label>
                        </Form.Group>

                        <Form.Group size="lg" controlId="formFirstName">
                          <Form.Label className="desLabelUser1234">
                            First Name
                            <Form.Control
                              type="text"
                              name="firstName"
                              defaultValue={elem.firstName}
                              className="marginFormControlUserProfile14"
                            />
                          </Form.Label>
                        </Form.Group>

                        <Form.Group size="lg" controlId="formLastName">
                          <Form.Label className="desLabelUser1234">
                            Last Name
                            <Form.Control
                              type="text"
                              name="lastName"
                              defaultValue={elem.lastName}
                              className="marginFormControlUserProfile14"
                            />
                          </Form.Label>
                        </Form.Group>

                        <Form.Group size="lg" controlId="formPhone">
                          <Form.Label className="desLabelUser1234">
                            Phone
                            <Form.Control
                              type="text"
                              name="phone"
                              defaultValue={elem.phone}
                              className="marginFormControlUserProfile14"
                            />
                          </Form.Label>
                        </Form.Group>
                        <Form.Group size="lg" controlId="formAge">
                          <Form.Label className="desLabelUser1234">
                            Age
                            <Form.Control
                              type="text"
                              name="age"
                              defaultValue={elem.age}
                              className="marginFormControlUserProfile14"
                            />
                          </Form.Label>
                        </Form.Group>

                        <Form.Group>
                          <Button
                            size="lg"
                            variant="outline-dark"
                            type="submit"
                            className="buttonSaveEditProfileUser14"
                          >
                            Save Changes
                          </Button>
                        </Form.Group>

                        <div className="styleMessageProfileSave14">
                          <Form.Label>
                            {message && <div>{message}</div>}
                          </Form.Label>
                        </div>
                      </Form>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {state.profile.map((elem, i) => {})}
                  {state.profile.map((elem, i) => (
                    <div key={i}>
                      <div className="nameEditGymProfile">
                        {elem.firstName} Profile
                      </div>
                      <div>
                        <div className="textEditGymProfile">
                          <div className="paddingGymProfile">
                            {elem.firstName} {elem.lastName}{" "}
                          </div>
                          <div className="paddingGymProfile">
                            Tel :{elem.phone}
                          </div>
                          <div className="paddingGymProfile">
                            Age : {elem.age}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="paddingStyleGym">
              <div className="nameLabelDeleteProfileUser11">Delete Profile</div>
              {message && <div className="messageDeleteProfile12"> {message} </div>}
              {state.profile.map((elem, i) => (
                <form
                  key={i}
                  onSubmit={(e) => {
                    e.preventDefault();
                    deleteProfilea(elem);
                  }}
                >
                    <button className="ButtonDeleteProfileUser111" variant="outline-dark">Delete</button>
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
                    <button className="ButtonDeleteProfileUser123" variant="outline-dark">Cancel</button>
                </form>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
