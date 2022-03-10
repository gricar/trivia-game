import { SET_USER, SAVE_USER_TOKEN, SAVE_RESULTS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  hasToken: false,
  results: [],
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      player: {
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  case SAVE_USER_TOKEN:
    return {
      ...state,
      token: action.userToken,
      hasToken: true,
    };
  case SAVE_RESULTS:
    return {
      ...state,
      results: action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
