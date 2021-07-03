const initialState = { allGymOrCouch: [] };

const GymOrCouchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_GYM":
      return {
        allGymOrCouch: payload.allUser.filter((ele) => {
          return ele.role_id == payload.roleId;
        }),
      };
    // { allGymOrCouch: payload };
    default:
      return state;
  }
};
export default GymOrCouchReducer;

//Action

export const setAllGymOrCoach = (allUser, roleId) => {
  return { type: "SET_GYM", payload: { allUser: allUser, roleId: roleId } };
};
