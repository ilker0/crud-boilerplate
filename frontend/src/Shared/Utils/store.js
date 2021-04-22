import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'Shared/Reducers';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));
