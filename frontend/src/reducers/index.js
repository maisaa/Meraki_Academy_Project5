import { combineReducers, createStore } from "redux";

//import reducer
import loginReducer from "./login";
import profileReducers from "./profile";
import MembersReducer from "./members";
import sportReducer from "./sports";
import postsReducer from "./post";
import GymOrCouchReducer from "./gym&couch";
import favoriteReducer from "./favorite";
const reducers = combineReducers({
  // add reducers here
  loginReducer,
  profileReducers,
  MembersReducer,
  sportReducer,
  postsReducer,
  GymOrCouchReducer,
  favoriteReducer,
});

const store = createStore(reducers);

export default store;
