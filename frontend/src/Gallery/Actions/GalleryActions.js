import {
  SET_DATA_LOADING,
  SET_DATA,
  SET_COUNT,
  SET_PAGINATION,
  SET_FILTER,
  SET_ORDER,
  SET_SUBMIT_LOADING,
} from 'Gallery/Constants/GalleryActionTypes';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from 'Gallery/Services/Gallery';
import { QueryBuilder } from 'Shared/Utils';

export const CallPhotos = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      GalleryReducer: { GalleryReducer },
    } = getState();

    const queryParams = QueryBuilder.buildQuery(GalleryReducer.queryFilter);
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

export const CallSavePhoto = (values) => async (dispatch) => {
  try {
    const { name: photoName, photo } = values;

    const photoForm = new FormData();
    photoForm.append('name', photoName);
    photoForm.append('image', photo[0].originFileObj);

    const result = await postRequest(photoForm);
    dispatch(setSubmitLoading(false));

    return result;
  } catch (error) {
    dispatch(setSubmitLoading(false));
    throw error;
  }
};

export const CallUpdatePhoto = (values) => async (dispatch) => {
  try {
    dispatch(setSubmitLoading(true));

    const { name: photoName, photo, id } = values;

    const photoForm = new FormData();
    photoForm.append('id', id);
    photoForm.append('name', photoName);
    photoForm.append('image', photo[0].originFileObj);

    const result = await putRequest(photoForm);
    dispatch(setSubmitLoading(false));

    return result;
  } catch (error) {
    dispatch(setSubmitLoading(false));
    throw error;
  }
};

export const CallDeletePhoto = (id) => async (dispatch) => {
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
