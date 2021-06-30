const initialState = {
  members: [],
  typeMembers: "",
  id: { userId: "", role: "" },
};

const MembersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_MEMBERS":
      return { id: state.id, members: payload };
    case "SET_ID":
      return { members: [...state.members], id: payload };
    default:
      return state;
  }
};

export default MembersReducer;

// Action

export const setMembers = (members) => {
  return { type: "SET_MEMBERS", payload: members };
};

// export const setMembersType = (typeMembers) => {
//   console.log("typeMembers", typeMembers);
//   return { type: "SET_TYPE", payload: typeMembers };
// };

export const setUserId = (id) => {
  return { type: "SET_ID", payload: id };
};
