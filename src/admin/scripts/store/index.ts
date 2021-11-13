import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import UiReducer from './reducer';

const rootReducer = UiReducer;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
