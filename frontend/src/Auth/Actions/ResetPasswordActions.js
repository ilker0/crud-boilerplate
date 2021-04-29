import {
  SET_RESET_PASSWORD_LOADING,
  SET_RESET_TOKEN_CHECK_LOADING,
} from 'Auth/ActionTypes/AuthActionTypes';
import {
  resetTokenCheckRequest,
  resetPasswordRequest,
} from 'Auth/Services/Auth';

export const CallResetTokenCheck = (values) => async (dispatch) => {
  try {
    dispatch(setTokenCheckLoading(true));

    const data = await resetTokenCheckRequest({ resetpass_token: values });
    dispatch(setTokenCheckLoading(false));
    return data.message;
  } catch (error) {
    dispatch(setTokenCheckLoading(false));
    throw error;
  }
};

export const CallResetPassword = (values) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const data = await resetPasswordRequest(values);
    dispatch(setLoading(false));
    return data.message;
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

const setLoading = (data) => ({
  type: SET_RESET_PASSWORD_LOADING,
  data,
});

const setTokenCheckLoading = (data) => ({
  type: SET_RESET_TOKEN_CHECK_LOADING,
  data,
});
