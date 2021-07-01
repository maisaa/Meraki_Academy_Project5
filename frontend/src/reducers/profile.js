const initialState = { profile: [] };

const profileReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_PROFILE":
      return { profile: payload };
    case 'UPDATE_PROFILE':
        return state.profile.map((elem) => {
          if (elem.id === payload.id) {
            return payload;
          }
          return elem;
        });
     case 'DELETE_PROFILE':
        return state.profile.filter((elem) => elem.id !== payload.id);
      default:
        return state;
  }
};
export default profileReducers;
// ACTIONS
export const setProfile = (profile) => {
  return { type: "SET_PROFILE", payload: profile };
};

export const updateProfile = (updateProfile) => {
  return { type: "UPDATE_PROFILE", payload: updateProfile };
};

export const deleteProfile = (deleteProfile) => {
  return { type: "DELETE_PROFILE", payload: deleteProfile };
};