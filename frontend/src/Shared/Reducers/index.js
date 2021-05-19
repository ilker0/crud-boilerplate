import { combineReducers } from 'redux';
import AuthReducer from 'Auth/Reducers';
import CategoryReducer from 'Categories/Reducers';
import GalleryReducer from 'Gallery/Reducers';
import ProductReducer from 'Products/Reducers';

const appReducer = combineReducers({
  AuthReducer,
  CategoryReducer,
  GalleryReducer,
  ProductReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
