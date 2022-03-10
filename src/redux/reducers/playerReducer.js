import { SET_USER, SAVE_USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SAVE_USER_TOKEN:
    return { ...state, token: action.userToken };
  default:
    return state;
  }
};

export default playerReducer;
