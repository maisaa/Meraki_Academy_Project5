const initialState = { allGymOrCouch: [] };

const GymOrCouchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_GYM":
      return {
        allGymOrCouch: payload.filter((ele, i) => {
          console.log("ele", ele.user_id);
          return ele.role_id === 3;
        }),
      };
    // { allGymOrCouch: payload };
    default:
      return state;
  }
};
export default GymOrCouchReducer;

//Action

export const setAllGymOrCoach = (allUser) => {
  console.log("aaaaaaaaaa", allUser);
  return { type: "SET_GYM", payload: allUser };
};
