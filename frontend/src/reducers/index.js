import { combineReducers, createStore } from "redux";

//import reducer
import loginReducer from './login';
import profileReducers from './profile';
import MembersReducer from "./members";
import sportReducer from './sports';
import postsReducer from './post';

const reducers = combineReducers({
    // add reducers here
    loginReducer,
    profileReducers,
    MembersReducer,
    sportReducer,
    postsReducer,
});

const store = createStore(reducers);

export default store;