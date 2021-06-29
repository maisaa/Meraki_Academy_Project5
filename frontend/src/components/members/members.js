import React from "react";
import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMembers, setMembersType, setUserId } from "../../reducers/members";
import { decode } from "jsonwebtoken";

const Members = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      members: state.MembersReducer.members,
      id: state.MembersReducer.id,
    };
  });

  const getAllMember = async () => {
    const allUsers = await axios.get("http://localhost:5000/usersPost");
    console.log("allUsers", allUsers.data[0]);
    dispatch(setMembers(allUsers.data));
  };
  const getToken = async () => {
    const user = await decode(localStorage.getItem("token"));
    dispatch(setUserId(user.userId));
  };
  useEffect(() => {
    getToken();
    getAllMember();
  }, []);

  return (
    <div className="allmembers">
      {state.members.map((ele) => {
        if (state.id) {
          return (
            <div className="">
              <button>{ele.firstName}</button>
              <button>video</button>
              <button>chat</button>
              <button>delete</button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Members;
