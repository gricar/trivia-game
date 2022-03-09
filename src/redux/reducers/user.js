import { SAVE_USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_TOKEN:
    return {
      token: action.userToken,
    };
  default:
    return state;
  }
};

export default user;
