import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers';

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
