const initialState = { comments: [] };

const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_COMMENT":
      return { comments: payload };
    case "ADD_COMMENT":
      return { comments: [...state.comments, payload] };
    // case "UPDATE_COMMENT":
    //   return state.comments.map((elem) => {
    //     if (elem.id === payload.id) {
    //       return payload;
    //     }
    //     return elem;
    //   });
    // case "DELETE_COMMENT":
    //   return state.comments.filter((elem) => elem.id !== payload.id);
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
  // comments here represents just for comment that added .
  return { type: "ADD_COMMENT", payload: comments };
};

// export const editComment = (comments) => {
//   return { type: "UPDATE_COMMENT", payload: comments };
// };
// export const deleteComment = (comments) => {
//   return { type: "DELETE_COMMENT", payload: comments };
// };
