import {createStore, applyMiddleware} from 'redux';
import rootreducer from './reducers/index';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';

const middleware = [thunk];

import {composeWithDevTools} from 'redux-devtools-extension';
const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
export const persistor = persistStore(store);
