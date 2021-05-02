import { SET_FORGOT_PASSWOD_LOADING } from 'Auth/Constants/AuthActionTypes';
import { forgotPasswordRequest } from 'Auth/Services/Auth';

export const CallForgotPassword = (values) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { email } = values;
    const data = await forgotPasswordRequest({ email });

    dispatch(setLoading(false));
    return data.message;
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

const setLoading = (data) => ({
  type: SET_FORGOT_PASSWOD_LOADING,
  data,
});
