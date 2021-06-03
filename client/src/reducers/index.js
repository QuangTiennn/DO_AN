import { combineReducers } from 'redux';
import tour from './tour';
import itemEditing from './itemEditing';
import employee from './employee';
import user from './user';
import login from './login';
import cart from './cart';
import chatRoom from './chat';
import customer from './customer';
import detailTourReducer from './detailTour';
import currentUser from './currentUser';
import messTempReducer from './messTemp';

const appReducers = combineReducers({
  tour,
  employee,
  itemEditing,
  user,
  login,
  cart,
  chatRoom,
  customer,
  tourState: detailTourReducer,
  currentUserState: currentUser,
  messageTempState: messTempReducer
});

export default appReducers;
