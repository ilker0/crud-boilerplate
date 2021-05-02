import { combineReducers } from 'redux';
import AuthReducer from 'Auth/Reducers';
import CategoryReducer from 'Categories/Reducers';

const rootReducer = combineReducers({
  AuthReducer,
  CategoryReducer,
});

export default rootReducer;
