const initialState = { comments: [] };

const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_COMMENT":
      return { comments: payload };
    case "ADD_COMMENT":
      return { comments: [...state.comments, payload] };
    default:
      return state;
  }
};

export default commentsReducer;

//Action

export const setComment = (comments) => {
  return { type: "SET_COMMENT", payload: comments };
};

export const AddComment = (comments) => {
  // comments here represents just for comment that add .
  return { type: "ADD_COMMENT", payload: comments };
};
