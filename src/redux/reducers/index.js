import { combineReducers } from 'redux';
import token from './user';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  token,
  player: playerReducer,
});

export default rootReducer;
