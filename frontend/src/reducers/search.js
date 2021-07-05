const initialState = { Search: "" };

const SearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCH1":
      return { Search: payload };
    default:
      return state;
  }
};
export default SearchReducer;
//Actions
export const setSearch111 = (search) => {
  console.log("search", search);
  return { type: "SET_SEARCH1", payload: search };
};
