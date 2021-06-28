import { combineReducers, createStore } from 'redux';

//import reducer
import loginReducer from './login';


const reducers = combineReducers({
    // add reducers here
    loginReducer,
});

const store = createStore(reducers);

export default store;