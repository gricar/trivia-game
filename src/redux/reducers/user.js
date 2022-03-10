import { SAVE_USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_TOKEN:
    return { ...state, token: action.userToken };
  default:
    return state;
  }
};

export default token;
