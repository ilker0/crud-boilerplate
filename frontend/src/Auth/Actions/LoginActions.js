import { SET_LOGIN_LOADING } from 'Auth/ActionTypes/AuthActionTypes';
import { loginRequest } from 'Auth/Services/Auth';

export const CallLogin = (values) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { username, password } = values;
    await loginRequest({ username, password });

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    return error;
  }
};

const setLoading = (data) => ({
  type: SET_LOGIN_LOADING,
  data,
});
