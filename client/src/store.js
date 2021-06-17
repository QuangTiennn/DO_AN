import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';

export const history = createBrowserHistory();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);
