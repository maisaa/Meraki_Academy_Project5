import { combineReducers, createStore } from 'redux';

//import reducer
import loginReducer from './login';
import profileReducers from './profile';

const reducers = combineReducers({
    // add reducers here
    loginReducer,
    profileReducers,
});

const store = createStore(reducers);

export default store;