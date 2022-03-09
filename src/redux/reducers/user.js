import { SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      token: action.token,
    };
  default:
    return state;
  }
};

export default user;
