const initialState = {
  members: [],
  typeMembers: "",
};

const MembersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_MEMBERS":
      return { members: payload };
    case "SET_TYPE":
      return { members: [...state.members], typeMembers: payload };
    default:
      return state;
  }
};

export default MembersReducer;

// Action

export const setMembers = (members) => {
  return { type: "SET_MEMBERS", payload: members };
};

export const setMembersType = (typeMembers) => {
  console.log("typeMembers", typeMembers);
  return { type: "SET_TYPE", payload: typeMembers };
};
