import {
  SET_DATA_LOADING,
  SET_DATA,
  SET_COUNT,
  SET_PAGINATION,
  SET_FILTER,
  SET_ORDER,
} from 'Categories/Constants/CategoryActionTypes';

const initialState = {
  loading: false,
  data: [],
  count: 0,
  queryFilter: {
    skip: 0,
    take: 10,
  },
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
    case SET_PAGINATION:
      return {
        ...state,
        queryFilter: {
          ...state.queryFilter,
          ...action.data,
        },
      };
    case SET_FILTER:
      return {
        ...state,
        queryFilter: {
          ...state.queryFilter,
          filter: action.data,
        },
      };
    case SET_ORDER:
      return {
        ...state,
        queryFilter: {
          ...state.queryFilter,
          order: action.data,
        },
      };

    default:
      return state;
  }
};
