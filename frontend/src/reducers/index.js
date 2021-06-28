import { combineReducers, createStore } from 'redux';

//import reducer
import loginReducer from './login';
import postsReducer from './post';


const reducers = combineReducers({
    // add reducers here
    loginReducer,
    postsReducer
});

const store = createStore(reducers);

export default store;