import React from "react";
import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMembers, setMembersType, setUserId } from "../../reducers/members";
import { decode } from "jsonwebtoken";
import { Button } from "react-bootstrap";

const Members = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      members: state.MembersReducer.members,
      id: state.MembersReducer.id,
    };
  });

  const getAllMember = async () => {
    const allUsers = await axios.get("/usersPost");
    console.log("all", allUsers.data);
    dispatch(setMembers(allUsers.data));
  };
  const getToken = async () => {
    const user = await decode(localStorage.getItem("token"));
    dispatch(setUserId({ userId: user.userId, role: user.roleId }));
  };

  useEffect(() => {
    getToken();
    getAllMember();
  }, []);

  return (
    <>
      {state.id.role == 3 ? (
        <div className="allPageMember">
          <p className="titleHomeMember"> All your subscribers </p>
          {state.members.map((ele, i) => {
            if (state.members.length === 0) {
              return (
                <div>
                  <p className="titleHomeMember" style={{ color: "#2cccc4", marginTop: "1rem" }}>
                    {" "}
                    You don't have any subscribers{" "}
                  </p>
                </div>
              );
            }

            if (state.id.userId === ele.poster_id) {
              return (
                <div className="allmembers">
                  <div>
                    {" "}
                    <img src={ele.image} height="150" width="150" className="imageMembers" />
                  </div>
                  <div className="nameMember">
                    <div className="titleMember"> {ele.firstName + " " + ele.lastName} </div>
                    <div>
                      <Button className="styleButtonMember" variant="outline-dark">
                        Chat
                      </Button>
                      <Button
                        className="styleButtonMember"
                        onClick={async () => {
                          window.location.reload();
                          await axios.delete(`/usersPost`, {
                            userId: ele.user_Id,
                            postId: ele.post_id,
                          });
                        }}
                        variant="outline-dark"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : state.id.role == 4 ? (
        // if (state.members[0].poster_id!==state.id.userId)

        <div className="allPageMember">
          <p className="titleHomeMember"> All your subscribers </p>
          {state.members.map((ele) => {
            console.log(".........state.members.length.....", state.members.length);
            if (state.members.length === 0) {
              return (
                <div>
                  <p className="titleHomeMember" style={{ color: "#2cccc4", marginTop: "1rem" }}>
                    {" "}
                    You don't have any subscribers{" "}
                  </p>
                </div>
              );
            }
            if (state.id.userId === ele.poster_id) {
              return (
                <div className="allmembers">
                  <div>
                    {" "}
                    <img src={ele.image} height="150" width="150" className="imageMembers" />
                  </div>
                  <div className="nameMember">
                    <div className="titleMember"> {ele.firstName + " " + ele.lastName} </div>
                    <div>
                      <Button className="styleButtonMember" variant="outline-dark">
                        Video
                      </Button>
                      <Button className="styleButtonMember" variant="outline-dark">
                        Chat
                      </Button>
                      <Button
                        className="styleButtonMember"
                        onClick={async () => {
                          window.location.reload();
                          console.log("ele", ele.user_id);
                          await axios.put(`/usersPost`, {
                            userId: ele.user_id,
                            postId: ele.post_id,
                          });
                        }}
                        variant="outline-dark"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div>
          <p className="titleHomeMember"> All your subscribers </p>
          <p className="titleHomeMember" style={{ color: "#2cccc4", marginTop: "1rem" }}>
            {" "}
            You don't have any subscribers{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default Members;
