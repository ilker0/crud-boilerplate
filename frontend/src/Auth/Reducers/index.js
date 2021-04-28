import { combineReducers } from 'redux';
import LoginReducer from 'Auth/Reducers/LoginReducer';
import ForgotPasswordReducer from 'Auth/Reducers/ForgotPasswordReducer';
import ResetPasswordReducer from 'Auth/Reducers/ResetPassworReducer';

export default combineReducers({
  LoginReducer,
  ForgotPasswordReducer,
  ResetPasswordReducer,
});
