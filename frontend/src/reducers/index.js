import { combineReducers, createStore } from "redux";

//import reducer
import loginReducer from './login';
import profileReducers from './profile';
import MembersReducer from "./members";

const reducers = combineReducers({
    // add reducers here
    loginReducer,
    profileReducers,
    MembersReducer
});

const store = createStore(reducers);

export default store;
