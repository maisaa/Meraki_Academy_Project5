import { combineReducers, createStore } from "redux";

//import reducer
import loginReducer from "./login";
import MembersReducer from "./members";

const reducers = combineReducers({
  // add reducers here
  loginReducer,
  MembersReducer,
});

const store = createStore(reducers);

export default store;
