const initialState = {
  GymOrCouch: [{}],
  allPosts: [{}],
};

const infoGymCochReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_GYM_INFO":
      return { GymOrCouch: payload, allPosts: [...state.allPosts] };
    case "SET_GYM_INFO_POSTS":
      return { GymOrCouch: [...state.GymOrCouch], allPosts: payload };
    default:
      return state;
  }
};
export default infoGymCochReducer;

//Action

export const setGymOrCoach = (allUser1) => {
  return { type: "SET_GYM_INFO", payload: allUser1 };
};

export const setGymOrCoachPost = (allUser) => {
  return { type: "SET_GYM_INFO_POSTS", payload: allUser };
};
