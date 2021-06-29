import { combineReducers, createStore } from "redux";

//import reducer
import loginReducer from './login';
import profileReducers from './profile';
import MembersReducer from "./members";
import sportReducer from './sports';

const reducers = combineReducers({
    // add reducers here
    loginReducer,
    profileReducers,
    MembersReducer,
    sportReducer,
});

const store = createStore(reducers);

export default store;