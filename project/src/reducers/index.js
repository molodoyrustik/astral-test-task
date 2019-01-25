import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './userReducer';
import validationReducer from './validationReducer';

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  page: validationReducer,
});
