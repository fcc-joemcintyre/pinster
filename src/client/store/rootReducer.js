import {combineReducers} from 'redux';
import user from '../account/store/user';
import pins from '../main/store/pins';

const rootReducer = combineReducers ({
  user,
  pins
});

export default rootReducer;
