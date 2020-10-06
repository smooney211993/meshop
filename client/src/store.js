import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
let currentState = store.getState();
store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.userLogin.token !== currentState.userLogin.token) {
    const token = currentState.userLogin.token;
    setAuthToken(token);
  }
});

export default store;
