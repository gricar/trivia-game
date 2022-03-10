import fetchToken from '../../services/fetchToken';
import fetchQuestionsAndAnswers from '../../services/fetchQuestionsAndAnswers';
import { saveInLocalStorage } from '../../services/localStorage';

export const SET_USER = 'SET_USER';
export const SAVE_USER_TOKEN = 'SAVE_USER_TOKEN';

export const saveToken = (userToken) => ({
  type: SAVE_USER_TOKEN,
  userToken,
});

export const fetchTokenThunk = () => async (dispatch) => {
  const userToken = await fetchToken();
  dispatch(saveToken(userToken));
  saveInLocalStorage(userToken);
};

export const fetchQuestionsAndAnswersThunk = (token) => async (dispatch) => {
  const questionsAndAnswers = await fetchQuestionsAndAnswers(token);
};

export const setUser = (name, email) => ({
  type: SET_USER,
  payload: {
    name,
    email,
  },
});

export default fetchTokenThunk;
