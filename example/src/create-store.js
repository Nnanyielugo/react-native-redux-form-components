import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = (initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};

export default configureStore;
