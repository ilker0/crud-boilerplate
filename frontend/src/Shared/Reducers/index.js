import { combineReducers } from 'redux';
import AuthReducer from 'Auth/Reducers';

const rootReducer = combineReducers({
  AuthReducer,
});

export default rootReducer;
