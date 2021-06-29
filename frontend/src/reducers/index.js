import { combineReducers, createStore } from 'redux';

//import reducer
import loginReducer from './login';
import sportReducer from './sports';

const reducers = combineReducers({
    // add reducers here
    loginReducer,
    sportReducer,
    
});

const store = createStore(reducers);

export default store;