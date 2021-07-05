import { combineReducers, createStore } from "redux";

//import reducer
import loginReducer from "./login";
import profileReducers from "./profile";
import MembersReducer from "./members";
import sportReducer from "./sports";
import postsReducer from "./post";
import GymOrCouchReducer from "./gym&couch";
import infoGymCochReducer from "./infoGymCoch";
import commentsReducer from "./commints";
import favoriteReducer from "./favorite";
import SearchReducer from "./search";

const reducers = combineReducers({
  // add reducers here
  loginReducer,
  profileReducers,
  MembersReducer,
  sportReducer,
  postsReducer,
  GymOrCouchReducer,
  infoGymCochReducer,
  commentsReducer,
  favoriteReducer,
  SearchReducer,
});

const store = createStore(reducers);

export default store;
