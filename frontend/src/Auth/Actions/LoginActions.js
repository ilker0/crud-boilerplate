import { SET_LOGIN_LOADING } from 'Auth/ActionTypes/AuthActionTypes';
import { loginRequest } from 'Auth/Services/Auth';

export const CallLogin = (values) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { username, password } = values;
    const { message } = await loginRequest({ username, password });

    localStorage.setItem('userToken', message.accessToken);
    localStorage.setItem('refreshToken', message.refreshToken);

    dispatch(setLoading(false));
    return message;
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

export const CallRefreshToken = (values) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { username, password } = values;
    const data = await loginRequest({ username, password });

    localStorage.setItem('userToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    dispatch(setLoading(false));
    return data.message;
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

const setLoading = (data) => ({
  type: SET_LOGIN_LOADING,
  data,
});
