import {
  SET_DATA_LOADING,
  SET_DATA,
  SET_COUNT,
} from 'Categories/Constants/CategoryActionTypes';
import { getRequest } from 'Categories/Services/Category';

export const CallCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const result = await getRequest();

    dispatch(setData(result.message.data));
    dispatch(setCount(result.message.count));

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

const setLoading = (data) => ({
  type: SET_DATA_LOADING,
  data,
});

const setData = (data) => ({
  type: SET_DATA,
  data,
});

const setCount = (data) => ({
  type: SET_COUNT,
  data,
});
