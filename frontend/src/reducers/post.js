const initialState = { posts: [] };

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_POST":
      return { posts: payload };
    case "ADD_POST":
      return { posts: [...state.posts, payload] };
    case "GET_POST":
      return state.posts.filter((elem) => elem.id === payload.id);
    case "UPDATE_POST":
      return state.posts.map((elem) => {
        if (elem.id === payload.id) {
          return payload;
        }
        return elem;
      });
    case "DELETE_POST":
      return state.posts.filter((elem) => elem.id !== payload.id);
    default:
      return state;
  }
};

export default postsReducer;

export const setPost = (posts) => {
  return { type: "SET_POST", payload: posts };
};

export const getPost = (posts) => {
  return { type: "GET_POST", payload: posts };
};

export const AddPost = (newPosts) => {
  return { type: "ADD_POST", payload: newPosts };
};

export const editPost = (updatePosts) => {
  return { type: "UPDATE_POST", payload: updatePosts };
};

export const deletePost = (deletePosts) => {
  return { type: "DELETE_POST", payload: deletePosts };
};
