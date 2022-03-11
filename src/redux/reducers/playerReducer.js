import {
  SET_USER,
  SAVE_USER_TOKEN,
  SAVE_RESULTS,
  TIMER_EXPIRED,
  SET_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  token: '',
  questions: [],
  hasTimerExpired: false,
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
    };
  case SAVE_RESULTS:
    return {
      ...state,
      questions: action.payload,
    };
  case TIMER_EXPIRED:
    return {
      ...state,
      hasTimerExpired: action.payload,
    };
  case SET_SCORE:
    return {
      ...state,
      currentScore: state.currentScore + action.payload,
    };

  default:
    return state;
  }
};

export default playerReducer;
