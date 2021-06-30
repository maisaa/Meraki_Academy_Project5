let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

const initialState = { token };

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return { token: payload };
    default:
      return state;
  }
};

export default loginReducer;

//Action
export const setToken = (newToken) => {
  return { type: "SET_TOKEN", payload: newToken };
};
