import {
  SET_DATA_LOADING,
  SET_DATA,
  SET_COUNT,
} from 'Categories/Constants/CategoryActionTypes';

const initialState = {
  loading: false,
  data: [],
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.data,
      };
    default:
      return state;
  }
};
