import {
  SET_USER,
  SAVE_USER_TOKEN,
  SAVE_RESULTS,
  CHOICES_EXPIRED,
  SET_SCORE,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
  questionButtons: {
    className: '',
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
        score: 0,
        assertions: 0,
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
  case CHOICES_EXPIRED:
    return {
      ...state,
      hasChoicesExpired: action.payload,
    };
  case SET_SCORE:
    return {
      ...state,
      player: {
        name: state.player.name,
        gravatarEmail: state.player.gravatarEmail,
        score: state.player.score + action.payload,
        assertions: state.player.assertions + 1,
      },
    };
  default:
    return state;
  }
};

export default playerReducer;
