const initialState = { GymOrCouch: [{}] };

const infoGymCochReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_GYM_INFO":
      return { GymOrCouch: payload };
    default:
      return state;
  }
};
export default infoGymCochReducer;

//Action

export const setGymOrCoach = (allUser1) => {
  return { type: "SET_GYM_INFO", payload: allUser1 };
};
