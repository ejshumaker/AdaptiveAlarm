/**
 * The entry point to the redux store,
 * import and combine reducers from here,
 * hook up any neccessar middleware,
 * @eschirtz 03-02-19
 */
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import alarmReducer from './reducers/alarmReducer';

export default createStore(
  combineReducers({ user: userReducer, alarm: alarmReducer }),
  {}, // initial state overwritten by reducers
  applyMiddleware(promise, thunk),
);
