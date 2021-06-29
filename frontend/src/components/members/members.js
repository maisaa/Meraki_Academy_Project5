import React from "react";
import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMembers, setMembersType } from "../../reducers/members";
import { decode } from "jsonwebtoken";

const Members = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      members: state.MembersReducer.members,
      typeMembers: state.MembersReducer.typeMembers,
    };
  });

  const getAllMembersForAdmin = async () => {
    const allUsers = await axios.get("http://localhost:5000/users");
    console.log("allUsers", allUsers.data);
    dispatch(setMembers(allUsers.data));
  };
  const getToken = async () => {
    const user = await decode(localStorage.getItem("token"));
    console.log("user", user);
    if (user.roleId == 3) {
      dispatch(setMembersType("gym"));
    }
    if (user.roleId == 4) {
      dispatch(setMembersType("couch"));
    }
  };
  useEffect(() => {
    getToken();
    getAllMembersForAdmin();
    console.log("state.token", state.token);
  }, []);

  return (
    <div className="allmembers">
      {state.members.map((ele) => {
        return (
          <div className="">
            <button>{ele.firstName}</button>
            <button>video</button>
            <button>chat</button>
            <button>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Members;
