import {
  SET_DATA_LOADING,
  SET_DATA,
  SET_COUNT,
  SET_PAGINATION,
  SET_FILTER,
  SET_ORDER,
  SET_SUBMIT_LOADING,
} from 'Categories/Constants/CategoryActionTypes';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from 'Categories/Services/Category';
import { QueryBuilder } from 'Shared/Utils';

export const CallCategories = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      CategoryReducer: { CategoryReducer },
    } = getState();

    const queryParams = QueryBuilder.buildQuery(CategoryReducer.queryFilter);
    const result = await getRequest(queryParams);

    dispatch(setData(result.message.data));
    dispatch(setCount(result.message.count));

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setData([]));
    throw error;
  }
};

export const CallSaveCategory = (values) => async (dispatch) => {
  try {
    dispatch(setSubmitLoading(true));

    const result = await postRequest(values);
    dispatch(setSubmitLoading(false));

    return result;
  } catch (error) {
    dispatch(setSubmitLoading(false));
    throw error;
  }
};

export const CallUpdateCategory = (values) => async (dispatch) => {
  try {
    dispatch(setSubmitLoading(true));

    const result = await putRequest(values);
    dispatch(setSubmitLoading(false));

    return result;
  } catch (error) {
    dispatch(setSubmitLoading(false));
    throw error;
  }
};

export const CallDeleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(setSubmitLoading(true));

    const result = await deleteRequest(id);
    dispatch(setSubmitLoading(false));

    return result;
  } catch (error) {
    dispatch(setSubmitLoading(false));
    throw error;
  }
};

export const CallSetPagination =
  ({ skip, take }) =>
  async (dispatch) => {
    try {
      dispatch(setPagination({ skip, take }));
    } catch (error) {
      throw error;
    }
  };

export const CallSetFilter =
  ({ name, isActive }) =>
  async (dispatch) => {
    try {
      name = {
        value: name,
        operator: 'like',
        key: 'name',
      };

      isActive = {
        value: isActive,
        operator: 'equal',
        key: 'isActive',
      };

      dispatch(setFilter({ name, isActive }));
    } catch (error) {
      throw error;
    }
  };

export const CallSetOrder =
  ({ name, order }) =>
  async (dispatch) => {
    try {
      dispatch(setOrder({ name, operator: order }));
    } catch (error) {
      throw error;
    }
  };

const setLoading = (data) => ({
  type: SET_DATA_LOADING,
  data,
});

const setSubmitLoading = (data) => ({
  type: SET_SUBMIT_LOADING,
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

const setPagination = (data) => ({
  type: SET_PAGINATION,
  data,
});

const setFilter = (data) => ({
  type: SET_FILTER,
  data,
});

const setOrder = (data) => ({
  type: SET_ORDER,
  data,
});
