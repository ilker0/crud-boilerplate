import { createStore } from 'redux';
import rootReducer from 'Shared/Reducers';

export const store = createStore(rootReducer);
