import { SET_FORGOT_PASSWOD_LOADING } from 'Auth/ActionTypes/AuthActionTypes';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWOD_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
