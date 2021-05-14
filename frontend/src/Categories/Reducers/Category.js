import {
  SET_DATA_LOADING,
  SET_DATA,
  SET_COUNT,
  SET_PAGINATION,
  SET_FILTER,
  SET_ORDER,
  SET_SUBMIT_LOADING,
  SET_FILTER_DATA,
  SET_FILTER_LOADING,
} from 'Categories/Constants/CategoryActionTypes';

const initialState = {
  loading: false,
  submitLoading: false,
  data: [],
  filterData: [],
  filterLoading: false,
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

    case SET_SUBMIT_LOADING:
      return {
        ...state,
        submitLoading: action.data,
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
    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.data,
      };
    case SET_FILTER_LOADING:
      return {
        ...state,
        filterLoading: action.data,
      };

    default:
      return state;
  }
};
