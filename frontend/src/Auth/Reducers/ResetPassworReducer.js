import {
  SET_RESET_PASSWORD_LOADING,
  SET_RESET_TOKEN_CHECK_LOADING,
} from 'Auth/ActionTypes/AuthActionTypes';

const initialState = {
  loading: false,
  checkLoading: false,
  tokenStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    case SET_RESET_TOKEN_CHECK_LOADING:
      return {
        ...state,
        checkLoading: action.data,
      };
    default:
      return state;
  }
};
